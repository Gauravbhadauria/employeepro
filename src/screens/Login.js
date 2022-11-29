import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Loader from '../common/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const checkLogin = () => {
    setModalVisible(true);
    firestore()
      .collection('employees')
      // Filter results
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        setModalVisible(false);
        console.log(querySnapshot._docs[0]._data);
        if (password === querySnapshot._docs[0]._data.password) {
          goToNextScreen(querySnapshot._docs[0]._data);
        } else {
          alert('Wrong Password');
        }
      });
  };
  const goToNextScreen = async data => {
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('USERID', data.userId);
    navigation.navigate('Main');
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
          if (email !== '' && password !== '') {
            checkLogin();
          } else {
            alert('Please Enter Data');
          }
        }}>
        <Text style={{color: '#fff', fontSize: 20}}>Login</Text>
      </TouchableOpacity>
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 50,
          textDecorationLine: 'underline',
          fontSize: 18,
          fontWeight: '600',
        }}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        Create New Account
      </Text>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

export default Login;
