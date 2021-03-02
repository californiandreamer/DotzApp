import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {useNavigation} from '@react-navigation/native';
import Tab from '../../misc/Tab/Tab';
import Header from '../../misc/Header/Header';
import Button from '../../misc/Button/Button';
import Changer from '../../misc/Changer/Changer';
import GradientImg from '../../assets/images/gradient.jpg';
import AvatarPlaceholderImg from '../../assets/images/avatar.jpg';
import DotImg from '../../assets/icons/ic-likeOn.png';
import DistanceImg from '../../assets/icons/ic-distance.png';
import PersonImg from '../../assets/icons/Ic-Profile.png';
import SettingsImg from '../../assets/icons/Ic-Setting.png';
import LocationImg from '../../assets/icons/ic-Location2.png';
import {mapBoxToken, profileImageUrl, socketUrl} from '../../api/api';
import {getItem, setItem} from '../../hooks/useAsyncStorage';
import {axiosGet, axiosPost} from '../../hooks/useAxios';
import {getAccessToken} from '../../hooks/useAccessToken';
import {activitiesPath, chatHistoryPath} from '../../api/routes';
import {getHeadersWithToken} from '../../hooks/useApiData';

MapboxGL.setAccessToken(mapBoxToken);

const Profile = ({route}) => {
  const navigation = useNavigation();
  const tabProps = {
    tab1: 'Main info',
    tab2: 'Feed',
  };

  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [activeTab, setActiveTab] = useState(tabProps.tab1);
  const [activitiesData, setActivitiesData] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [currentActivity, setCurrentActivity] = useState(null);
  const [socket, setSocket] = useState(null);

  const getActiveTab = (value) => {
    setActiveTab(value);
  };

  const stackNavigate = (route) => {
    navigation.navigate(route);
  };

  const checkOwnProfile = () => {
    if (route.params !== undefined) {
      setIsOwnProfile(false);
      setProfileData({...route.params});
      getActivities(route.params.activities);
      checkIsFriend(route.params.id);
      setCurrentActivity(route.params.currentActivity);
    } else {
      getProfileData();
      setIsOwnProfile(true);
      setIsButtonVisible(false);
    }
  };

  const getProfileData = async () => {
    const data = await getItem('profile');
    const parsedData = JSON.parse(data);
    setCurrentActivity(parsedData.profile_current_act);
    setProfileData({
      id: parsedData.profile_id,
      name: parsedData.app_user_name,
      email: parsedData.email,
      city: parsedData.profile_city,
      currentActivity: parsedData.profile_current_act,
      activities: parsedData.activities,
      image: parsedData.profile_img_ava,
      posts: parsedData.posts,
    });
    getActivities(parsedData.activities);
  };

  const checkIsFriend = async (id) => {
    const data = await getItem('profile');
    const parsedData = JSON.parse(data);
    const profileFriendsList = parsedData.friends;
    const isFriend = profileFriendsList.some((item) => item.app_user_id === id);
    setIsButtonVisible(!isFriend);
    checkFriendRequestSended(id);
  };

  const checkFriendRequestSended = async (id) => {
    const headers = await getHeadersWithToken();
    const chatHistory = await axiosGet(chatHistoryPath, headers);
    const isRequestExist = chatHistory.some((item) => item.author_id === id);
    setIsButtonDisabled(isRequestExist);
  };

  const getActivities = async (current) => {
    const request = await axiosGet(activitiesPath);
    getCurrentActivities(current, request);
  };

  const getCurrentActivities = (current, data) => {
    let currentActivitiesArr = [];
    const activities = current;

    for (let i = 0; i < data.length; i++) {
      const id = data[i].activity_id;
      const value = activities.includes(id);
      if (value) {
        currentActivitiesArr.push(data[i]);
      }
    }

    setActivitiesData(currentActivitiesArr);
  };

  const connectToSocket = async () => {
    const token = await getAccessToken();
    const conn = new WebSocket(`${socketUrl}${token}`);
    setSocket(conn);
  };

  const sendFriendshipRequest = async () => {
    setIsButtonDisabled(true);
    const timeStamp = +new Date();
    const stringedTimeStamp = JSON.stringify(timeStamp);
    const obj = {
      msg: 'Friendship request',
      msg_reciever_id: profileData.id,
      msg_timestamp_sent: stringedTimeStamp,
      friendship_request: 'requested',
    };

    socket.send(JSON.stringify(obj));
  };

  useEffect(() => {
    connectToSocket();
    checkOwnProfile();
  }, []);

  const renderMainInfo = (
    <View style={s.tabContent}>
      <Text style={s.title}>Current activity</Text>
      <Changer
        disabled
        activities={activitiesData}
        currentActivity={currentActivity}
        action={(activity) => setCurrentActivity(activity)}
      />
    </View>
  );

  const renderFeed = (
    <View style={s.tabContent}>
      <Text style={s.title}>Latests posts</Text>
      {profileData.posts &&
        profileData.posts.map((post) => (
          <View style={s.post} key={post.pp_id}>
            <Text style={s.text}>{post.pp_content}</Text>
            <View style={s.dotWrapper}>
              <TouchableOpacity style={s.dotBtn} activeOpacity={0.8}>
                <Image style={s.dotImg} source={DotImg} />
                <Text style={s.dotText}>Dot it</Text>
              </TouchableOpacity>
              <Text style={s.dotCount}>1</Text>
            </View>
          </View>
        ))}
    </View>
  );
  {
    /* <View style={s.wrapper}>
        <MapboxGL.MapView
          style={s.map}
          compassEnabled={false}
          attributionEnabled={false}
          logoEnabled={false}>
          <MapboxGL.Camera zoomLevel={12} followUserLocation />
          <MapboxGL.UserLocation />
        </MapboxGL.MapView>
      </View> */
  }

  return (
    <ScrollView style={s.container}>
      <Header
        title={'Profile'}
        icon={SettingsImg}
        action={isOwnProfile ? () => stackNavigate('Settings') : null}
      />
      <Image style={s.background} source={GradientImg} />
      <View style={s.avatar}>
        <Image
          style={s.avatarImg}
          source={
            profileData.image
              ? {uri: `${profileImageUrl}/${profileData.image}`}
              : AvatarPlaceholderImg
          }
        />
      </View>
      <View style={s.content}>
        <View style={s.wrapper}>
          <Text style={s.name}>{profileData.name}</Text>
        </View>
        <View style={s.rowWrapper}>
          <Image style={s.locationImg} source={LocationImg} />
          <Text style={s.locationText}>{profileData.city}</Text>
        </View>
        <View style={s.wrapper}>
          <Tab {...tabProps} action={getActiveTab} />
        </View>
        <View style={s.wrapper}>
          {activeTab === tabProps.tab1 ? renderMainInfo : renderFeed}
        </View>
        {isButtonVisible ? (
          <View style={s.wrapper}>
            <Button
              text={'Add to friends'}
              style={'orange'}
              isDisabled={isButtonDisabled}
              action={() => sendFriendshipRequest()}
            />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default Profile;

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#141F25',
  },
  wrapper: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowWrapper: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowStartWrapper: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  background: {
    height: 180,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    resizeMode: 'cover',
  },
  avatar: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImg: {
    width: 150,
    height: 150,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: '#fff',
  },
  content: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    marginTop: 230,
  },
  name: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 20,
    color: '#fff',
  },
  locationImg: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
    marginRight: 5,
  },
  locationText: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 18,
    color: '#fff',
  },
  tabContent: {
    width: '100%',
    paddingVertical: 16,
  },
  post: {
    width: '100%',
    paddingVertical: 10,
  },
  title: {
    width: '100%',
    fontFamily: 'Atma-SemiBold',
    fontSize: 24,
    color: '#fff',
  },
  text: {
    textAlign: 'left',
    fontSize: 18,
    fontFamily: 'Gilroy-SemiBold',
    color: '#fff',
  },
  image: {
    width: 25,
    height: 25,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  dotWrapper: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dotBtn: {
    width: 42,
    height: 42,
  },
  dotImg: {
    width: 42,
    height: 42,
  },
  dotText: {
    width: 50,
    marginTop: 5,
    textTransform: 'uppercase',
    color: '#fff',
  },
  dotCount: {
    marginLeft: 5,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 32,
    color: '#fff',
  },
});

{
  /* <Text style={s.title}>All activities</Text>
      <Changer
        activities={activitiesData}
        action={(activity) => setCurrentActivity(activity)}
      /> */
}
{
  /* <View style={s.rowStartWrapper}>
        <Text style={s.text}>Miles since registration: 14</Text>
        <Image style={s.image} source={DistanceImg} />
      </View>
      <View style={s.rowStartWrapper}>
        <Text style={s.text}>Largest rideout: 21</Text>
        <Image style={s.image} source={PersonImg} />
      </View> */
}
