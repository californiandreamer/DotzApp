import React, {useState} from 'react';
import s from './SignUpForm.s';
import {Image, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box'; // need to delete libary
import {errorsContent} from '../../data';
import Button from '../Button/Button';
import CheckBoxOnImg from '../../assets/icons/ic-checkOn.png';
import CheckBoxOffImg from '../../assets/icons/ic-checkOff.png';

const SignUpForm = ({action, onShowTerms, onError}) => {
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

  return (
    <View style={s.form}>
      <View style={s.wrapper}>
        <Text style={s.title}>Your Email</Text>
        <TextInput
          style={s.input}
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCompleteType="email"
          autoCapitalize="none"
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
          autoCapitalize="none"
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
          autoCapitalize="none"
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
          <TouchableOpacity activeOpacity={0.8} onPress={onShowTerms}>
            <Text style={s.termsBoldText}>Terms of Service</Text>
          </TouchableOpacity>
        </Text>
      </View>
      <View style={s.wrapper}>
        <Button text={'Register'} style={'violet'} action={checkInputs} />
      </View>
      <View style={s.wrapper}>
        <TouchableOpacity onPress={() => action('Login')} activeOpacity={0.8}>
          <Text style={s.text}>
            Already have an account? {''}
            <Text style={s.textBold}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpForm;

{
  /* <View style={s.wrapper}>
  <TouchableOpacity
    style={s.googleBtn}
    activeOpacity={0.8}
    onPress={() => googleSignUp()}>
    <Image style={s.googleImg} source={GoogleImg} />
  </TouchableOpacity>
</View> */
}
