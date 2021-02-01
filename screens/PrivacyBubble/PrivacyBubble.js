import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {mapBoxToken} from '../../api/api';
import Alert from '../../misc/Alert/Alert';

const PrivacyBubble = () => {
  const navigation = useNavigation();

  const [isLocPermitionGranted, setIsLocPermitionGranted] = useState(false);

  MapboxGL.setAccessToken(mapBoxToken);

  const getUserLocationPermision = async () => {
    if (Platform.OS === 'android') {
      const isGranted = await MapboxGL.requestAndroidLocationPermissions();
      setIsLocPermitionGranted(isGranted);
    }
  };

  const stackNavigate = (route) => {
    navigation.navigate(route);
  };

  useEffect(() => {
    getUserLocationPermision();
  }, []);

  return (
    <View style={s.container}>
      <MapboxGL.MapView
        style={s.map}
        compassEnabled={false}
        attributionEnabled={false}
        logoEnabled={false}>
        <MapboxGL.Camera zoomLevel={4} followUserLocation />
        <MapboxGL.UserLocation onUpdate={(e) => console.log(e)} />
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
