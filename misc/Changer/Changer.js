import React from 'react';
import s from './Changer.s';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import testImg from '../../assets/icons/Ic-Profile.png';

const Changer = () => {
  return (
    <View style={s.container}>
      <View style={s.item}>
        <TouchableOpacity style={s.activeInner} activeOpacity={0.8}>
          <Image style={s.image} source={testImg} />
          <Text style={s.text}>Running</Text>
        </TouchableOpacity>
      </View>
      <View style={s.item}>
        <TouchableOpacity style={s.inner} activeOpacity={0.8}>
          <Image style={s.image} source={testImg} />
          <Text style={s.text}>Hiking</Text>
        </TouchableOpacity>
      </View>
      <View style={s.item}>
        <TouchableOpacity style={s.inner} activeOpacity={0.8}>
          <Image style={s.image} source={testImg} />
          <Text style={s.text}>Skateboard</Text>
        </TouchableOpacity>
      </View>
      <View style={s.item}>
        <TouchableOpacity style={s.inner} activeOpacity={0.8}>
          <Image style={s.image} source={testImg} />
          <Text style={s.text}>Bike</Text>
        </TouchableOpacity>
      </View>
      <View style={s.item}>
        <TouchableOpacity style={s.inner} activeOpacity={0.8}>
          <Image style={s.image} source={testImg} />
          <Text style={s.text}>Motor Bike</Text>
        </TouchableOpacity>
      </View>
      <View style={s.item}>
        <TouchableOpacity style={s.inner} activeOpacity={0.8}>
          <Image style={s.image} source={testImg} />
          <Text style={s.text}>Scooter</Text>
        </TouchableOpacity>
      </View>
      <View style={s.item}>
        <TouchableOpacity style={s.inner} activeOpacity={0.8}>
          <Image style={s.image} source={testImg} />
          <Text style={s.text}>Car</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Changer;
