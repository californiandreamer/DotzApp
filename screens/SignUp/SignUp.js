import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BackgroundImage from '../../assets/images/gradient.jpg';
import Logo from '../../assets/images/logo.png';
import Alert from '../../misc/Alert/Alert';
import SignUpForm from '../../misc/SignUpForm/SignUpForm';

const SignUp = () => {
  const [error, setError] = useState({
    isVisible: false,
    title: '',
    text: '',
  });

  const navigation = useNavigation();

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
          <Text style={s.title}>Sign Up</Text>
        </View>
        <SignUpForm
          action={(route, params) => stackNavigate(route, params)}
          onError={(title, text) => {
            setError({isVisible: true, title, text});
          }}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default SignUp;

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
