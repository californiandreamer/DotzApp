import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../misc/Header/Header';
import ChatList from '../../misc/ChatList/ChatList';
import {socketUrl} from '../../api/api';
import {axiosGet} from '../../hooks/useAxios';
import {getAccessToken} from '../../hooks/useAccessToken';
import {getItem} from '../../hooks/useAsyncStorage';
import {getHeadersWithToken} from '../../hooks/useApiData';
import {chatHistoryPath} from '../../api/routes';

const Messages = () => {
  let initialChatList = [];

  const [chatList, setChatList] = useState([]);
  // console.log('chatList', chatList);
  const [refreshing, setRefreshing] = useState(false);

  const getChatHistory = async () => {
    setRefreshing(true);
    const token = await getAccessToken();
    const headers = await getHeadersWithToken();
    const profile = await getItem('profile');
    const parsedProfile = JSON.parse(profile);
    const userId = parsedProfile.app_user_id;

    const history = await axiosGet(chatHistoryPath, headers);
    const chatHistory = history[0];
    const usersHistory = history[1];
    const reversedChatHistory = chatHistory.reverse();

    for (let i = 0; i < reversedChatHistory.length; i++) {
      const chatItem = reversedChatHistory[i];
      const senderId = chatItem.author_id;
      const findedUser = usersHistory.find(
        (item) => item.app_user_id === senderId,
      );
      const senderExists = initialChatList.some(
        (item) => item.author_id === senderId,
      );
      if (!senderExists && senderId !== userId) {
        const chatItemWithProfile = {...chatItem, ...findedUser};
        initialChatList.push(chatItemWithProfile);
      }
    }

    connectToSocket(token);
    setChatList(initialChatList);
    setRefreshing(false);
  };

  const connectToSocket = async (token) => {
    const conn = new WebSocket(`${socketUrl}${token}`);
    const headers = await getHeadersWithToken();
    const history = await axiosGet(chatHistoryPath, headers);
    const usersHistory = history[1];

    conn.onmessage = (e) => {
      const data = e.data;
      const parsedData = JSON.parse(data);

      if (parsedData.hasOwnProperty('message')) {
        placeNewMessage(parsedData, usersHistory);
      }
    };
  };

  const placeNewMessage = (data, history) => {
    setChatList([]);
    const senderId = data.author_id;
    const findedUser = history.find((item) => item.app_user_id === senderId);
    const chatItemWithProfile = {...data, ...findedUser};
    const index = initialChatList.map((x) => x.author_id).indexOf(senderId);
    initialChatList[index] = chatItemWithProfile;
    setChatList(initialChatList);
  };

  useEffect(() => {
    getChatHistory();
  }, []);

  return (
    <View style={s.container}>
      <Header title={'Messages'} style={'orange'} />
      <View style={s.wrapper}>
        <ChatList
          list={chatList}
          refreshing={refreshing}
          onRefresh={getChatHistory}
        />
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
