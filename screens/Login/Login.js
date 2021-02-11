import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  clientId,
  clientSecret,
  headersUrlencoded,
  url,
  getAccessToken,
} from '../../api/api';
import BackgroundImage from '../../assets/images/gradient.jpg';
import Logo from '../../assets/images/logo.png';
import {setItem} from '../../hooks/useAsyncStorage';
import Alert from '../../misc/Alert/Alert';
import LoginForm from '../../misc/LoginForm/LoginForm';

const Login = () => {
  const [error, setError] = useState({
    isVisible: false,
    title: '',
    text: '',
  });

  const navigation = useNavigation();

  const loginRequest = async (email, password) => {
    let postData = new FormData();
    postData.append('username', email);
    postData.append('password', password);
    postData.append('grant_type', 'password');
    postData.append('client_id', clientId);
    postData.append('client_secret', clientSecret);

    const request = await axios
      .post(`${url}/appuser/login`, postData, headersUrlencoded)
      .then((res) => {
        const data = res.data;
        setToken(data.access_token);
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

  const setToken = async (token) => {
    await setItem('access_token', token);
    stackNavigate('Root');
  };

  const getToken = async () => {
    const token = await getAccessToken();
    console.log('gottenToken', token);
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
