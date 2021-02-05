import React from 'react';
import s from './CitiesList.s';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import ArrowRightImg from '../../assets/icons/ic-forward.png';

const CitiesList = () => {
  const firstItemStyle = {
    borderTopWidth: 2,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  };
  const lastItemStyle = {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  };

  return (
    <View style={s.container}>
      <TouchableOpacity style={[s.item, firstItemStyle]} activeOpacity={0.8}>
        <Text style={s.name}>New York</Text>
        <Image style={s.arrow} source={ArrowRightImg} />
      </TouchableOpacity>
      <TouchableOpacity style={s.item} activeOpacity={0.8}>
        <Text style={s.name}>Los Angeles</Text>
        <Image style={s.arrow} source={ArrowRightImg} />
      </TouchableOpacity>
      <TouchableOpacity style={s.item} activeOpacity={0.8}>
        <Text style={s.name}>Los Angeles</Text>
        <Image style={s.arrow} source={ArrowRightImg} />
      </TouchableOpacity>
      <TouchableOpacity style={s.item} activeOpacity={0.8}>
        <Text style={s.name}>Los Angeles</Text>
        <Image style={s.arrow} source={ArrowRightImg} />
      </TouchableOpacity>
      <TouchableOpacity style={s.item} activeOpacity={0.8}>
        <Text style={s.name}>Los Angeles</Text>
        <Image style={s.arrow} source={ArrowRightImg} />
      </TouchableOpacity>
      <TouchableOpacity style={s.item} activeOpacity={0.8}>
        <Text style={s.name}>Los Angeles</Text>
        <Image style={s.arrow} source={ArrowRightImg} />
      </TouchableOpacity>
      <TouchableOpacity style={s.item} activeOpacity={0.8}>
        <Text style={s.name}>Los Angeles</Text>
        <Image style={s.arrow} source={ArrowRightImg} />
      </TouchableOpacity>
      <TouchableOpacity style={[s.item, lastItemStyle]} activeOpacity={0.8}>
        <Text style={s.name}>Chicago</Text>
        <Image style={s.arrow} source={ArrowRightImg} />
      </TouchableOpacity>
    </View>
  );
};

export default CitiesList;
