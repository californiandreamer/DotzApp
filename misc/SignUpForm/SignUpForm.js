import React, {useState} from 'react';
import s from './SignUpForm.s';
import {Image, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Button from '../Button/Button';
import CheckBox from 'react-native-check-box'; // need to delete libary
import GoogleImg from '../../assets/icons/ic-google.png';
import CheckBoxOnImg from '../../assets/icons/ic-checkOn.png';
import CheckBoxOffImg from '../../assets/icons/ic-checkOff.png';

const SignUpForm = () => {
  const [isSelected, setIsSelected] = useState(false);

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
        <Text style={s.title}>Your password</Text>
        <TextInput style={s.input} textContentType="password" secureTextEntry />
      </View>
      <View style={s.wrapper}>
        <Text style={s.title}>Re-enter your password</Text>
        <TextInput style={s.input} textContentType="password" secureTextEntry />
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
