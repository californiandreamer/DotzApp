import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import Logo from '../../assets/images/logo.png';
import BackgroundImage from '../../assets/images/gradient.jpg';
import StartForm from '../../misc/StartForm/StartForm';

const Start = () => {
  const navigation = useNavigation();

  const stackNavigate = (route, params) => {
    navigation.navigate(route, params);
  };

  return (
    <ImageBackground style={s.background} source={BackgroundImage}>
      <View style={s.container}>
        <Image style={s.logo} source={Logo} />
        <StartForm
          loginAction={() => stackNavigate('Login')}
          signUpAction={() => stackNavigate('SignUp')}
        />
      </View>
    </ImageBackground>
  );
};

export default Start;

const s = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: 70,
    marginBottom: 100,
    resizeMode: 'contain',
  },
  wrapper: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
