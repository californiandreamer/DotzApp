import React, {useState} from 'react';
import s from './LoginForm.s';
import {Image, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Button from '../Button/Button';
import {errorsContent} from '../../data';

const LoginForm = ({action, onError}) => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const navigation = useNavigation();

  const checkInputs = () => {
    if (emailValue !== '' && passwordValue !== '') {
      action(emailValue, passwordValue);
    } else {
      onError(
        errorsContent.checkEmailAndPassword.title,
        errorsContent.checkEmailAndPassword.text,
      );
    }
  };

  const stackNavigate = (route) => {
    navigation.navigate(route);
  };

  return (
    <View style={s.form}>
      <View style={s.wrapper}>
        <Text style={s.title}>Your Email</Text>
        <TextInput
          style={s.input}
          keyboardType="email-address"
          autoCapitalize="none"
          // textContentType="emailAddress"
          // autoCompleteType="email"
          onChange={(e) => {
            e.persist();
            setEmailValue(e.nativeEvent.text);
          }}
        />
      </View>
      <View style={s.wrapper}>
        <Text style={s.title}>Your Password</Text>
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
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => stackNavigate('SignUp')}>
          <Text style={s.text}>
            Don't have an account?
            <Text style={s.textBold}> Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={s.wrapper}>
        <Button text={'Login'} style={'violet'} action={checkInputs} />
      </View>
    </View>
  );
};

export default LoginForm;

{
  /* <View style={s.wrapper}>
        <TouchableOpacity
          style={s.googleBtn}
          activeOpacity={0.8}
          onPress={action2}>
          <Image style={s.googleImg} source={GoogleImg} />
        </TouchableOpacity>
      </View> */
}
