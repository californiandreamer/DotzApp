import React, {Fragment, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
// import * as turf from '@turf/helpers'; // need to remove ?
import MapboxGL from '@react-native-mapbox-gl/maps';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import {getAccessToken} from '../../hooks/useAccessToken';
import {getHeadersWithToken} from '../../hooks/useApiData';
import {mapBoxToken, profileImageUrl, socketUrl} from '../../api/api';
import Alert from '../../misc/Alert/Alert';
import PopUp from '../../misc/PopUp/PopUp';
import BurgerImg from '../../assets/icons/ic-menu.png';
import BlastPinImg from '../../assets/icons/ic-blast-pin.png';
import LocationImg from '../../assets/icons/ic-Location2.png';
import BlastMessageImg from '../../assets/icons/ic-message.png';
import AvatarPlaceholderImg from '../../assets/images/avatar.jpg';
import NextImg from '../../assets/icons/icon-siguiente.png';
import {getItem} from '../../hooks/useAsyncStorage';
import {axiosGet} from '../../hooks/useAxios';
import {
  activitiesImagePath,
  activitiesPath,
  profileImagePath,
} from '../../api/routes';
import {calculateByCoordinates} from '../../hooks/useDistanceCalculator';
import {privacyBubbleData} from '../../data';
import {TextInput} from 'react-native-gesture-handler';

MapboxGL.setAccessToken(mapBoxToken);

const Main = ({route}) => {
  const navigation = useNavigation();

  const [usersData, setUsersData] = useState([]);
  console.log('usersData', usersData);
  const [blastPinsData, setBlastPinsData] = useState([]);
  const [userLocation, setUserLocation] = useState([]);
  const [userId, setUserId] = useState('');
  const [blastMessageContent, setBlastMessageContent] = useState('');
  const [blastMessageActivity, setBlastMessageActivity] = useState('');
  const [blastMessageToggle, setBlastMessageToggle] = useState(false);
  const [blastPinContent, setBlastPinContent] = useState("Let's meet here");
  const [blastPinCoordinates, setBlastPinCoordinates] = useState(userLocation);
  const [blastPinMode, setBlastPinMode] = useState(false);
  const [userCurrentActivity, setUserCurrentActivity] = useState('1');
  const [activities, setActivities] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [popUpProps, setPopUpProps] = useState({});
  const [alertProps, setAlertProps] = useState({});
  const [activeUser, setActiveUser] = useState(null);
  const [socket, setSocket] = useState(null);

  const getUserData = async () => {
    const profile = await getItem('profile');
    const parsedProfile = JSON.parse(profile);
    setUserId(parsedProfile.app_user_id);
    setUserCurrentActivity(parsedProfile.profile_current_act);
  };

  const getActivities = async () => {
    const request = await axiosGet(activitiesPath);
    setActivities(request);
  };

  const stackPush = (route, params) => {
    navigation.push(route, params);
  };

  let initialPinsArr = [];
  let initialUsersArr = [];
  const connectToSocket = async () => {
    const token = await getAccessToken();

    let conn = new WebSocket(`${socketUrl}${token}`);
    setSocket(conn);

    // Geolocation.getCurrentPosition(async (geolocation) => {
    //   const location = [
    //     geolocation.coords.longitude,
    //     geolocation.coords.latitude,
    //   ];

    //   const profile = await getItem('profile');
    //   const parsedProfile = JSON.parse(profile);
    //   const privacyBubble = parsedProfile.profile_privacy_buble;
    //   const parsedPrivacyBubble = JSON.parse(privacyBubble);
    //   const distance = calculateByCoordinates(location, parsedPrivacyBubble);
    //   const distanceInMiles = distance * 0.621371192;

    //   const timeStamp = +new Date();
    //   const formatedTimeStamp = timeStamp / 1000;
    //   const stringedTimeStamp = JSON.stringify(formatedTimeStamp);
    //   const stringedUserLocation = JSON.stringify(location);
    //   const obj = {
    //     my_cur_loc: stringedUserLocation,
    //     msg_timestamp_sent: stringedTimeStamp,
    //   };
    //   const stringed = JSON.stringify(obj);

    //   if (distanceInMiles > privacyBubbleData.distance) {
    //     conn.onopen = (e) => {
    //       conn.send(stringed);
    //     };
    //   }
    // });

    conn.onmessage = (e) => {
      const data = e.data;
      const parsedData = JSON.parse(data);
      // console.log('parsedData', parsedData);

      if (parsedData.hasOwnProperty('users')) {
        const users = parsedData.users;
        initialUsersArr = users;
        setUsersData(users);

        for (let i = 0; i < users.length; i++) {
          const item = users[i];
          const pin = item.c_user_profile.bPin_ev;
          const isExist = initialPinsArr.some(
            (el) =>
              el.pin_data.bPin_ev_id === item.c_user_profile.bPin_ev.bPin_ev_id,
          );

          if (pin !== null && !isExist) {
            initialPinsArr.push({...item, pin_data: {...pin}});
          }
          setBlastPinsData([...initialPinsArr]);
        }
      }
      if (parsedData.hasOwnProperty('my_cur_loc')) {
        const newUserLocation = parsedData.my_cur_loc;
        if (initialUsersArr.length > 0) {
          let items = [...initialUsersArr];
          let item = {...items[initialUsersArr.length - 1]};
          item.my_cur_loc = newUserLocation;
          items[initialUsersArr.length - 1] = item;
          setUsersData(items);
        }
      }
      if (parsedData.hasOwnProperty('bPin_ev_author')) {
        if (senderId === userId) {
          setAlertVisible(true);
          setAlertProps({
            type: 'error',
            title: 'Success',
            text: 'Your blast pin was posted',
            closeAction: hideAlert,
          });
        }
      }
      if (parsedData.hasOwnProperty('bPin_ev_joiner')) {
        const senderId = parsedData.bPin_ev_joiner;
        const findedUser = usersData.find(
          (item) => item.c_user_id === senderId,
        );
        const findedUserName = findedUser.c_name;

        if (senderId !== userId) {
          setAlertVisible(true);
          setAlertProps({
            type: 'error',
            title: 'Good news',
            text: `${findedUserName} confirmed invitation to your event`,
            closeAction: hideAlert,
          });
        } else {
          setAlertVisible(true);
          setAlertProps({
            type: 'error',
            title: 'Success',
            text: 'You confirmed invitation to event',
            closeAction: hideAlert,
          });
        }
      }
      if (parsedData.hasOwnProperty('blast_msg')) {
        const senderId = parsedData.blast_author_user_id;
        const blastActivity = parsedData.blast_activities;
        const findedUser = usersData.find(
          (item) => item.c_user_id === senderId,
        );
        const findedUserName = findedUser.c_name;
        const findedUserImage = findedUser.c_user_profile.profile_img_ava;

        if (senderId !== userId) {
          if (userCurrentActivity === blastActivity) {
            setPopUpVisible(true);
            setPopUpProps({
              name: findedUserName,
              image: findedUserImage,
              title: 'Blast Message',
              type: 'receive',
              text: parsedData.blast_msg,
              action1: confirmBlastMessage,
              closeAction: hidePopUp,
            });
          }
        } else {
          hidePopUp();
          setAlertVisible(true);
          setAlertProps({
            type: 'error',
            title: 'Success',
            text:
              'Your blast message was received by each user with choosen activity',
            closeAction: hideAlert,
          });
        }
      }
    };
  };

  // const getUserLocation = async () => {

  // };

  // const handleUserLocationChanging = async () => {
  //   const profile = await getItem('profile');
  //   const parsedProfile = JSON.parse(profile);
  //   const privacyBubble = parsedProfile.profile_privacy_buble;
  //   const parsedPrivacyBubble = JSON.parse(privacyBubble);
  //   const distance = calculateByCoordinates(userLocation, parsedPrivacyBubble);
  //   const distanceInMiles = distance * 0.621371192;

  //   const timeStamp = +new Date();
  //   // const formatedTimeStamp = timeStamp / 1000;
  //   const stringedTimeStamp = JSON.stringify(timeStamp);
  //   const stringedUserLocation = JSON.stringify(userLocation);
  //   const obj = {
  //     my_cur_loc: stringedUserLocation,
  //     msg_timestamp_sent: stringedTimeStamp,
  //   };
  //   const stringed = JSON.stringify(obj);
  //   // console.log('obj', stringed);

  //   const token = await getAccessToken();
  //   const conn = new WebSocket(`${socketUrl}${token}`);

  //   conn.onopen = () => {
  //     if (distanceInMiles > privacyBubbleData.distance) {
  //       conn.send(stringed);
  //     }
  //   };
  // };

  const checkFriendship = (user) => {
    const usersFriends =
      user.c_user_profile.friends || JSON.parse(user.c_user_profile).friends;
    const isFriend = usersFriends.some((item) => item.app_user_id === userId);
    const userCurrentActivity = user.c_user_profile.profile_current_act;
    const findedActivity = activities.find(
      (item) => item.activity_id === userCurrentActivity,
    );

    return isFriend &&
      user.c_user_profile !== null &&
      user.c_user_profile.profile_img_ava ? (
      <Image
        style={s.mapPopUpImg}
        source={{
          uri: `${profileImagePath}/${user.c_user_profile.profile_img_ava}`,
        }}
      />
    ) : (
      <Image
        style={s.mapPopUpImg}
        source={
          findedActivity && findedActivity.activity_img
            ? {
                uri: `${activitiesImagePath}/${findedActivity.activity_img}`,
              }
            : BlastMessageImg
        }
      />
    );
  };

  const addBlastMessage = () => {
    setPopUpVisible(true);
    setPopUpProps({
      title: 'Blast Message',
      type: 'compose',
      isActionDisabled: true,
      activities: activities,
      action1: () => setBlastMessageToggle((prev) => !prev), // toggle because function doesn't see state updates,
      onContentChange: (text) => setBlastMessageContent(text),
      onActivityChange: (id) => setBlastMessageActivity(id),
      closeAction: hidePopUp,
    });
  };

  const sendBlastMessage = () => {
    const timeStamp = +new Date();
    const stringedTimeStamp = JSON.stringify(timeStamp);
    const obj = {
      blast_msg: blastMessageContent,
      blast_activities: blastMessageActivity,
      msg_timestamp_sent: stringedTimeStamp,
    };
    const stringedObj = JSON.stringify(obj);
    if (socket && blastMessageActivity !== '' && blastMessageContent !== 0) {
      socket.send(stringedObj);
    }
    setPopUpProps({});
    setPopUpVisible(false);
    setBlastMessageContent('');
    setBlastMessageActivity('');
  };

  const confirmBlastMessage = () => {
    const timeStamp = +new Date();
    const stringedTimeStamp = JSON.stringify(timeStamp);
    const obj = {
      blast_join: 1,
      blast_author_user_id: userId,
      msg_timestamp_sent: stringedTimeStamp,
    };
    const stringedObj = JSON.stringify(obj);
    socket.send(stringedObj);

    hidePopUp();
    setAlertVisible(true);
    setAlertProps({
      type: 'error',
      title: 'Success',
      text: 'Your blast invitation was confirmed',
      closeAction: hideAlert,
    });
  };

  const addBlastPin = () => {
    setBlastPinMode((prev) => !prev);
  };

  const handleBlastPinCoordinates = (e) => {
    const coordinates = e.geometry.coordinates;
    setBlastPinCoordinates(coordinates);
  };

  const sendBlastPin = () => {
    const timeStamp = +new Date();
    const convertedTimeStamp = timeStamp / 1000;
    const expiringTimeStamp = convertedTimeStamp + 10800;
    const stringedTimeStamp = JSON.stringify(timeStamp);
    const stringedExpiringTimeStamp = JSON.stringify(expiringTimeStamp);
    const stringedBlastPinCoordinates = JSON.stringify(blastPinCoordinates);
    const obj = {
      bPin_start: 1,
      bPin_msg: blastPinContent,
      bPin_cors: stringedBlastPinCoordinates,
      bPin_expires_at: stringedExpiringTimeStamp,
      msg_timestamp_sent: stringedTimeStamp,
    };
    const stringedObj = JSON.stringify(obj);
    console.log('obj', obj);

    if (socket && blastPinCoordinates.length !== 0) {
      socket.send(stringedObj);
      cancelBlastPin();
    }
  };

  const confirmBlastPin = (id) => {
    const timeStamp = +new Date();
    const stringedTimeStamp = JSON.stringify(timeStamp);
    const obj = {
      bPin_join: 1,
      bPin_ev_id: id,
      msg_timestamp_sent: stringedTimeStamp,
    };
    const stringedObj = JSON.stringify(obj);
    socket.send(stringedObj);

    hidePopUp();
    setAlertVisible(true);
    setAlertProps({
      type: 'error',
      title: 'Success',
      text: 'Your blast invitation was confirmed',
      closeAction: hideAlert,
    });
  };

  const cancelBlastPin = () => {
    setBlastPinContent("Let's meet here");
    setBlastPinMode(false);
    setBlastPinCoordinates(userLocation);
    hideAlert();
  };

  const hidePopUp = () => {
    setPopUpVisible(false);
    setPopUpProps({});
  };

  const hideAlert = () => {
    setAlertVisible(false);
    setAlertProps({});
  };

  useEffect(() => {
    getUserData();
    getActivities();
  }, []);

  // useEffect(() => {
  //   handleUserLocationChanging();
  // }, [userLocation]);

  useEffect(() => {
    connectToSocket();
  }, [route]);

  useEffect(() => {
    sendBlastMessage();
  }, [blastMessageToggle]);

  // useEffect(() => {
  //   sendBlastPin();
  // }, [blastPinToggle]);

  useEffect(() => {
    if (blastMessageContent !== '' && blastMessageActivity !== '') {
      setPopUpProps({...popUpProps, isActionDisabled: false});
    } else {
      setPopUpProps({...popUpProps, isActionDisabled: true});
    }
  }, [blastMessageContent, blastMessageActivity]);

  const renderBurger = (
    <View style={[s.buttonOuter, {left: 16}]} key={'burger'}>
      <TouchableOpacity
        style={s.button}
        activeOpacity={0.8}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Image style={s.buttonImg} source={BurgerImg} />
      </TouchableOpacity>
    </View>
  );

  const renderBlastMessageBtn = (
    <View style={[s.buttonOuter, {right: 16}]} key={'blastMessage'}>
      <TouchableOpacity
        style={s.button}
        activeOpacity={0.8}
        onPress={addBlastMessage}>
        <Image style={s.buttonImg} source={BlastMessageImg} />
      </TouchableOpacity>
    </View>
  );

  const renderBlastPinBtn = (
    <View style={[s.buttonOuter, {right: 76}]} key={'blastPin'}>
      <TouchableOpacity
        style={s.button}
        activeOpacity={0.8}
        onPress={addBlastPin}>
        <Image style={s.buttonImg} source={BlastPinImg} />
      </TouchableOpacity>
    </View>
  );

  const renderBlastPin = (
    <MapboxGL.MarkerView
      id={'blastPin'}
      coordinate={
        blastPinCoordinates.length !== 0 ? blastPinCoordinates : userLocation
      }>
      <View style={s.blastPinContainer}>
        <View style={s.blastPinBox}>
          <View style={s.wrapper}>
            <Text style={s.blastPinTitle}>Blast Pin</Text>
            <TextInput
              style={s.blastPinInput}
              value={blastPinContent}
              onChange={(e) => {
                e.persist();
                setBlastPinContent(e.nativeEvent.text);
              }}
            />
            <TouchableOpacity
              style={s.nextBtn}
              activeOpacity={0.8}
              onPress={sendBlastPin}>
              <Image style={s.nextImg} source={NextImg} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={s.blastPin}>
          <Image style={s.blastPinImg} source={LocationImg} />
        </View>
      </View>
    </MapboxGL.MarkerView>
  );

  const renderPins = blastPinsData.map((pin) => (
    <MapboxGL.MarkerView
      key={pin.pin_data.bPin_ev_id}
      id={pin.pin_data.bPin_ev_id}
      coordinate={JSON.parse(pin.pin_data.bPin_cors)}>
      <TouchableOpacity
        style={s.blastPinMap}
        activeOpacity={0.8}
        onPress={() => {
          setPopUpVisible(true);
          setPopUpProps({
            name: pin.c_name,
            image: pin.c_user_profile.profile_img_ava,
            title: 'Blast Pin',
            type: 'receive',
            text: pin.pin_data.bPin_msg,
            action1: () => confirmBlastPin(pin.pin_data.bPin_ev_id),
            closeAction: hidePopUp,
          });
        }}>
        <Image style={s.blastPinImg} source={LocationImg} />
      </TouchableOpacity>
    </MapboxGL.MarkerView>
  ));

  const renderUsers = usersData.map((user) =>
    user.my_cur_loc !== null && user.c_user_id !== userId ? (
      <MapboxGL.MarkerView
        key={user.c_user_id}
        id={user.c_user_id}
        coordinate={JSON.parse(user.my_cur_loc)}>
        <View
          style={[
            s.mapPopUpInner,
            {
              backgroundColor:
                activeUser === user.c_user_id ? '#141F25' : 'transparent',
              elevation: activeUser === user.c_user_id ? 15 : 0,
            },
          ]}>
          <TouchableOpacity
            style={s.mapPopUpBtn}
            activeOpacity={0.8}
            onPress={() => setActiveUser(user.c_user_id)}>
            {(() => checkFriendship(user))()}
          </TouchableOpacity>
          {activeUser === user.c_user_id ? (
            <Fragment>
              <Text style={s.mapPopUpName}>{user.c_name}</Text>
              <TouchableOpacity
                style={s.nextBtn}
                activeOpacity={0.8}
                onPress={() =>
                  stackPush('Profile', {
                    id: user.c_user_id,
                    name: user.c_name,
                    city: user.c_user_profile.profile_city,
                    activities: user.c_user_profile.activities,
                    currentActivity: user.c_user_profile.profile_current_act,
                    image: user.c_user_profile.profile_img_ava,
                    activities: user.c_user_profile.activities,
                    verified: user.c_user_profile.profile_verified,
                    club: user.c_user_profile.profile_club,
                  })
                }>
                <Image style={s.nextImg} source={NextImg} />
              </TouchableOpacity>
            </Fragment>
          ) : null}
        </View>
      </MapboxGL.MarkerView>
    ) : null,
  );

  return (
    <View style={s.container}>
      <MapboxGL.MapView
        style={s.map}
        compassEnabled={false}
        attributionEnabled={false}
        logoEnabled={false}
        onPress={(e) => (blastPinMode ? handleBlastPinCoordinates(e) : null)}
        onLongPress={() => setActiveUser(null)}>
        <MapboxGL.Camera zoomLevel={12} followUserLocation />
        <MapboxGL.UserLocation
          minDisplacement={10000}
          onUpdate={(e) =>
            setUserLocation([e.coords.longitude, e.coords.latitude])
          }
        />
        {renderUsers}
        {renderPins}
        {blastPinMode ? renderBlastPin : null}
      </MapboxGL.MapView>
      {[renderBurger, renderBlastMessageBtn, renderBlastPinBtn]}
      {alertVisible ? <Alert {...alertProps} /> : null}
      {popUpVisible ? <PopUp {...popUpProps} /> : null}
    </View>
  );
};

export default Main;

const innerWidth = Dimensions.get('window').width;
const innerHeight = Dimensions.get('window').height;

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  wrapper: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mask: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapPopUpBtn: {
    width: 50,
    height: 50,
    padding: 2,
    backgroundColor: '#141F25',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 50,
  },
  mapPopUpImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 100,
  },
  mapPopUpInner: {
    maxWidth: 100,
    padding: 8,
    borderRadius: 16,
    backgroundColor: '#141F25',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mapPopUpName: {
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 12,
    color: '#fff',
  },
  nextBtn: {
    width: 30,
    height: 30,
  },
  nextImg: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  buttonOuter: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 32,
    zIndex: 0,
  },
  button: {
    width: 50,
    height: 50,
  },
  buttonImg: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  add: {
    width: 66,
    height: 66,
    position: 'absolute',
    right: 16,
    bottom: 16,
    zIndex: 110,
  },
  addBtn: {
    width: '100%',
    height: '100%',
  },
  addImg: {
    width: 66,
    height: 66,
    resizeMode: 'contain',
  },
  addRoute: {
    width: 44,
    height: 44,
    position: 'absolute',
    right: 26,
    bottom: 100,
    zIndex: 101,
  },
  addPlace: {
    width: 44,
    height: 44,
    position: 'absolute',
    right: 26,
    bottom: 160,
    zIndex: 101,
  },
  addImgSmall: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  addText: {
    width: 70,
    position: 'absolute',
    top: 10,
    left: -60,
    zIndex: 20,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#fff',
  },
  blastPinContainer: {
    width: 200,
    height: 320,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  },
  blastPinBox: {
    maxWidth: 200,
    backgroundColor: '#141F25',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  blastPinTitle: {
    textAlign: 'center',
    fontFamily: 'Atma-SemiBold',
    fontSize: 20,
    color: '#fff',
  },
  blastPinInput: {
    height: 60,
    textAlign: 'center',
    backgroundColor: '#141F25',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 16,
    color: '#F0FCFF',
  },
  blastPin: {
    width: 50,
    height: 50,
    left: '50%',
    transform: [{translateX: -25}],
  },
  blastPinMap: {
    width: 50,
    height: 50,
  },
  blastPinImg: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
