import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import * as turf from '@turf/turf';
// import circle from '@turf/circle'; // need to remove
import {mapBoxToken} from '../../api/api';
import Alert from '../../misc/Alert/Alert';
import {defaultLocation} from '../../data';

MapboxGL.setAccessToken(mapBoxToken);

const PrivacyBubble = () => {
  const navigation = useNavigation();

  const [circleCoordinates, setCircleCoordinates] = useState(defaultLocation);
  const [isLocPermitionGranted, setIsLocPermitionGranted] = useState(false);

  const center = circleCoordinates;
  const radius = 1;
  const options = {steps: 64, units: 'miles', properties: {foo: 'bar'}};
  const myCircle = turf.circle(center, radius, options);
  console.log('myCircle', myCircle);

  const getUserLocationPermision = async () => {
    if (Platform.OS === 'android') {
      const isGranted = await MapboxGL.requestAndroidLocationPermissions();
      setIsLocPermitionGranted(isGranted);
    }
  };

  const stackNavigate = (route) => {
    navigation.navigate(route);
  };

  const handleUserLocation = (e) => {
    setCircleCoordinates([e.coords.longitude, e.coords.latitude]);
  };

  const handleMapPress = (e) => {
    setCircleCoordinates(e.geometry.coordinates);
  };

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
        <MapboxGL.Camera zoomLevel={12} followUserLocation />
        <MapboxGL.UserLocation
          minDisplacement={10000}
          onUpdate={(e) => handleUserLocation(e)}
        />
        <MapboxGL.PointAnnotation id="Point" coordinate={circleCoordinates} />
        {renderCircle}
      </MapboxGL.MapView>
      <Alert
        title={'Set up your Privacy Bubble'}
        text={
          'You will not be tracked or displayed while you presenting in that area'
        }
        type={'next'}
        action1={() => stackNavigate('ChooseActivity')}
      />
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
