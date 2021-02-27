import React, {Fragment, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as turf from '@turf/turf';
// import * as turf from '@turf/helpers'; // need to remove ?
import MapboxGL from '@react-native-mapbox-gl/maps';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {
  activitiesImageUrl,
  mapBoxToken,
  profileImageUrl,
  socketUrl,
} from '../../api/api';
import BurgerImg from '../../assets/icons/ic-menu.png';
import BlastPinImg from '../../assets/icons/ic-blast-pin.png';
import BlastMessageImg from '../../assets/icons/ic-message.png';
import AvatarPlaceholderImg from '../../assets/images/avatar.jpg';
import NextImg from '../../assets/icons/icon-siguiente.png';
import Alert from '../../misc/Alert/Alert';
import PopUp from '../../misc/PopUp/PopUp';
import {
  getAccessToken,
  getHeadersWithAccessToken,
} from '../../hooks/useAccessToken';
import {axiosGet, axiosPost} from '../../hooks/useAxios';
import {defaultLocation} from '../../data';

MapboxGL.setAccessToken(mapBoxToken);

const Main = () => {
  const path = '/locations';
  const navigation = useNavigation();

  const [usersData, setUsersData] = useState([]);
  const [userLocation, setUserLocation] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [popUpProps, setPopUpProps] = useState({});
  const [alertProps, setAlertProps] = useState({});
  const [isLocPermitionGranted, setIsLocPermitionGranted] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  console.log('usersData', usersData);
  console.log('userLocation', userLocation);

  const getUserLocationPermision = async () => {
    if (Platform.OS === 'android') {
      const isGranted = await MapboxGL.requestAndroidLocationPermissions();
      setIsLocPermitionGranted(isGranted);
    }
  };

  const stackPush = (route, params) => {
    navigation.push(route, params);
  };

  const connectToSocket = async () => {
    console.log('connecting');
    const token = await getAccessToken();
    const conn = new WebSocket(`${socketUrl}${token}`);
    const timeStamp = +new Date();
    const stringedUserLocation = JSON.stringify(userLocation);
    const stringedTimeStamp = JSON.stringify(timeStamp);
    const obj = {
      my_cur_loc: stringedUserLocation,
      msg_timestamp_sent: stringedTimeStamp,
    };
    const stringed = JSON.stringify(obj);

    const headersUserToken = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const chatHistory = await axiosGet('chat/getChatHistory', headersUserToken);
    console.log('chatHistory', chatHistory);

    conn.onopen = (e) => {
      conn.send(stringed);
    };

    conn.onmessage = (e) => {
      const data = e.data;
      const parsedData = JSON.parse(data);
      console.log('onmessage', parsedData);
      if (parsedData.hasOwnProperty('users')) {
        const users = parsedData.users;
        setUsersData(users);
      }
    };
  };

  const hidePopUp = () => {
    setPopUpVisible(false);
    setPopUpProps({});
  };

  useEffect(() => {
    getUserLocationPermision();
  }, []);

  useEffect(() => {
    connectToSocket();
  }, [userLocation]);

  const renderBurger = (
    <View style={[s.buttonOuter, {left: 16}]} key="burger">
      <TouchableOpacity
        style={s.button}
        activeOpacity={0.8}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Image style={s.buttonImg} source={BurgerImg} />
      </TouchableOpacity>
    </View>
  );

  const renderBlastMessageBtn = (
    <View style={[s.buttonOuter, {right: 16}]} key="blastMessage">
      <TouchableOpacity
        style={s.button}
        activeOpacity={0.8}
        onPress={() => {
          setPopUpVisible(true);
          setPopUpProps({
            title: 'Blast Message',
            type: 'compose',
            action1: hidePopUp,
            action2: hidePopUp,
          });
        }}>
        <Image style={s.buttonImg} source={BlastMessageImg} />
      </TouchableOpacity>
    </View>
  );

  const renderBlastPinBtn = (
    <View style={[s.buttonOuter, {right: 76}]} key="blastPin">
      <TouchableOpacity style={s.button} activeOpacity={0.8}>
        <Image style={s.buttonImg} source={BlastPinImg} />
      </TouchableOpacity>
    </View>
  );

  const renderUsers = usersData.map((user) =>
    user.my_cur_loc !== null ? (
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
            <Image
              style={s.mapPopUpImg}
              source={
                user.c_user_profile !== null &&
                user.c_user_profile.profile_img_ava !== null
                  ? {
                      uri: `${profileImageUrl}/${user.c_user_profile.profile_img_ava}`,
                    }
                  : AvatarPlaceholderImg
              }
            />
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
        onLongPress={() => setActiveUser(null)}>
        <MapboxGL.Camera zoomLevel={12} followUserLocation />
        <MapboxGL.UserLocation
          minDisplacement={100}
          onUpdate={(e) =>
            setUserLocation([e.coords.longitude, e.coords.latitude])
          }
        />
        {renderUsers}
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
});
