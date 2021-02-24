import React, {useEffect, useState} from 'react';
import s from './SignUpForm.s';
import {Image, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box'; // need to delete libary
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {errorsContent} from '../../data';
import Button from '../Button/Button';
import GoogleImg from '../../assets/icons/ic-google.png';
import CheckBoxOnImg from '../../assets/icons/ic-checkOn.png';
import CheckBoxOffImg from '../../assets/icons/ic-checkOff.png';

const SignUpForm = ({action, action2, onError}) => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [checkPasswordValue, setCheckPasswordValue] = useState('');
  const [isSelected, setIsSelected] = useState(false);

  const validateEmail = () => {
    let re = /\S+@\S+\.\S+/;
    return re.test(emailValue);
  };

  const validatePassword = () => {
    if (passwordValue.length >= 8) {
      return true;
    } else {
      return false;
    }
  };

  const validateCheckPassword = () => {
    if (passwordValue === checkPasswordValue) {
      return true;
    } else {
      return false;
    }
  };

  const checkInputs = () => {
    const isTermsAccepted = isSelected;
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isCheckPasswordValid = validateCheckPassword();

    if (isEmailValid) {
      if (isPasswordValid) {
        if (isCheckPasswordValid) {
          if (isTermsAccepted) {
            action('Registration', {
              email: emailValue,
              password: passwordValue,
            });
          } else {
            onError(
              errorsContent.termsUnaccepted.title,
              errorsContent.termsUnaccepted.text,
            );
          }
        } else {
          onError(
            errorsContent.invalidCheckPassword.title,
            errorsContent.invalidCheckPassword.text,
          );
        }
      } else {
        onError(
          errorsContent.invalidPassword.title,
          errorsContent.invalidPassword.text,
        );
      }
    } else {
      onError(
        errorsContent.invalidEmail.title,
        errorsContent.invalidEmail.text,
      );
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      androidClientId:
        '538396150269-6skr22agrs9nbheb8g6sc31540p3ldqm.apps.googleusercontent.com',
      webClientId:
        '538396150269-6skr22agrs9nbheb8g6sc31540p3ldqm.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }, []);

  const googleSignUp = async () => {
    console.log('Гугль');
    const isSignedIn = await GoogleSignin.isSignedIn();
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log('isSignedIn', isSignedIn);
    console.log('currentUser', currentUser);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
    } catch (error) {
      console.log('error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('canceled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('operation in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('not available');
      } else {
        // some other error happened
        console.log('other error');
      }
    }
  };

  return (
    <View style={s.form}>
      <View style={s.wrapper}>
        <Text style={s.title}>Your Email</Text>
        <TextInput
          style={s.input}
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCompleteType="email"
          onChange={(e) => {
            e.persist();
            setEmailValue(e.nativeEvent.text);
          }}
        />
      </View>
      <View style={s.wrapper}>
        <Text style={s.title}>Your password</Text>
        <TextInput
          style={s.input}
          textContentType="password"
          secureTextEntry
          onChange={(e) => {
            e.persist();
            setPasswordValue(e.nativeEvent.text);
          }}
        />
      </View>
      <View style={s.wrapper}>
        <Text style={s.title}>Re-enter your password</Text>
        <TextInput
          style={s.input}
          textContentType="password"
          secureTextEntry
          onChange={(e) => {
            e.persist();
            setCheckPasswordValue(e.nativeEvent.text);
          }}
        />
      </View>
      <View style={s.termsWrapper}>
        <TouchableOpacity
          style={s.checkBoxBtn}
          activeOpacity={0.8}
          onPress={() => setIsSelected((prev) => !prev)}>
          <Image
            style={s.checkBoxImg}
            source={isSelected ? CheckBoxOnImg : CheckBoxOffImg}
          />
        </TouchableOpacity>
        <Text style={s.termsText}>
          By Signing up, you agree to the DOTZ{' '}
          <Text style={s.termsBoldText}>Terms of Service</Text>
        </Text>
      </View>
      <View style={s.wrapper}>
        <Button text={'Register'} style={'violet'} action={checkInputs} />
      </View>
      <View style={s.wrapper}>
        <TouchableOpacity
          style={s.googleBtn}
          activeOpacity={0.8}
          onPress={() => googleSignUp()}>
          <Image style={s.googleImg} source={GoogleImg} />
        </TouchableOpacity>
      </View>
      <View style={s.wrapper}>
        <TouchableOpacity onPress={() => action('Login')} activeOpacity={0.8}>
          <Text style={s.text}>
            Already have an account? {''}
            <Text style={s.textBold}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpForm;
