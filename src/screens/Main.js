import {View, Text, Touchable, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Home from './Home';
import Attendance from '../tabs/Attendance';
import Leaves from '../tabs/Leaves';

const Main = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={{flex: 1}}>
      {selectedTab == 0 ? (
        <Home />
      ) : selectedTab == 1 ? (
        <Attendance />
      ) : (
        <Leaves />
      )}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 60,
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 0,
          elevation: 4,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: '32%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={
              selectedTab == 0
                ? require('../images/home_color.png')
                : require('../images/home.png')
            }
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '32%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={
              selectedTab == 1
                ? require('../images/attendance_color.png')
                : require('../images/attendance.png')
            }
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '32%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(2);
          }}>
          <Image
            source={
              selectedTab == 2
                ? require('../images/leave_color.png')
                : require('../images/leave.png')
            }
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;
