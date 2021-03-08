import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import * as turf from '@turf/turf';
// import circle from '@turf/circle'; // need to remove
import {headersFormData, mapBoxToken, url} from '../../api/api';
import Alert from '../../misc/Alert/Alert';
import {defaultLocation, privacyBubbleContent, errorsContent} from '../../data';
import {axiosPost} from '../../hooks/useAxios';
import {registrationPath} from '../../api/routes';

MapboxGL.setAccessToken(mapBoxToken);

const PrivacyBubble = ({route}) => {
  const email = route.params.email;
  const password = route.params.password;
  const name = route.params.name;
  const city = route.params.city;
  const activities = route.params.activities;
  const image = route.params.image;

  const navigation = useNavigation();

  const [error, setError] = useState({
    isVisible: false,
    title: '',
    text: '',
  });
  const [circleCoordinates, setCircleCoordinates] = useState(defaultLocation);
  const [isLocPermitionGranted, setIsLocPermitionGranted] = useState(false);

  const center = circleCoordinates;
  const radius = 0.5;
  const options = {steps: 64, units: 'miles', properties: {foo: 'bar'}};
  const myCircle = turf.circle(center, radius, options);

  const getUserLocationPermision = async () => {
    if (Platform.OS === 'android') {
      const isGranted = await MapboxGL.requestAndroidLocationPermissions();
      setIsLocPermitionGranted(isGranted);
    }
  };

  const stackNavigate = (route) => {
    navigation.navigate(route);
  };

  const handleMapPress = (e) => {
    setCircleCoordinates(e.geometry.coordinates);
  };

  const registrationRequest = async () => {
    const stringedCoordinates = JSON.stringify(circleCoordinates);

    let postData = new FormData();
    postData.append('email', email);
    postData.append('password', password);
    postData.append('name', name);
    postData.append('profile_city', city);
    postData.append('activities', activities);
    postData.append('scope', 'app');
    postData.append('profile_privacy_buble', stringedCoordinates);
    postData.append('profile_img_ava', {
      uri: image.uri,
      name: image.fileName,
      type: image.type,
    });

    const request = await axiosPost(
      registrationPath,
      postData,
      headersFormData,
    );

    if (request.app_user_name === name) {
      stackNavigate('Login');
    } else {
      setError({
        isVisible: true,
        title: errorsContent.registrationError.title,
        text: errorsContent.registrationError.text,
      });
    }
  };

  const hideAlert = () => {
    setTimeout(() => {
      setError({isVisible: false, title: '', text: ''});
    }, 500);
  };

  const renderErrorAlert = (
    <Alert
      title={error.title}
      text={error.text}
      type="error"
      closeAction={hideAlert}
    />
  );

  const renderAlert = (
    <Alert
      title={privacyBubbleContent.title}
      text={privacyBubbleContent.text}
      type={'next'}
      action1={() => registrationRequest()}
    />
  );

  const renderCircle = (
    <MapboxGL.ShapeSource id="id" shape={myCircle}>
      <MapboxGL.LineLayer
        id="routeFill"
        style={{
          lineColor: '#F18303',
          lineWidth: 1,
        }}
      />
    </MapboxGL.ShapeSource>
  );

  useEffect(() => {
    getUserLocationPermision();
  }, []);

  return (
    <View style={s.container}>
      <MapboxGL.MapView
        style={s.map}
        compassEnabled={false}
        attributionEnabled={false}
        logoEnabled={false}
        onPress={(e) => handleMapPress(e)}>
        <MapboxGL.Camera zoomLevel={8} followUserLocation />
        <MapboxGL.UserLocation
          minDisplacement={100000}
          // onUpdate={(e) => handleUserLocation(e)}
        />
        <MapboxGL.PointAnnotation id="Point" coordinate={circleCoordinates} />
        {renderCircle}
      </MapboxGL.MapView>
      {renderAlert}
      {error.isVisible ? renderErrorAlert : null}
    </View>
  );
};

export default PrivacyBubble;

const s = StyleSheet.create({
  container: {
    width: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
