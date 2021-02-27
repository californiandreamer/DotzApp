import React from 'react';
import s from './ChatList.s';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import AvatarPlaceholderImg from '../../assets/images/avatar.jpg';
import {useNavigation} from '@react-navigation/native';

const ChatList = ({list, action}) => {
  const navigation = useNavigation();
  console.log('list', list);

  const stackNavigate = (route, params) => {
    navigation.navigate(route, params);
  };

  return (
    <ScrollView style={s.list}>
      {list.map((item) => (
        <TouchableOpacity
          style={s.item}
          activeOpacity={0.8}
          key={item.msg_id}
          onPress={() =>
            stackNavigate('Dialog', {
              id: item.author_id,
              name: item.author_name,
            })
          }>
          <View style={s.wrapper}>
            <Image style={s.image} source={AvatarPlaceholderImg} />
            <View style={s.content}>
              <Text style={s.name}>{item.author_name}</Text>
              <Text style={s.text} numberOfLines={1}>
                {item.message}
              </Text>
            </View>
          </View>
          <View style={s.time}>
            {/* <Text style={s.timeText}>{item.msg_time_sent && null}</Text> */}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ChatList;

{
  /* <TouchableOpacity style={s.item} activeOpacity={0.8}>
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
</TouchableOpacity> */
}
