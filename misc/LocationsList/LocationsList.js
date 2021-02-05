import React from 'react';
import s from './LocationsList.s';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import StarImg from '../../assets/icons/ic-star2.png';
import ArrowRightImg from '../../assets/icons/ic-forward.png';

const LocationsList = ({title}) => {
  return (
    <View style={s.container}>
      {title ? (
        <View style={s.wrapper}>
          <Text style={s.title}>{title}</Text>
        </View>
      ) : null}
      <TouchableOpacity style={s.item} activeOpacity={0.8}>
        <Text style={s.number}>1</Text>
        <Text style={s.name}>Location</Text>
        <View style={s.stars}>
          <Image style={s.starImg} source={StarImg} />
          <Image style={s.starImg} source={StarImg} />
          <Image style={s.starImg} source={StarImg} />
          <Image style={s.starImg} source={StarImg} />
          <Image style={s.starImg} source={StarImg} />
        </View>
        <Image style={s.arrow} source={ArrowRightImg} />
      </TouchableOpacity>
    </View>
  );
};

export default LocationsList;
