import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, Platform, Image, Animated} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {mapBoxToken} from '../../api/api';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BurgerImg from '../../assets/icons/ic-menu.png';
import PlusImg from '../../assets/icons/ic-plus.png';
import RouteImg from '../../assets/icons/ic-plus1.png';
import CompassImg from '../../assets/icons/ic-plus2.png';
import Alert from '../../misc/Alert/Alert';
import Bar from '../../misc/Bar/Bar';

MapboxGL.setAccessToken(mapBoxToken);

const Main = () => {
  const navigation = useNavigation();

  const [openOptions, setOpenOptions] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [isLocPermitionGranted, setIsLocPermitionGranted] = useState(false);
  const [alertProps, setAlertProps] = useState({});

  const routeBtnVal = useRef(new Animated.Value(30)).current;
  const placeBtnVal = useRef(new Animated.Value(30)).current;
  const textOpacityVal = useRef(new Animated.Value(0)).current;
  const rotatingVal = useRef(new Animated.Value(0)).current;

  const spin = rotatingVal.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '135deg'],
  });

  const toggleOptions = () => {
    openOptions ? hideOptions() : showOptions();
    setOpenOptions((prev) => !prev);
  };

  const showOptions = () => {
    Animated.timing(routeBtnVal, {
      toValue: 160,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(placeBtnVal, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(textOpacityVal, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(rotatingVal, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const hideOptions = () => {
    Animated.timing(routeBtnVal, {
      toValue: 30,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(placeBtnVal, {
      toValue: 30,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(textOpacityVal, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(rotatingVal, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const getUserLocationPermision = async () => {
    if (Platform.OS === 'android') {
      const isGranted = await MapboxGL.requestAndroidLocationPermissions();
      setIsLocPermitionGranted(isGranted);
    }
  };

  const stackNavigate = (route) => {
    navigation.navigate(route);
  };

  const addOption = (type) => {
    hideOptions();
    setOpenOptions(false);
    setAlertVisible(true);
    setAlertProps({
      title: type === 'route' ? 'Submit a Route' : 'Submit a Place',
      text:
        type === 'route'
          ? 'Enter a name of this Route'
          : 'Enter a name of this Place',
      type: 'input',
      action1: () => nextAlertStep(type),
      closeAction: () => cancelAdding(),
    });
  };

  const nextAlertStep = (type) => {
    setAlertProps({
      title: type === 'route' ? 'Submit a Route' : 'Submit a Place',
      text:
        type === 'route'
          ? 'Draw a Route from Start to Finish'
          : 'Drop a Pin on a Place you want to submit',
      type: 'choice',
      action1: () => cancelAdding(),
      action2: () => cancelAdding(),
      // closeAction: () => cancelAdding(),
    });
  };

  const cancelAdding = () => {
    setAlertVisible(false);
  };

  useEffect(() => {
    getUserLocationPermision();
  }, []);

  const renderOptions = (
    <View>
      <Animated.View style={[s.addRoute, {bottom: routeBtnVal}]}>
        <Animated.Text style={[s.addText, {opacity: textOpacityVal}]}>
          Route
        </Animated.Text>
        <TouchableOpacity
          style={s.addBtn}
          activeOpacity={0.8}
          onPress={() => addOption('route')}>
          <Image style={s.addImgSmall} source={RouteImg} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[s.addPlace, {bottom: placeBtnVal}]}>
        <Animated.Text style={[s.addText, {opacity: textOpacityVal}]}>
          Place
        </Animated.Text>
        <TouchableOpacity
          style={s.addBtn}
          activeOpacity={0.8}
          onPress={() => addOption('place')}>
          <Image style={s.addImgSmall} source={CompassImg} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          s.add,
          {
            transform: [{rotate: spin}],
          },
        ]}>
        <TouchableOpacity
          style={s.addBtn}
          activeOpacity={1}
          onPress={() => {
            toggleOptions();
          }}>
          <Image style={s.addImg} source={PlusImg} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );

  return (
    <View style={s.container}>
      <MapboxGL.MapView
        style={s.map}
        compassEnabled={false}
        attributionEnabled={false}
        logoEnabled={false}>
        <MapboxGL.Camera zoomLevel={12} followUserLocation />
        <MapboxGL.UserLocation
        // onUpdate={(e) => console.log(e)}
        />
      </MapboxGL.MapView>
      <View style={s.burger}>
        <TouchableOpacity
          style={s.burgerBtn}
          activeOpacity={0.8}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Image style={s.burgerImg} source={BurgerImg} />
        </TouchableOpacity>
      </View>
      {openOptions ? <View style={s.mask} /> : null}
      {/* {renderOptions} */}
      <Bar />
      {alertVisible ? <Alert {...alertProps} /> : null}
    </View>
  );
};

export default Main;

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
    // position: 'relative',
    // zIndex: 0,
  },
  burger: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 32,
    left: 16,
    zIndex: 1,
  },
  burgerBtn: {
    width: 50,
    height: 50,
  },
  burgerImg: {
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
    width: 60,
    position: 'absolute',
    top: 10,
    left: -60,
    zIndex: 20,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 20,
    color: '#fff',
  },
});
