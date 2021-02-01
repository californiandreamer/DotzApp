import React from 'react';
import s from './Selector.s';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import testImg from '../../assets/icons/Ic-Profile.png';
import agreeOn from '../../assets/icons/ic-agreeOn.png';
import agreeOff from '../../assets/icons/ic-agreeOff.png';

const Selector = () => {
  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>Activities</Text>
      </View>
      <View style={s.item}>
        <Image style={s.itemImg} source={testImg} />
        <Text style={s.itemTitle}>Running</Text>
        <TouchableOpacity style={s.checkBox} activeOpacity={0.8}>
          <Image style={s.checkBoxImg} source={agreeOn} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          s.item,
          {borderBottomLeftRadius: 16, borderBottomRightRadius: 16},
        ]}>
        <Image style={s.itemImg} source={testImg} />
        <Text style={s.itemTitle}>Hiking</Text>
        <TouchableOpacity style={s.checkBox} activeOpacity={0.8}>
          <Image style={s.checkBoxImg} source={agreeOff} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Selector;
