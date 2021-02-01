import React from 'react';
import s from './Header.s';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import ArrowLeftImg from '../../assets/icons/ic-Arrow-Left.png';
import SettingsImg from '../../assets/icons/Ic-Setting.png';

const Header = () => {
  return (
    <View style={s.container}>
      <TouchableOpacity style={s.button} activeOpacity={0.8}>
        <Image style={s.image} source={ArrowLeftImg} />
      </TouchableOpacity>
      <Text style={s.title}>Profile</Text>
      <TouchableOpacity style={s.button} activeOpacity={0.8}>
        <Image style={s.image} source={SettingsImg} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
