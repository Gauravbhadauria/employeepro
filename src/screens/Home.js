import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
let emailId = '',
  userId = '';
let attendanceList = [];
const Home = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [checkInEnable, setCheckInEnable] = useState(true);
  const [checkOutEnable, setCheckOutEnable] = useState(false);
  useEffect(() => {
    setCurrentDate(
      new Date().getDate() +
        '/' +
        (new Date().getMonth() + 1) +
        '/' +
        new Date().getFullYear(),
    );

    getSavedDate();
  }, []);
  const saveDate = async () => {
    await AsyncStorage.setItem(
      'DATE',
      new Date().getDate() +
        '/' +
        (new Date().getMonth() + 1) +
        '/' +
        new Date().getFullYear(),
    );
  };

  const getSavedDate = async () => {
    const date = await AsyncStorage.getItem('DATE');
    const status = await AsyncStorage.getItem('STATUS');
    emailId = await AsyncStorage.getItem('EMAIL');
    userId = await AsyncStorage.getItem('USERID');
    if (
      date ==
        new Date().getDate() +
          '/' +
          (new Date().getMonth() + 1) +
          '/' +
          new Date().getFullYear() &&
      status == 'CIN'
    ) {
      setCheckInEnable(false);
      setCheckOutEnable(true);
    } else if (
      date ==
        new Date().getDate() +
          '/' +
          (new Date().getMonth() + 1) +
          '/' +
          new Date().getFullYear() &&
      status == 'COUT'
    ) {
      setCheckInEnable(false);
      setCheckOutEnable(false);
    }
    console.log(date);
    attendanceList = [];
    firestore()
      .collection('employees')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data().attendance);
        if (documentSnapshot.data().attendance !== undefined) {
          documentSnapshot.data().attendance.map(item => {
            attendanceList.push(item);
          });
        }
      });
  };
  const saveCheckin = async () => {
    await AsyncStorage.setItem('STATUS', 'CIN');
  };
  const saveCheckout = async () => {
    await AsyncStorage.setItem('STATUS', 'COUT');
  };
  const uploadCheckIn = () => {
    let currentTime = new Date().getHours() + ':' + new Date().getMinutes();
    attendanceList.push({
      checkIn: currentTime,
      checkOut: '',
      date: currentDate,
    });
    firestore()
      .collection('employees')
      .doc(userId)
      .update({
        attendance: attendanceList,
      })
      .then(() => {
        console.log('User updated!');
      });
    attendanceList = [];
    firestore()
      .collection('employees')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data().attendance);

        if (documentSnapshot.data().attendance !== undefined) {
          documentSnapshot.data().attendance.map(item => {
            attendanceList.push(item);
          });
        }
      });
  };
  const uploadCheckOut = () => {
    let currentTime = new Date().getHours() + ':' + new Date().getMinutes();
    console.log(attendanceList);
    attendanceList[attendanceList.length - 1].checkIn =
      attendanceList[attendanceList.length - 1].checkIn;
    attendanceList[attendanceList.length - 1].checkOut = currentTime;
    attendanceList[attendanceList.length - 1].date = currentDate;
    firestore()
      .collection('employees')
      .doc(userId)
      .update({
        attendance: attendanceList,
      })
      .then(() => {
        console.log('User updated!');
      });
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: 60,
          elevation: 4,
          backgroundColor: '#fff',
          justifyContent: 'center',
          paddingLeft: 20,
        }}>
        <Text style={{color: '#000', fontWeight: '700', fontSize: 16}}>
          EmployeePro
        </Text>
      </View>

      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          color: '#000',
          marginTop: 20,
          marginLeft: 20,
        }}>
        {'Today Date: ' + currentDate}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 60,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          disabled={!checkInEnable}
          style={{
            width: '40%',
            height: 50,
            backgroundColor: checkInEnable ? 'green' : 'gray',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 50,
            borderRadius: 10,
          }}
          onPress={() => {
            saveDate();
            saveCheckin();
            setCheckInEnable(false);
            setCheckOutEnable(true);
            uploadCheckIn();
          }}>
          <Text style={{color: '#fff'}}>Check In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!checkOutEnable}
          style={{
            width: '40%',
            height: 50,
            backgroundColor: checkOutEnable ? 'green' : 'gray',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 50,
            borderRadius: 10,
          }}
          onPress={() => {
            saveCheckout();
            setCheckInEnable(false);
            setCheckOutEnable(false);
            uploadCheckOut();
          }}>
          <Text style={{color: '#fff'}}>Check Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
