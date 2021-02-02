import React from 'react';
import s from './ChatList.s';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import GirlImg from '../../assets/images/girl.jpg';
import {useNavigation} from '@react-navigation/native';

const ChatList = () => {
  const navigation = useNavigation();

  const stackNavigate = (route) => {
    navigation.navigate(route);
  };

  return (
    <ScrollView style={s.list}>
      <TouchableOpacity
        style={s.item}
        activeOpacity={0.8}
        onPress={() => stackNavigate('Dialog')}>
        <View style={s.wrapper}>
          <Image style={s.image} source={GirlImg} />
          <View style={s.content}>
            <Text style={s.name}>Francisco Miles</Text>
            <Text style={s.text}>I went there yesterday</Text>
          </View>
        </View>
        <View style={s.time}>
          <Text style={s.timeText}>18:22</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={s.item} activeOpacity={0.8}>
        <View style={s.wrapper}>
          <Image style={s.image} source={GirlImg} />
          <View style={s.content}>
            <Text style={s.name}>Arlene Fisher</Text>
            <Text style={s.text}>IDK what else is there to do</Text>
          </View>
        </View>
        <View style={s.time}>
          <Text style={s.timeText}>09:18</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChatList;
