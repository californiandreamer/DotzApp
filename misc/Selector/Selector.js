import React, {useState} from 'react';
import s from './Selector.s';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import testImg from '../../assets/icons/Ic-Profile.png';
import agreeOn from '../../assets/icons/ic-agreeOn.png';
import agreeOff from '../../assets/icons/ic-agreeOff.png';
import {activities} from '../../data';

const Selector = () => {
  const [activeItem, setActiveItem] = useState(1);

  const data = activities;

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>Activities</Text>
      </View>
      {data.map((item) => (
        <View
          style={
            item.id === data.length
              ? [
                  s.item,
                  {borderBottomLeftRadius: 16, borderBottomRightRadius: 16},
                ]
              : s.item
          }
          key={item.id}>
          <Image style={s.itemImg} source={item.image} />
          <Text style={s.itemTitle}>{item.name}</Text>
          <TouchableOpacity
            style={s.checkBox}
            activeOpacity={0.8}
            onPress={() => setActiveItem(item.id)}>
            {activeItem === item.id ? (
              <Image style={s.checkBoxImg} source={agreeOn} />
            ) : (
              <Image style={s.checkBoxImg} source={agreeOff} />
            )}
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default Selector;
