import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../misc/Header/Header';
import ChatList from '../../misc/ChatList/ChatList';

const Messages = () => {
  return (
    <View style={s.container}>
      <Header title={'Messages'} style={'orange'} />
      <View style={s.wrapper}>
        <ChatList />
      </View>
    </View>
  );
};

export default Messages;

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#141F25',
  },
  wrapper: {
    marginTop: 66,
  },
});
