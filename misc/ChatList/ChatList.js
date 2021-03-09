import React from 'react';
import s from './ChatList.s';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {profileImageUrl} from '../../api/api';
import AvatarPlaceholderImg from '../../assets/images/avatar.jpg';

const ChatList = ({list, refreshing, onRefresh}) => {
  const navigation = useNavigation();
  console.log('list', list);

  const stackNavigate = (route, params) => {
    navigation.navigate(route, params);
  };

  return (
    <ScrollView
      style={s.list}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {list.map((item) => (
        <TouchableOpacity
          style={s.item}
          activeOpacity={0.8}
          key={item.msg_id || item.msg_timestamp_sent}
          onPress={() =>
            stackNavigate('Dialog', {
              id: item.author_id,
              name: item.author_name,
            })
          }>
          <View style={s.wrapper}>
            <Image
              style={s.image}
              source={
                item.profile && item.profile.profile_img_ava
                  ? {uri: `${profileImageUrl}${item.profile.profile_img_ava}`}
                  : AvatarPlaceholderImg
              }
            />
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
