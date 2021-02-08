import React from 'react';
import s from './LoginForm.s';
import {Image, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Button from '../Button/Button';
import GoogleImg from '../../assets/icons/ic-google.png';

const LoginForm = () => {
  const navigation = useNavigation();

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
          textContentType="emailAddress"
          autoCompleteType="email"
        />
      </View>
      <View style={s.wrapper}>
        <Text style={s.title}>Your Password</Text>
        <TextInput style={s.input} textContentType="password" secureTextEntry />
      </View>
      <View style={s.wrapper}>
        <TouchableOpacity
          onPress={() => stackNavigate('SignUp')}
          activeOpacity={0.5}>
          <Text style={s.text}>
            Already have an account? {''}
            <Text style={s.textBold}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={s.wrapper}>
        <Button text={'Login'} style={'violet'} />
      </View>
      <View style={s.wrapper}>
        <TouchableOpacity style={s.googleBtn} activeOpacity={0.8}>
          <Image style={s.googleImg} source={GoogleImg} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
