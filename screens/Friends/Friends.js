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
import {getHeadersWithToken} from '../../hooks/useApiData';
import {addToFriendsPath, chatHistoryPath} from '../../api/routes';

const Friends = () => {
  const [listType, setListType] = useState('Friends');
  const [friendsList, setFriendsList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [friendsRequestsList, setFriendsRequestsList] = useState([]);
  // console.log('friendsRequestsList', friendsRequestsList);
  const [socket, setSocket] = useState(null);

  const navigation = useNavigation();
  const stackPush = (route, params) => {
    navigation.push(route, params);
  };

  const toggleListType = () => {
    setListType((prev) => (prev === 'Friends' ? 'Friend requests' : 'Friends'));
  };

  const getFriendsList = async () => {
    let initialFriendsList = [];
    setRefreshing(true);
    setFriendsList([]);
    const profile = await getItem('profile');
    const parsedProfile = JSON.parse(profile);
    const friends = parsedProfile.friends;

    for (let i = 0; i < friends.length; i++) {
      const friendsItem = friends[i];
      const friendId = friendsItem.app_user_id;
      const isExist = initialFriendsList.some(
        (item) => item.app_user_id === friendId,
      );
      if (!isExist) {
        initialFriendsList.push(friendsItem);
      }
    }
    setFriendsList(initialFriendsList);
    setRefreshing(false);
  };

  const getFriendsRequestsList = async () => {
    let initialFriendsRequestsList = [];
    setRefreshing(true);
    setFriendsRequestsList([]);
    const profile = await getItem('profile');
    const parsedProfile = JSON.parse(profile);
    const profileFriendsList = parsedProfile.friends;
    const userId = parsedProfile.app_user_id;

    const headers = await getHeadersWithToken();
    const history = await axiosGet(chatHistoryPath, headers);
    const chatHistory = history[0];
    // const usersHistory = history[1];
    const reversedChatHistory = chatHistory.reverse();
    // console.log('chatHistory', chatHistory);
    // console.log('usersHistory', usersHistory);

    for (let i = 0; i < reversedChatHistory.length; i++) {
      const chatItem = reversedChatHistory[i];
      const senderId = chatItem.author_id;
      // const findedUser = usersHistory.find(
      //   (item) => item.app_user_id === senderId,
      // );
      const senderExists = initialFriendsRequestsList.some(
        (item) => item.author_id === senderId,
      );
      const isFirendApproved = profileFriendsList.some(
        (item) => item.app_user_id === senderId,
      );
      const isFriendsRequest = chatItem.request_status === 'requested';
      // console.log('log', isFriendsRequest, !senderExists, !isFirendApproved);

      if (
        isFriendsRequest &&
        !senderExists &&
        !isFirendApproved &&
        userId !== senderId
      ) {
        // console.log('logging');
        // console.log('findedUser', findedUser);
        // const userInfo = {
        //   app_user_id: findedUser.app_user_id,
        //   app_user_name: findedUser.app_user_name,
        //   activities: findedUser.profile.activities,
        //   profile: findedUser.profile,
        // };
        // console.log('userInfo', userInfo);
        // const chatItemWithProfile = {...chatItem, ...userInfo};
        // console.log('chatItemWithProfile', chatItemWithProfile);
        initialFriendsRequestsList.push(chatItem);
      }
    }

    setFriendsRequestsList([...initialFriendsRequestsList]);
    setRefreshing(false);
  };

  const connectToSocket = async () => {
    const token = await getAccessToken();
    const conn = new WebSocket(`${socketUrl}${token}`);
    setSocket(conn);
  };

  const approveFrendship = async (id) => {
    const headers = await getHeadersWithToken('urlencoded');

    let postData = new URLSearchParams();
    postData.append('app_user_id', id);
    postData.append('profile_rel_status', 'friends');

    const req = await axiosPost(addToFriendsPath, postData, headers);
    console.log('req', req);
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
          refreshing={refreshing}
          approveFrendshipAction={(id) => approveFrendship(id)}
          showProfileAction={(route, params) => stackPush(route, params)}
          showChatAction={(route, params) => stackPush(route, params)}
          onRefresh={() => {
            getFriendsList();
            getFriendsRequestsList();
          }}
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
