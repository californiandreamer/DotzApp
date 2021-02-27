import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../misc/Header/Header';
import ChatList from '../../misc/ChatList/ChatList';
import {socketUrl} from '../../api/api';
import {axiosGet} from '../../hooks/useAxios';
import {getAccessToken} from '../../hooks/useAccessToken';
import {getItem} from '../../hooks/useAsyncStorage';

const Messages = () => {
  const [chatList, setChatList] = useState([]);

  let initialChatList = [];
  const chatHistoryPath = 'chat/getChatHistory';

  const getChatHistory = async () => {
    const token = await getAccessToken();
    const profile = await getItem('profile');
    const parsedProfile = JSON.parse(profile);
    const userId = parsedProfile.app_user_id;

    const headersUserToken = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const chatHistory = await axiosGet(chatHistoryPath, headersUserToken);
    const reversedChatHistory = chatHistory.reverse();

    for (let i = 0; i < reversedChatHistory.length; i++) {
      const chatItem = reversedChatHistory[i];
      const senderId = chatItem.author_id;
      const senderExists = initialChatList.some(
        (item) => item.author_id === senderId,
      );
      if (!senderExists) {
        initialChatList.push(chatItem);
      }
    }

    connectToSocket(token);
    setChatList(initialChatList);
  };

  const placeNewMessage = (data) => {
    const senderId = data.author_id;
    const index = initialChatList.map((x) => x.author_id).indexOf(senderId);
    initialChatList[index] = data;
    setChatList(initialChatList);
  };

  const connectToSocket = (token) => {
    const conn = new WebSocket(`${socketUrl}${token}`);

    conn.onmessage = (e) => {
      const data = e.data;
      const parsedData = JSON.parse(data);
      console.log('parsedData', parsedData);

      if (parsedData.hasOwnProperty('message')) {
        placeNewMessage(parsedData);
      }
    };
  };

  // const sendMessage = async () => {
  //   console.log('sending message');
  //   const token = await getAccessToken();
  //   const conn = new WebSocket(`${socketUrl}${token}`);
  //   const timeStamp = +new Date();
  //   const stringedTimeStamp = JSON.stringify(timeStamp);

  //   conn.onopen = (e) => {
  //     const obj = {
  //       msg: 'Hello! This is test answer from 51 account...',
  //       msg_reciever_id: '59',
  //       msg_timestamp_sent: stringedTimeStamp,
  //       msg_time_sent: '2021-02-24 15:00:00',
  //     };
  //     conn.send(JSON.stringify(obj));
  //   };
  // };

  useEffect(() => {
    getChatHistory();
  }, []);

  return (
    <View style={s.container}>
      <Header title={'Messages'} style={'orange'} />
      <View style={s.wrapper}>
        <ChatList list={chatList} />
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
