import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import Tab from '../../misc/Tab/Tab';
import Header from '../../misc/Header/Header';
import Button from '../../misc/Button/Button';
import Changer from '../../misc/Changer/Changer';
import GradientImg from '../../assets/images/gradient.jpg';
import AvatarPlaceholderImg from '../../assets/images/avatar.jpg';
import DotImg from '../../assets/icons/ic-likeOn.png';
import PlusImg from '../../assets/icons/ic-plus.png';
import DistanceImg from '../../assets/icons/ic-distance.png';
import PersonImg from '../../assets/icons/Ic-Profile.png';
import SettingsImg from '../../assets/icons/Ic-Setting.png';
import LocationImg from '../../assets/icons/ic-Location2.png';
import VerificationImg from '../../assets/icons/ic-verification.png';
import {mapBoxToken, profileImageUrl, socketUrl} from '../../api/api';
import {getItem, setItem} from '../../hooks/useAsyncStorage';
import {axiosGet, axiosPost} from '../../hooks/useAxios';
import {getAccessToken} from '../../hooks/useAccessToken';
import {
  activitiesPath,
  chatHistoryPath,
  clubsPath,
  updateClubPath,
  clubImagePath,
} from '../../api/routes';
import {getHeadersWithToken} from '../../hooks/useApiData';
import CitySelector from '../../misc/CitySelector/CitySelector';
import ClubSelector from '../../misc/ClubSelector/ClubSelector';
import {calculateByCoordinates} from '../../hooks/useDistanceCalculator';
import Alert from '../../misc/Alert/Alert';
import {privacyBubbleData} from '../../data';

MapboxGL.setAccessToken(mapBoxToken);

const Profile = ({route}) => {
  const navigation = useNavigation();
  const tabProps = {
    tab1: 'Main info',
    tab2: 'Feed',
  };

  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isClubsListVisible, setClubsListVisible] = useState(false);
  const [clubsData, setClubsData] = useState([]);
  const [activeClub, setActiveClub] = useState({
    club_name: 'No clubs',
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({});
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

  const checkOwnProfile = async () => {
    const token = await getAccessToken();
    let conn = new WebSocket(`${socketUrl}${token}`);

    Geolocation.getCurrentPosition(async (geolocation) => {
      const location = [
        geolocation.coords.longitude,
        geolocation.coords.latitude,
      ];

      const profile = await getItem('profile');
      const parsedProfile = JSON.parse(profile);
      const privacyBubble = parsedProfile.profile_privacy_buble;
      const parsedPrivacyBubble = JSON.parse(privacyBubble);
      const distance = calculateByCoordinates(location, parsedPrivacyBubble);
      const distanceInMiles = distance * 0.621371192;

      const timeStamp = +new Date();
      const formatedTimeStamp = timeStamp / 1000;
      const stringedTimeStamp = JSON.stringify(formatedTimeStamp);
      const stringedUserLocation = JSON.stringify(location);
      const obj = {
        my_cur_loc: stringedUserLocation,
        msg_timestamp_sent: stringedTimeStamp,
      };
      const stringed = JSON.stringify(obj);

      if (distanceInMiles > privacyBubbleData.distance) {
        conn.onopen = (e) => {
          conn.send(stringed);
        };
      }
    });

    setSocket(conn);

    if (route.params !== undefined) {
      setIsOwnProfile(false);
      setProfileData({...route.params});
      getClubs(route.params.club);
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
      verified: parsedData.profile_verified,
      club: parsedData.profile_club,
    });
    getActivities(parsedData.activities);
    getClubs(parsedData.profile_club);
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
    setActivitiesData(request);
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

    setAlertVisible(true);
    setAlertProps({
      type: 'error',
      title: 'Success',
      text: 'You’ve sent the friendship request',
      closeAction: hideAlert,
    });
  };

  const sendPostLikeRequest = (id) => {
    const timeStamp = +new Date();
    const stringedTimeStamp = JSON.stringify(timeStamp);
    const obj = {
      pp_content: 'true',
      msg_timestamp_sent: stringedTimeStamp,
      post_action: 'incLike',
      type: 'post',
      pp_id: id,
    };

    socket.send(JSON.stringify(obj));
  };

  const handleUrlOpening = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      const splitedUrl = url.split('\n');
      if (supported) {
        Linking.openURL(splitedUrl[0]);
      }
    });
  };

  const getClubs = async (club) => {
    const headers = await getHeadersWithToken();
    const clubs = await axiosGet(clubsPath, headers);
    setClubsData(clubs);

    const activeClub = clubs.find((item) => item.club_id === club);

    if (activeClub !== null) {
      setActiveClub(activeClub);
    } else {
      setActiveClub({
        club_name: 'No clubs',
      });
    }
  };

  const sendNewClubRequest = async (id) => {
    const headersUrl = await getHeadersWithToken('urlencoded');
    let postData = new URLSearchParams();
    postData.append('club_id', id);
    const res = await axiosPost(updateClubPath, postData, headersUrl);
    setClubsListVisible(false);
  };

  const hideAlert = () => {
    setAlertVisible(false);
    setAlertProps({});
  };

  useEffect(() => {
    checkOwnProfile();
  }, []);

  const renderClubSelector = isClubsListVisible ? (
    <ClubSelector
      data={clubsData}
      onClubChange={(id) => sendNewClubRequest(id)}
      hideClubSelector={() => setClubsListVisible(false)}
    />
  ) : null;

  const renderMainInfo = (
    <View style={s.tabContent}>
      <Text style={s.title}>All Activities</Text>
      <Changer
        disabled
        activities={activitiesData}
        currentActivity={currentActivity}
        action={(activity) => setCurrentActivity(activity)}
      />
      <View style={s.rowStartWrapper}>
        <Text style={s.titleCubs}>Clubs</Text>
        {isOwnProfile ? (
          <TouchableOpacity
            style={s.addBtn}
            activeOpacity={0.8}
            onPress={() => setClubsListVisible(true)}>
            <Image style={s.addBtnImg} source={PlusImg} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={s.clubsRow}>
        <View style={s.clubItem}>
          <Image
            style={s.clubImg}
            source={
              activeClub && activeClub.club_img
                ? {uri: `${clubImagePath}/${activeClub.club_img}`}
                : null
            }
          />
          <Text style={s.clubText}>
            {activeClub && activeClub.club_name ? activeClub.club_name : null}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderFeed = (
    <View style={s.tabContent}>
      <Text style={s.title}>Latests posts</Text>
      {profileData.posts &&
        profileData.posts.map((post) => (
          <View style={s.post} key={post.pp_id}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleUrlOpening(post.pp_content)}>
              <Text style={s.text}>{post.pp_content}</Text>
            </TouchableOpacity>
            <View style={s.dotWrapper}>
              <TouchableOpacity
                style={s.dotBtn}
                activeOpacity={0.8}
                onPress={() => sendPostLikeRequest(post.pp_id)}>
                <Image style={s.dotImg} source={DotImg} />
                <Text style={s.dotText}>Dot it</Text>
              </TouchableOpacity>
              <Text style={s.dotCount}>{post.pp_likes}</Text>
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
    <View style={s.container}>
      {renderClubSelector}
      {alertVisible ? <Alert {...alertProps} /> : null}
      <ScrollView style={s.scrollBox}>
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
          <View style={s.rowWrapper}>
            <Text style={s.name}>{profileData.name}</Text>
            {profileData.verified && profileData.verified !== '0' ? (
              <Image style={s.verificationImg} source={VerificationImg} />
            ) : null}
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
    </View>
  );
};

export default Profile;

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#141F25',
  },
  scrollBox: {
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
  verificationImg: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
    marginLeft: 5,
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
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3A454B',
  },
  title: {
    width: '100%',
    fontFamily: 'Atma-SemiBold',
    fontSize: 24,
    color: '#fff',
  },
  titleCubs: {
    fontFamily: 'Atma-SemiBold',
    fontSize: 24,
    color: '#fff',
  },
  text: {
    textAlign: 'left',
    lineHeight: 26,
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
  addBtn: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  addBtnImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  // clubItem: {
  //   justifyContent: 'center',
  // },
  clubImg: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 50,
    marginBottom: 10,
  },
  clubText: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 20,
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
