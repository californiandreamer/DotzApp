import React, {Fragment, useEffect, useState} from 'react';
import {Platform, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Navigation from './utils/Navigation';
import ModalWindow from './misc/ModalWindow/ModalWindow';
import {geoLocationDisabledContent} from './data';

const App = () => {
  const [isLocPermitionGranted, setIsLocPermitionGranted] = useState(false);
  const [modalWindowProps, setModalWindowProps] = useState({
    isVisible: false,
  });

  const hideModalWindow = () => {
    setModalWindowProps({isVisible: false});
  };

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
  };

  useEffect(() => {
    getUserLocationPermision();
  }, []);

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
