import React from 'react';
import s from './Header.s';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import ArrowLeftImg from '../../assets/icons/ic-Arrow-Left.png';
import SettingsImg from '../../assets/icons/Ic-Setting.png';
import {useNavigation} from '@react-navigation/native';

const Header = ({title, style, action}) => {
  const navigation = useNavigation();

  const stackGoBack = (route) => {
    navigation.goBack(route);
  };

  return (
    <View
      style={[
        s.container,
        {backgroundColor: style === 'orange' ? '#F18303' : 'transparent'},
      ]}>
      <TouchableOpacity
        style={s.button}
        activeOpacity={0.8}
        onPress={stackGoBack}>
        <Image style={s.image} source={ArrowLeftImg} />
      </TouchableOpacity>
      <Text style={[s.title, {fontSize: style === 'orange' ? 18 : 24}]}>
        {title}
      </Text>
      {action ? (
        <TouchableOpacity style={s.button} activeOpacity={0.8} onPress={action}>
          <Image style={s.image} source={SettingsImg} />
        </TouchableOpacity>
      ) : (
        <View style={s.button} />
      )}
    </View>
  );
};

export default Header;
