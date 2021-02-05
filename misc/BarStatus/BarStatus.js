import React from 'react';
import s from './BarStatus.s';
import {View, Text, Image} from 'react-native';
import BikeActivityImg from '../../assets/icons/ic-bike-riding.png';

const BarStatus = ({title}) => {
  return (
    <View style={s.content}>
      <View style={s.wrapper}>
        <View style={s.imageOuter}>
          <Image style={s.image} source={BikeActivityImg} />
        </View>
      </View>
      <View style={s.wrapper}>
        <Text style={s.title}>{title}</Text>
      </View>
    </View>
  );
};

export default BarStatus;
