import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import Header from '../../misc/Header/Header';
import OrangeGradientImg from '../../assets/images/gradient.jpg';
import NewFriendImg from '../../assets/icons/ic-new-friend.png';
import FriendsList from '../../misc/FriendsList/FriendsList';
import {getAccessToken} from '../../hooks/useAccessToken';
import {socketUrl} from '../../api/api';
import {axiosGet, axiosPost} from '../../hooks/useAxios';
import {getItem} from '../../hooks/useAsyncStorage';
import {useNavigation} from '@react-navigation/native';

const Friends = () => {
  const chatHistoryPath = 'chat/getChatHistory';

  const [listType, setListType] = useState('Friends');
  const [friendsList, setFriendsList] = useState([]);
  const [friendsRequestsList, setFriendsRequestsList] = useState([]);
  const [socket, setSocket] = useState(null);

  const navigation = useNavigation();
  const stackPush = (route, params) => {
    navigation.push(route, params);
  };

  const toggleListType = () => {
    setListType((prev) => (prev === 'Friends' ? 'Friend requests' : 'Friends'));
  };

  const getFriendsList = async () => {
    setFriendsList([]);
    const profile = await getItem('profile');
    const parsedProfile = JSON.parse(profile);
    const friends = parsedProfile.friends;
    setFriendsList(friends);
  };

  let initialFriendsRequestsList = [];
  const getFriendsRequestsList = async () => {
    setFriendsRequestsList([]);
    const token = await getAccessToken();
    const profile = await getItem('profile');
    const parsedProfile = JSON.parse(profile);
    const profileFriendsList = parsedProfile.friends;

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
      const senderExists = initialFriendsRequestsList.some(
        (item) => item.author_id === senderId,
      );
      const isFirendApproved = profileFriendsList.some(
        (item) => item.app_user_id === senderId,
      );
      const isFriendsRequest = chatItem.request_status === 'requested';

      if (isFriendsRequest && !senderExists && !isFirendApproved) {
        initialFriendsRequestsList.push(chatItem);
      }
    }

    setFriendsRequestsList(initialFriendsRequestsList);
  };

  const connectToSocket = async () => {
    const token = await getAccessToken();
    const conn = new WebSocket(`${socketUrl}${token}`);
    setSocket(conn);
  };

  const approveFrendship = async (id) => {
    const token = await getAccessToken();
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    let postData = new URLSearchParams();
    postData.append('app_user_id', id);
    postData.append('profile_rel_status', 'friends');

    const req = await axiosPost('profile/frineds/add', postData, headers);
    console.log('req', req);

    getFriendsList();
    getFriendsRequestsList();
  };

  useEffect(() => {
    getFriendsList();
    getFriendsRequestsList();
    connectToSocket();
  }, []);

  useEffect(() => {
    getFriendsList();
    getFriendsRequestsList();
  }, [listType]);

  return (
    <ImageBackground style={s.container} source={OrangeGradientImg}>
      <Header
        title={listType}
        icon={NewFriendImg}
        quantity={friendsRequestsList.length}
        action={toggleListType}
      />
      <View style={s.wrapper}>
        <FriendsList
          list={
            listType === 'Friend requests' ? friendsRequestsList : friendsList
          }
          type={listType}
          approveFrendshipAction={(id) => approveFrendship(id)}
          showProfileAction={(route, params) => stackPush(route, params)}
          showChatAction={(route, params) => stackPush(route, params)}
        />
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
