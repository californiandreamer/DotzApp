import React, {Fragment, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as turf from '@turf/turf';
// import * as turf from '@turf/helpers'; // need to remove ?
import MapboxGL from '@react-native-mapbox-gl/maps';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {activitiesImageUrl, mapBoxToken} from '../../api/api';
import BurgerImg from '../../assets/icons/ic-menu.png';
import PlusImg from '../../assets/icons/ic-plus.png';
import RouteImg from '../../assets/icons/ic-plus1.png';
import CompassImg from '../../assets/icons/ic-plus2.png';
import BlastPinImg from '../../assets/icons/ic-blast-pin.png';
import BlastMessageImg from '../../assets/icons/ic-message.png';
import NextImg from '../../assets/icons/icon-siguiente.png';
import Alert from '../../misc/Alert/Alert';
import Bar from '../../misc/Bar/Bar';
import PopUp from '../../misc/PopUp/PopUp';
import {
  getAccessToken,
  getHeadersWithAccessToken,
} from '../../hooks/useAccessToken';
import {axiosGet, axiosPost} from '../../hooks/useAxios';
import {defaultLocation} from '../../data';
import {getItem} from '../../hooks/useAsyncStorage';

MapboxGL.setAccessToken(mapBoxToken);

const Main = () => {
  const path = '/locations';
  const navigation = useNavigation();

  const defCoords = [
    [21.11121270687144, 52.244992501492334],
    [21.11121270627144, 52.244992501493334],
  ];

  const [locationsData, setLocationsData] = useState([]);
  const [openOptions, setOpenOptions] = useState(false);
  const [barVisible, setBarVisible] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [popUpProps, setPopUpProps] = useState({});
  const [alertProps, setAlertProps] = useState({});
  const [isLocPermitionGranted, setIsLocPermitionGranted] = useState(false);

  const [activeLocation, setActiveLocation] = useState(null);
  const [userStartLocation, setUserStartLocation] = useState(defaultLocation);
  const [alertCityValue, setAlertCityValue] = useState('No city');
  const [alertInputValue, setAlertInputValue] = useState('No name');
  const [routeDrawerActive, setRouteDrawerActive] = useState(false);
  const [placeDrawerActive, setPlaceDrawerActive] = useState(false);
  const [drawedRouteCoordinates, setDrawedRouteCoordinates] = useState([]);
  const [drawedPlaceCoordinates, setDrawedPlaceCoordinates] = useState(
    userStartLocation,
  );

  console.log('alertCityValue', alertCityValue);
  console.log('alertInputValue', alertInputValue);
  console.log('drawedRouteCoordinates TOP', drawedRouteCoordinates);

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

  const handleUserLocation = (e) => {
    setUserStartLocation([e.coords.longitude, e.coords.latitude]);
  };

  const addOption = (type) => {
    hideOptions();
    setOpenOptions(false);
    setAlertVisible(true);
    setAlertProps({
      title: `Submit a ${type}`,
      text: `Enter a name of this ${type}`,
      text2: 'Enter a name of city',
      type: 'input',
      onType: (val) => setAlertInputValue(val),
      onType2: (val) => setAlertCityValue(val),
      action1: () => nextAlertStep(type),
      closeAction: () => cancelAdding(),
    });
  };

  const nextAlertStep = (type) => {
    if (type === 'route') {
      setRouteDrawerActive(true);
    } else {
      setPlaceDrawerActive(true);
    }
    setAlertProps({
      title: `Submit a ${type}`,
      text:
        type === 'route'
          ? 'Draw a Route from Start to Finish'
          : 'Drop a Pin on a Place you want to submit',
      type: 'choice',
      action1: () => cancelAdding(),
      action2: () => addLocaitonRequest(),
      closeAction: () => cancelAdding(),
    });
  };

  const hidePopUp = () => {
    setPopUpVisible(false);
    setPopUpProps({});
  };

  const cancelAdding = () => {
    setAlertInputValue('');
    setAlertVisible(false);
    setRouteDrawerActive(false);
    setDrawedRouteCoordinates([]);
    setPlaceDrawerActive(false);
  };

  const getLocations = async () => {
    const headers = await getHeadersWithAccessToken();
    const locations = await axiosGet(path, headers);
    console.log('locations', locations);
    setLocationsData(locations);
  };

  const drawRoute = (e) => {
    const touchCoordinates = e.geometry.coordinates;
    setDrawedRouteCoordinates((prev) => [...prev, touchCoordinates]);
  };

  const placePoint = turf.geometry('Point', drawedPlaceCoordinates);
  const drawPlace = (e) => {
    const touchCoordinates = e.geometry.coordinates;
    setDrawedPlaceCoordinates(touchCoordinates);
  };

  const returnShape = () => {
    if (drawedRouteCoordinates.length <= 1) {
      const point = turf.geometry('Point', drawedRouteCoordinates[0]);
      return point;
    } else {
      const point = turf.geometry('MultiPoint', []);
      const line = turf.geometry('LineString', drawedRouteCoordinates);
      const collection = turf.geometryCollection([point, line]);
      return collection;
    }
  };

  const addLocaitonRequest = async () => {
    // console.log('drawedRouteCoordinates', drawedRouteCoordinates);
    // const currentActivity = await getItem('current_activity');
    // const start = JSON.stringify(drawedRouteCoordinates[0]);
    // const finish = JSON.stringify(
    //   drawedRouteCoordinates[drawedRouteCoordinates.length - 1],
    // );
    // const routes = JSON.stringify(drawedRouteCoordinates);

    const currentActivity = await getItem('current_activity');
    const start = JSON.stringify(defaultLocation);
    const finish = JSON.stringify(defaultLocation);
    const routes = JSON.stringify([defaultLocation]);

    const token = await getAccessToken();
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    console.log('log', currentActivity, start, finish, routes, token);

    let postData = new URLSearchParams();
    postData.append('activity_id', currentActivity);
    postData.append('loc_p_title', alertInputValue);
    postData.append('loc_p_city', alertCityValue);
    postData.append('loc_p_cors_start', start);
    postData.append('loc_p_cors_finish', finish);
    postData.append('loc_p_cors_all', routes);

    const request = await axiosPost('locs_p/add', postData, headers);
    console.log('res', request);
  };

  useEffect(() => {
    getLocations();
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
          // setPopUpVisible(true);
          // setPopUpProps({
          //   title: 'Blast Message',
          //   type: 'compose',
          //   action1: hidePopUp,
          //   action2: hidePopUp,
          // });
          addLocaitonRequest();
        }}>
        <Image style={s.buttonImg} source={BlastMessageImg} />
      </TouchableOpacity>
    </View>
  );

  const renderBlastPinBtn = (
    <View style={[s.buttonOuter, {right: 76}]}>
      <TouchableOpacity
        style={s.button}
        activeOpacity={0.8}
        onPress={() => setBarVisible((prev) => !prev)}>
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

  const renderLocations = locationsData.map((location) => (
    <MapboxGL.MarkerView
      key={location.loc_id}
      id="Test"
      coordinate={JSON.parse(location.loc_cors_all)[0]}>
      <View
        style={[
          s.mapPopUpInner,
          {
            backgroundColor:
              activeLocation === location.loc_id ? '#141F25' : 'transparent',
            elevation: activeLocation === location.loc_id ? 15 : 0,
          },
        ]}>
        <TouchableOpacity
          style={s.mapPopUpBtn}
          activeOpacity={0.8}
          onPress={() => setActiveLocation(location.loc_id)}>
          <Image
            style={s.mapPopUpImg}
            source={{
              uri: `${activitiesImageUrl}/${location.activity.activity_img}`,
            }}
          />
        </TouchableOpacity>
        {activeLocation === location.loc_id ? (
          <Fragment>
            <Text style={s.mapPopUpName}>{location.loc_title}</Text>
            <TouchableOpacity
              style={s.nextBtn}
              activeOpacity={0.8}
              onPress={() => stackNavigate('Profile')}>
              <Image style={s.nextImg} source={NextImg} />
            </TouchableOpacity>
          </Fragment>
        ) : null}
      </View>
    </MapboxGL.MarkerView>
  ));

  const renderRouteDrawer =
    drawedRouteCoordinates.length !== 0 ? (
      <MapboxGL.ShapeSource id="id" shape={returnShape()}>
        <MapboxGL.LineLayer
          id="line"
          style={{
            lineColor: '#F18303',
            lineWidth: 3,
          }}
        />
        <MapboxGL.CircleLayer
          id="point"
          style={{
            circleRadius: 7,
            circleColor: '#F18303',
          }}
        />
      </MapboxGL.ShapeSource>
    ) : null;

  const renderPlaceDrawer = (
    <MapboxGL.ShapeSource id="id" shape={placePoint}>
      <MapboxGL.CircleLayer
        id="point"
        style={{
          circleRadius: 10,
          circleColor: '#F18303',
        }}
      />
    </MapboxGL.ShapeSource>
  );

  return (
    <View style={s.container}>
      <MapboxGL.MapView
        style={s.map}
        compassEnabled={false}
        attributionEnabled={false}
        logoEnabled={false}
        onPress={(e) =>
          routeDrawerActive
            ? drawRoute(e)
            : placeDrawerActive
            ? drawPlace(e)
            : null
        }>
        <MapboxGL.Camera zoomLevel={12} followUserLocation />
        <MapboxGL.UserLocation
          minDisplacement={10000}
          onUpdate={(e) => handleUserLocation(e)}
        />
        {routeDrawerActive
          ? renderRouteDrawer
          : placeDrawerActive
          ? renderPlaceDrawer
          : null}
        {renderLocations}
      </MapboxGL.MapView>
      {[renderBurger, renderBlastMessageBtn, renderBlastPinBtn]}
      {openOptions ? <View style={s.mask} /> : null}
      {renderOptions}
      {alertVisible ? <Alert {...alertProps} /> : null}
      {popUpVisible ? <PopUp {...popUpProps} /> : null}
      {barVisible ? <Bar /> : null}
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
    padding: 5,
    backgroundColor: '#141F25',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 50,
  },
  mapPopUpImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
