import React, {useState} from 'react';
import s from './Changer.s';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {activities} from '../../data';
import testImg from '../../assets/icons/Ic-Profile.png';

const Changer = () => {
  const [activeItem, setActiveItem] = useState(1);

  const data = activities;

  return (
    <View style={s.container}>
      {data.map((item) => (
        <View style={s.item} key={item.id}>
          <TouchableOpacity
            style={activeItem === item.id ? s.activeInner : s.inner}
            activeOpacity={0.8}
            onPress={() => setActiveItem(item.id)}>
            <Image style={s.image} source={item.image} />
            <Text style={s.text}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default Changer;
