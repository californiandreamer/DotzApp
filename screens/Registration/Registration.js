import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../../misc/Button/Button';
import Selector from '../../misc/Selector/Selector';
import axios from 'axios';
import {headersFormData, url, headersUserToken} from '../../api/api';
import RegistrationForm from '../../misc/RegistrationForm/RegistrationForm';
import {onChange} from 'react-native-reanimated';

const Registration = ({route}) => {
  console.log('navParams', route.params.email);

  const [nameValue, setNameValue] = useState('');
  const [cityValue, setCityValue] = useState('');

  console.log('nameValue', nameValue);
  console.log('cityValue', cityValue);

  const path = 'appuser/register';
  const navigation = useNavigation();

  const stackNavigate = (route) => {
    navigation.navigate(route);
  };

  const testRequestRegistration = async () => {
    const email = route.params.email;
    const password = route.params.password;

    let postData = new FormData();
    postData.append('email', 'test12@nazar.com');
    postData.append('password', '12345678');
    postData.append('name', 'Nazar Test');
    postData.append('scope', 'app');
    postData.append('profile_city', 'Warsaw');
    postData.append('activities', '[4, 2]');
    postData.append('profile_img_ava', {
      uri: uploadedImage.uri,
      name: uploadedImage.fileName,
      type: uploadedImage.type,
    });

    // Registration request
    const request = await axios
      .post(`${url}/${path}`, postData, headersFormData)
      .then((res) => console.log('res', res))
      .catch((error) => console.log('error', error));
  };

  // const testRequestLogin = async () => {
  //   let data = new FormData();
  //   data.append('username', 'test6@nazar.com');
  //   data.append('password', '12345678');
  //   data.append('grant_type', 'password');
  //   data.append('client_id', 'ZPwcGbFGFFjMZ34hCM4r4XEyAL8SCL');
  //   data.append('client_secret', '7wP4je=NeR3&zJaJz3#35#bHZ?UA+gP-8EGHcPT-');

  //   console.log('data', data);

  //   const request = await axios
  //     .post('http://admin.officialdotzapp.com/api/appuser/login', data, {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     })
  //     .then((res) => console.log('res', res))
  //     .catch((error) => console.log('error', error));
  // };

  const getActivities = async () => {
    const request = await axios
      .get(`${url}/activities?activities=[]`, headersUserToken)
      .then((res) => console.log('res', res))
      .catch((error) => console.log('error', error));
  };

  return (
    <ScrollView style={s.container}>
      <View style={s.wrapper}>
        <View style={s.wrapper}>
          <RegistrationForm
            onNameChange={(name) => setNameValue(name)}
            onCityChange={(city) => setCityValue(city)}
          />
        </View>
        <View style={s.wrapper}>
          <Selector />
        </View>
        <View style={s.wrapper}>
          <Button
            text={'Continue'}
            style={'orange'}
            // action={() => stackNavigate('PrivacyBubble')}
            action={() => getActivities()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Registration;

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    backgroundColor: '#141F25',
  },
  wrapper: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
