import React, {Fragment, useEffect, useState} from 'react';
import {Platform, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Navigation from './utils/Navigation';
import ModalWindow from './misc/ModalWindow/ModalWindow';
import {geoLocationDisabledContent, privacyBubbleData} from './data';
import {socketUrl} from './api/api';
import {calculateByCoordinates} from './hooks/useDistanceCalculator';
import {getAccessToken} from './hooks/useAccessToken';
import {getItem} from './hooks/useAsyncStorage';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [userLocation, setUserLocation] = useState([]);
  console.log('userLocation', userLocation);
  const [modalWindowProps, setModalWindowProps] = useState({
    isVisible: false,
  });

  const getUserLocationPermision = async () => {
    if (Platform.OS === 'android') {
      const isGranted = await MapboxGL.requestAndroidLocationPermissions();
      if (isGranted) {
        setModalWindowProps({
          isVisible: false,
          title: '',
          buttonText: 'Try again',
          cancelText: 'Dismiss',
          action: getUserLocationPermision,
          cancelAction: hideModalWindow,
        });
      } else {
        setModalWindowProps({
          isVisible: true,
          title: geoLocationDisabledContent.title,
          buttonText: 'Try again',
          cancelText: 'Dismiss',
          action: getUserLocationPermision,
          cancelAction: hideModalWindow,
        });
      }
    }
    // connectToSocket();
  };

  // const connectToSocket = async () => {
  //   const token = await getAccessToken();
  //   if (token !== null) {
  //     const conn = new WebSocket(`${socketUrl}${token}`);
  //     setSocket(conn);
  //     console.log('token', token);
  //   }
  // };

  // const handleUserLocationChanging = async () => {
  //   const profile = await getItem('profile');
  //   const parsedProfile = JSON.parse(profile);
  //   const privacyBubble = parsedProfile.profile_privacy_buble;
  //   const parsedPrivacyBubble = JSON.parse(privacyBubble);
  //   const distance = calculateByCoordinates(userLocation, parsedPrivacyBubble);
  //   const distanceInMiles = distance * 1.36;

  //   const timeStamp = +new Date();
  //   // const formatedTimeStamp = timeStamp / 1000;
  //   const stringedTimeStamp = JSON.stringify(timeStamp);
  //   const stringedUserLocation = JSON.stringify(userLocation);
  //   const obj = {
  //     my_cur_loc: stringedUserLocation,
  //     msg_timestamp_sent: stringedTimeStamp,
  //   };
  //   const stringed = JSON.stringify(obj);

  //   if (distanceInMiles > privacyBubbleData.distance) {
  //     socket.send(stringed);
  //   }
  // };

  // const renderUserLocation = (
  //   <MapboxGL.UserLocation
  //     minDisplacement={1000}
  //     onUpdate={(e) => setUserLocation([e.coords.longitude, e.coords.latitude])}
  //   />
  // );

  const hideModalWindow = () => {
    setModalWindowProps({isVisible: false});
  };

  useEffect(() => {
    getUserLocationPermision();
  }, []);

  // useEffect(() => {
  //   handleUserLocationChanging();
  // }, [userLocation]);

  const renderModalWindow = modalWindowProps.isVisible ? (
    <ModalWindow {...modalWindowProps} />
  ) : null;

  return (
    <Fragment>
      <Navigation />
      {renderModalWindow}
    </Fragment>
  );
};

export default App;
