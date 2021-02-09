import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, Platform, Image, Animated} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {mapBoxToken} from '../../api/api';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import BurgerImg from '../../assets/icons/ic-menu.png';
import PlusImg from '../../assets/icons/ic-plus.png';
import RouteImg from '../../assets/icons/ic-plus1.png';
import CompassImg from '../../assets/icons/ic-plus2.png';
import BlastPinImg from '../../assets/icons/ic-blast-pin.png';
import BlastMessageImg from '../../assets/icons/ic-message.png';
import GirlImg from '../../assets/images/girl.jpg';
import NextImg from '../../assets/icons/icon-siguiente.png';
import Alert from '../../misc/Alert/Alert';
import Bar from '../../misc/Bar/Bar';
import PopUp from '../../misc/PopUp/PopUp';
import Button from '../../misc/Button/Button';

MapboxGL.setAccessToken(mapBoxToken);

const Main = () => {
  const navigation = useNavigation();

  const [openOptions, setOpenOptions] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [popUpProps, setPopUpProps] = useState({});
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

  const hidePopUp = () => {
    setPopUpVisible(false);
    setPopUpProps({});
  };

  const cancelAdding = () => {
    setAlertVisible(false);
  };

  useEffect(() => {
    getUserLocationPermision();
  }, []);

  const renderBurger = (
    <View style={[s.buttonOuter, {left: 16}]}>
      <TouchableOpacity
        style={s.button}
        activeOpacity={0.8}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Image style={s.buttonImg} source={BurgerImg} />
      </TouchableOpacity>
    </View>
  );

  const renderBlastMessageBtn = (
    <View style={[s.buttonOuter, {right: 16}]}>
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
    <View style={[s.buttonOuter, {right: 76}]}>
      <TouchableOpacity style={s.button} activeOpacity={0.8}>
        <Image style={s.buttonImg} source={BlastPinImg} />
      </TouchableOpacity>
    </View>
  );

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

  const renderPlace = (
    <MapboxGL.MarkerView
      key={'test'}
      id="Test"
      coordinate={[-118.243683, 34.052235]}>
      <View style={s.mapPopUp}>
        <View style={s.mapPopUpInner}>
          <TouchableOpacity
            style={s.mapPopUpBtn}
            activeOpacity={0.8}
            onPress={() => console.log('Hello!')}>
            <Image style={s.mapPopUpImg} source={GirlImg} />
          </TouchableOpacity>
          <Text style={s.mapPopUpName}>John Doe</Text>
          <TouchableOpacity
            style={s.nextBtn}
            activeOpacity={0.8}
            onPress={() => stackNavigate('Profile')}>
            <Image style={s.nextImg} source={NextImg} />
          </TouchableOpacity>
        </View>
      </View>
    </MapboxGL.MarkerView>
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
        {renderPlace}
      </MapboxGL.MapView>
      {[renderBurger, renderBlastMessageBtn, renderBlastPinBtn]}
      {alertVisible ? <Alert {...alertProps} /> : null}
      {openOptions ? <View style={s.mask} /> : null}
      {popUpVisible ? <PopUp {...popUpProps} /> : renderOptions}
      {/* {renderOptions} */}
      {/* <Bar /> */}
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
  },
  mapPopUp: {
    width: 100,
    height: 130,
  },
  mapPopUpBtn: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  mapPopUpImg: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  mapPopUpInner: {
    width: 100,
    height: 130,
    padding: 8,
    backgroundColor: '#141F25',
    borderRadius: 16,
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
