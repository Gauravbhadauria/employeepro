import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Loader from '../common/Loader';
import uuid from 'react-native-uuid';
const Signup = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const saveDataOnFirestore = () => {
    let userId = uuid.v4();
    setModalVisible(true);
    firestore()
      .collection('employees')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        userId: userId,
      })
      .then(() => {
        console.log('User added!');
        setModalVisible(false);
        navigation.goBack();
      });
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        placeholder="Enter Name"
        value={name}
        onChangeText={txt => setName(txt)}
        style={{
          width: '90%',
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          alignSelf: 'center',
          paddingLeft: 20,
          marginTop: 20,
        }}
      />
      <TextInput
        placeholder="Enter Email Id"
        value={email}
        onChangeText={txt => setEmail(txt)}
        style={{
          width: '90%',
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          alignSelf: 'center',
          paddingLeft: 20,
          marginTop: 20,
        }}
      />
      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={txt => setPassword(txt)}
        style={{
          width: '90%',
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          alignSelf: 'center',
          paddingLeft: 20,
          marginTop: 20,
        }}
      />
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          backgroundColor: '#000',
          borderRadius: 10,
          marginTop: 50,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          if (name !== '' && email !== '' && password !== '') {
            saveDataOnFirestore();
          }
          else{
            alert("Please Enter All Data")
          }
        }}>
        <Text style={{color: '#fff', fontSize: 20}}>Sign up</Text>
      </TouchableOpacity>
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 50,
          textDecorationLine: 'underline',
          fontSize: 18,
          fontWeight: '600',
        }}>
        Already have account
      </Text>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

export default Signup;
