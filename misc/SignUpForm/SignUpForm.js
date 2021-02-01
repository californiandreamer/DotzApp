import React, {useState} from 'react';
import s from './SignUpForm.s';
import {Image, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../Button/Button';
import CheckBox from 'react-native-check-box';
import GoogleImg from '../../assets/icons/ic-google.png';
import {useNavigation} from '@react-navigation/native';

const SignUpForm = () => {
  const [isSelected, setSelection] = useState(false);

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
        <Text style={s.title}>Submit Your Password</Text>
        <TextInput style={s.input} textContentType="password" secureTextEntry />
      </View>
      <View style={s.termsWrapper}>
        <CheckBox
          isChecked={isSelected}
          checkBoxColor="#141F25"
          uncheckedCheckBoxColor="#141F25"
          onClick={() => {
            setSelection((prev) => !prev);
          }}
          style={s.checkBox}
        />
        <Text style={s.termsText}>
          By Signing up, you agree to the DOTZ{' '}
          <Text style={s.termsBoldText}>Terms of Service</Text>
        </Text>
      </View>
      <View style={s.wrapper}>
        <Button
          text={'Register'}
          style={'violet'}
          action={() => stackNavigate('Registration')}
        />
      </View>
      <View style={s.wrapper}>
        <TouchableOpacity style={s.googleBtn} activeOpacity={0.8}>
          <Image style={s.googleImg} source={GoogleImg} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpForm;
