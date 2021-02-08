import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import Header from '../../misc/Header/Header';
import OrangeGradientImg from '../../assets/images/gradient.jpg';
import NewFriendImg from '../../assets/icons/ic-new-friend.png';
import FriendsList from '../../misc/FriendsList/FriendsList';

const Friends = () => {
  const [listType, setListType] = useState('Friends');

  const toggleListType = () => {
    setListType((prev) =>
      prev === 'Friends' ? ' Friend requests' : 'Friends',
    );
  };

  return (
    <ImageBackground style={s.container} source={OrangeGradientImg}>
      <Header
        title={listType}
        icon={NewFriendImg}
        quantity={1}
        action={toggleListType}
      />
      <View style={s.wrapper}>
        <FriendsList type={listType} />
      </View>
    </ImageBackground>
  );
};

export default Friends;

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  wrapper: {
    width: '100%',
    height: '100%',
    paddingTop: 66,
  },
});
