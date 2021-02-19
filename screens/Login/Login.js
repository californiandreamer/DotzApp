import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import axios from 'axios';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {clientId, clientSecret, headersUrlencoded, url} from '../../api/api';
import {getAccessToken} from '../../hooks/useAccessToken';
import BackgroundImage from '../../assets/images/gradient.jpg';
import Logo from '../../assets/images/logo.png';
import {setItem} from '../../hooks/useAsyncStorage';
import Alert from '../../misc/Alert/Alert';
import LoginForm from '../../misc/LoginForm/LoginForm';
import {axiosPost} from '../../hooks/useAxios';

const Login = () => {
  const [error, setError] = useState({
    isVisible: false,
    title: '',
    text: '',
  });

  const path = 'appuser/login';
  const navigation = useNavigation();

  const loginRequest = async (email, password) => {
    let postData = new FormData();
    postData.append('username', email);
    postData.append('password', password);
    postData.append('grant_type', 'password');
    postData.append('client_id', clientId);
    postData.append('client_secret', clientSecret);

    // const request = await axiosPost(path, postData, headersUrlencoded);
    // if (request.app_user.email === email) {
    //   console.log('true');
    // } else {
    //   setError({
    //     isVisible: true,
    //     title: 'Login error',
    //     text: 'Something went wrong. Check your values and try again.',
    //   });
    // }

    const request = await axios
      .post(`${url}/${path}`, postData, headersUrlencoded)
      .then((res) => {
        const data = res.data;
        const token = data.access_token;
        const userInfo = data.app_user;
        const userProfile = data.profile;
        const profile = {...userProfile, ...userInfo};
        saveProfileData(token, profile);
      })
      .catch((error) => {
        setError({
          isVisible: true,
          title: 'Login error',
          text: 'Something went wrong. Check your values and try again.',
        });
        console.log('error', error);
      });
  };

  const saveProfileData = async (token, data) => {
    const stringedData = JSON.stringify(data);
    await setItem('access_token', token);
    await setItem('profile', stringedData);
    stackNavigate('Root');
  };

  const stackNavigate = (route, params) => {
    navigation.navigate(route, params);
  };

  const hideAlert = () => {
    setTimeout(() => {
      setError({isVisible: false, title: '', text: ''});
    }, 500);
  };

  const renderAlert = error.isVisible ? (
    <Alert
      title={error.title}
      text={error.text}
      type="error"
      closeAction={hideAlert}
    />
  ) : null;

  return (
    <ImageBackground style={s.background} source={BackgroundImage}>
      {renderAlert}
      <ScrollView style={s.container}>
        <Image style={s.logo} source={Logo} />
        <View style={s.wrapper}>
          <Text style={s.title}>Login</Text>
        </View>
        <LoginForm
          action={(email, password) => loginRequest(email, password)}
          action2={() => console.log('Google Login')}
          onError={(title, text) => {
            setError({isVisible: true, title, text});
          }}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default Login;

const s = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    height: '100%',
    padding: 16,
  },
  logo: {
    width: '100%',
    height: 70,
    marginVertical: 25,
    resizeMode: 'contain',
  },
  wrapper: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Atma-SemiBold',
    fontSize: 48,
    color: '#000',
  },
});
