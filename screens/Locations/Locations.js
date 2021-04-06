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
import MapboxGL from '@react-native-mapbox-gl/maps';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {cities, defaultLocation} from '../../data';
import {activitiesImageUrl, mapBoxToken} from '../../api/api';
import {addLocationPath, locationsPath} from '../../api/routes';
import {getItem} from '../../hooks/useAsyncStorage';
import {axiosGet, axiosPost} from '../../hooks/useAxios';
import {getHeadersWithToken} from '../../hooks/useApiData';
import {generateRandomId} from '../../hooks/useIdGenerator';
import {getHeadersWithAccessToken} from '../../hooks/useAccessToken';
import PlusImg from '../../assets/icons/ic-plus.png';
import RouteImg from '../../assets/icons/ic-plus1.png';
import WalkImg from '../../assets/icons/ic-walk.png';
import BurgerImg from '../../assets/icons/ic-menu.png';
import CompassImg from '../../assets/icons/ic-plus2.png';
import NextImg from '../../assets/icons/icon-siguiente.png';
import BlastPinImg from '../../assets/icons/ic-blast-pin.png';
import BlastMessageImg from '../../assets/icons/ic-message.png';
import Bar from '../../misc/Bar/Bar';
import Alert from '../../misc/Alert/Alert';
import PopUp from '../../misc/PopUp/PopUp';
import CitySelector from '../../misc/CitySelector/CitySelector';

MapboxGL.setAccessToken(mapBoxToken);

const Locations = ({route}) => {
  const navigation = useNavigation();

  const [locationsData, setLocationsData] = useState([]);
  const [openOptions, setOpenOptions] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const [barProps, setBarProps] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [popUpProps, setPopUpProps] = useState({});
  const [alertProps, setAlertProps] = useState({});

  const [cityValue, setCityValue] = useState('No city');
  const [alertInputValue, setAlertInputValue] = useState('No name');
  const [routeToggle, setRouteToggle] = useState(false);
  const [gpsRouteToggle, setGpsRouteToggle] = useState(false);
  const [placeToggle, setPlaceToggle] = useState(false);
  const [activeLocation, setActiveLocation] = useState(null);
  const [cameraCentering, setCameraCentering] = useState([]);
  const [userStartLocation, setUserStartLocation] = useState(defaultLocation);
  const [routeDrawerActive, setRouteDrawerActive] = useState(false);
  const [gpsRouteDrawerActive, setGpsRouteDrawerActive] = useState(false);
  const [placeDrawerActive, setPlaceDrawerActive] = useState(false);
  const [citySelectorVisible, setCitySelectorVisible] = useState(false);
  const [drawedRouteCoordinates, setDrawedRouteCoordinates] = useState([]);
  const [drawedGpsRouteCoordinates, setGpsDrawedRouteCoordinates] = useState(
    [],
  );
  const [drawedPlaceCoordinates, setDrawedPlaceCoordinates] = useState([]);

  const rotatingVal = useRef(new Animated.Value(0)).current;
  const gpsRouteBtnVal = useRef(new Animated.Value(30)).current;
  const routeBtnVal = useRef(new Animated.Value(30)).current;
  const placeBtnVal = useRef(new Animated.Value(30)).current;
  const textOpacityVal = useRef(new Animated.Value(0)).current;

  const spin = rotatingVal.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '135deg'],
  });

  const toggleOptions = () => {
    openOptions ? hideOptions() : showOptions();
    setOpenOptions((prev) => !prev);
  };

  const showOptions = () => {
    Animated.timing(gpsRouteBtnVal, {
      toValue: 220,
      duration: 500,
      useNativeDriver: false,
    }).start();
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
    Animated.timing(gpsRouteBtnVal, {
      toValue: 30,
      duration: 500,
      useNativeDriver: false,
    }).start();
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

  const checkRoute = () => {
    if (route.params) {
      const parsedCoordinates = JSON.parse(route.params.coordinates);
      const startCoordinates = parsedCoordinates[0];
      setActiveLocation(route.params.id);
      setCameraCentering(startCoordinates);
    }
  };

  const stackNavigate = (route) => {
    navigation.navigate(route);
  };

  const handleUserLocation = (e) => {
    const longitude = e.coords.longitude;
    const latitude = e.coords.latitude;
    const coordinates = [longitude, latitude];

    setUserStartLocation(coordinates);
    setGpsDrawedRouteCoordinates((prev) => [...prev, coordinates]);
  };

  const hidePopUp = () => {
    setPopUpVisible(false);
    setPopUpProps({});
  };

  const hideBar = () => {
    setActiveLocation(null);
    setBarVisible(false);
    setBarProps({});
  };

  const cancelAdding = () => {
    setAlertInputValue('No name');
    setCityValue('No city');
    setAlertVisible(false);
    setRouteDrawerActive(false);
    setDrawedRouteCoordinates([]);
    setPlaceDrawerActive(false);
    setGpsRouteDrawerActive(false);
    setGpsDrawedRouteCoordinates([]);
  };

  const getLocations = async () => {
    const headers = await getHeadersWithAccessToken();
    const locations = await axiosGet(locationsPath, headers);
    setLocationsData(locations);
  };

  const drawRoute = (e) => {
    const touchCoordinates = e.geometry.coordinates;
    setDrawedRouteCoordinates((prev) => [...prev, touchCoordinates]);
  };

  const placePoint =
    drawedPlaceCoordinates.length === 0
      ? turf.geometry('Point', userStartLocation)
      : turf.geometry('Point', drawedPlaceCoordinates);

  const drawPlace = (e) => {
    const touchCoordinates = e.geometry.coordinates;
    setDrawedPlaceCoordinates(touchCoordinates);
  };

  const returnShape = (type) => {
    if (type === 'gpsRoute') {
      if (drawedGpsRouteCoordinates.length <= 1) {
        const point = turf.geometry('Point', drawedGpsRouteCoordinates[0]);
        return point;
      } else {
        const point = turf.geometry('MultiPoint', []);
        const line = turf.geometry('LineString', drawedGpsRouteCoordinates);
        const collection = turf.geometryCollection([point, line]);
        return collection;
      }
    } else {
      if (drawedRouteCoordinates.length <= 1) {
        const point = turf.geometry('Point', drawedRouteCoordinates[0]);
        return point;
      } else {
        const point = turf.geometry('MultiPoint', []);
        const line = turf.geometry('LineString', drawedRouteCoordinates);
        const collection = turf.geometryCollection([point, line]);
        return collection;
      }
    }
  };

  const addLocaitonRequest = async (type) => {
    const headers = await getHeadersWithToken('urlencoded');
    const profileData = await getItem('profile');
    const parsedProfileData = JSON.parse(profileData);
    const currentActivity = parsedProfileData.profile_current_act;

    let routes;
    let start;
    let finish;

    if (type === 'route') {
      routes = JSON.stringify(drawedRouteCoordinates);
      start = JSON.stringify(drawedRouteCoordinates[0]);
      finish = JSON.stringify(
        drawedRouteCoordinates[drawedRouteCoordinates.length - 1],
      );
    } else if (type === 'place' && drawedPlaceCoordinates.length !== 0) {
      routes = JSON.stringify(drawedPlaceCoordinates);
      start = JSON.stringify(drawedPlaceCoordinates);
      finish = JSON.stringify(drawedPlaceCoordinates);
    } else if (type === 'gpsRoute' && drawedGpsRouteCoordinates.length !== 0) {
      routes = JSON.stringify(drawedGpsRouteCoordinates);
      start = JSON.stringify(drawedGpsRouteCoordinates[0]);
      finish = JSON.stringify(
        drawedGpsRouteCoordinates[drawedGpsRouteCoordinates.length - 1],
      );
    } else {
      routes = undefined;
      start = undefined;
      finish = undefined;
    }

    let postData = new URLSearchParams();
    postData.append('activity_id', currentActivity);
    postData.append('loc_p_title', alertInputValue);
    postData.append('loc_p_city', cityValue);
    postData.append('loc_p_cors_start', start);
    postData.append('loc_p_cors_finish', finish);
    postData.append('loc_p_cors_all', routes);

    const request = await axiosPost(addLocationPath, postData, headers);

    setAlertProps({
      title: 'Success',
      text: 'Your location was submitted',
      type: 'error',
      closeAction: cancelAdding,
    });
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
      cityValue,
      onType: (val) => setAlertInputValue(val),
      action1: () => nextAlertStep(type),
      action2: () => showCitySelector(),
      closeAction: () => cancelAdding(),
    });
  };

  const nextAlertStep = (type) => {
    if (type === 'route') {
      setRouteDrawerActive(true);
    } else if (type === 'GPS route') {
      setGpsRouteDrawerActive(true);
    } else {
      setPlaceDrawerActive(true);
    }
    setAlertProps({
      title: `Submit a ${type}`,
      text:
        type === 'route'
          ? 'Draw a Route from Start to Finish'
          : type === 'place'
          ? 'Drop a Pin on a Place you want to submit'
          : 'Walk/drive the route you want to submit',
      type: 'choice',
      closeAction: () => cancelAdding(),
      action1: () =>
        type === 'route'
          ? setRouteToggle((prev) => !prev)
          : type === 'place'
          ? setPlaceToggle((prev) => !prev)
          : setGpsRouteToggle((prev) => !prev), // toggle because function doesn't see state updates
      closeAction: () => cancelAdding(),
    });
  };

  const showCitySelector = () => {
    setCitySelectorVisible(true);
  };

  const hideCitySelector = () => {
    setCitySelectorVisible(false);
  };

  useEffect(() => {
    checkRoute();
    getLocations();
  }, []);

  useEffect(() => {
    addLocaitonRequest('route');
  }, [routeToggle]);

  useEffect(() => {
    addLocaitonRequest('gpsRoute');
  }, [gpsRouteToggle]);

  useEffect(() => {
    addLocaitonRequest('place');
  }, [placeToggle]);

  useEffect(() => {
    setAlertProps({...alertProps, cityValue});
  }, [cityValue]);

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

  // const renderBlastMessageBtn = (
  //   <View style={[s.buttonOuter, {right: 16}]} key={'blastMessage'}>
  //     <TouchableOpacity
  //       style={s.button}
  //       activeOpacity={0.8}
  //       onPress={() => {
  //         setPopUpVisible(true);
  //         setPopUpProps({
  //           title: 'Blast Message',
  //           type: 'compose',
  //           action1: hidePopUp,
  //           action2: hidePopUp,
  //         });
  //       }}>
  //       <Image style={s.buttonImg} source={BlastMessageImg} />
  //     </TouchableOpacity>
  //   </View>
  // );

  // const renderBlastPinBtn = (
  //   <View style={[s.buttonOuter, {right: 76}]} key={'blastPin'}>
  //     <TouchableOpacity style={s.button} activeOpacity={0.8}>
  //       <Image style={s.buttonImg} source={BlastPinImg} />
  //     </TouchableOpacity>
  //   </View>
  // );

  const renderOptions = (
    <View>
      <Animated.View style={[s.addGpsRoute, {bottom: gpsRouteBtnVal}]}>
        <Animated.Text style={[s.addText, {opacity: textOpacityVal}]}>
          GPS route
        </Animated.Text>
        <TouchableOpacity
          style={s.addBtn}
          activeOpacity={0.8}
          onPress={() => addOption('GPS route')}>
          <Image style={s.addImgSmall} source={WalkImg} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[s.addRoute, {bottom: routeBtnVal}]}>
        <Animated.Text style={[s.addText, {opacity: textOpacityVal}]}>
          Draw a route
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
          Add a place
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
      id={location.loc_id}
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
              onPress={() => {
                setBarVisible(true);
                setBarProps({
                  id: location.loc_id,
                  activity: location.activity,
                  start: location.loc_cors_start,
                  finish: location.loc_cors_finish,
                  coordinates: location.loc_cors_all,
                  rating: location.loc_rating,
                  records: location.loc_records,
                  title: location.loc_title,
                });
              }}
              // onPress={() => stackNavigate('Profile')}
            >
              <Image style={s.nextImg} source={NextImg} />
            </TouchableOpacity>
          </Fragment>
        ) : null}
      </View>
    </MapboxGL.MarkerView>
  ));

  const renderRouteDrawer =
    drawedRouteCoordinates.length !== 0 ? (
      <MapboxGL.ShapeSource id={generateRandomId()} shape={returnShape()}>
        <MapboxGL.LineLayer
          id={`line=${generateRandomId()}`}
          style={{
            lineColor: '#F18303',
            lineWidth: 3,
          }}
        />
        <MapboxGL.CircleLayer
          id={`point=${generateRandomId()}`}
          style={{
            circleRadius: 7,
            circleColor: '#F18303',
          }}
        />
      </MapboxGL.ShapeSource>
    ) : null;

  const renderGpsRouteDrawer =
    drawedGpsRouteCoordinates.length !== 0 ? (
      <MapboxGL.ShapeSource
        id={generateRandomId()}
        shape={returnShape('gpsRoute')}>
        <MapboxGL.LineLayer
          id={`line=${generateRandomId()}`}
          style={{
            lineColor: '#F18303',
            lineWidth: 3,
          }}
        />
        <MapboxGL.CircleLayer
          id={`point=${generateRandomId()}`}
          style={{
            circleRadius: 7,
            circleColor: '#F18303',
          }}
        />
      </MapboxGL.ShapeSource>
    ) : null;

  const renderPlaceDrawer = (
    <MapboxGL.ShapeSource id={generateRandomId()} shape={placePoint}>
      <MapboxGL.CircleLayer
        id={`point=${generateRandomId()}`}
        style={{
          circleRadius: 10,
          circleColor: '#F18303',
        }}
      />
    </MapboxGL.ShapeSource>
  );

  const renderCitySelector = (
    <CitySelector
      data={cities}
      onCityChange={(city) => {
        setCityValue(city);
        hideCitySelector();
      }}
      hideCitySelector={hideCitySelector}
    />
  );

  return (
    <View style={s.container}>
      <MapboxGL.MapView
        style={s.map}
        compassEnabled={false}
        attributionEnabled={false}
        logoEnabled={false}
        onLongPress={() => setActiveLocation(null)}
        onPress={(e) =>
          routeDrawerActive
            ? drawRoute(e)
            : placeDrawerActive
            ? drawPlace(e)
            : null
        }>
        <MapboxGL.Camera
          zoomLevel={12}
          centerCoordinate={cameraCentering.length !== 0 ? cameraCentering : []}
          followUserLocation={cameraCentering.length !== 0 ? false : true}
        />
        <MapboxGL.UserLocation
          minDisplacement={500}
          onUpdate={(e) => handleUserLocation(e)}
        />
        {routeDrawerActive
          ? renderRouteDrawer
          : placeDrawerActive
          ? renderPlaceDrawer
          : gpsRouteDrawerActive
          ? renderGpsRouteDrawer
          : null}
        {renderLocations}
      </MapboxGL.MapView>
      {!route.params ? renderBurger : null}
      {openOptions ? <View style={s.mask} /> : null}
      {renderOptions}
      {alertVisible ? <Alert {...alertProps} /> : null}
      {popUpVisible ? <PopUp {...popUpProps} /> : null}
      {barVisible ? <Bar {...barProps} hideBarAction={hideBar} /> : null}
      {citySelectorVisible ? renderCitySelector : null}
    </View>
  );
};

export default Locations;

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
  addGpsRoute: {
    width: 44,
    height: 44,
    position: 'absolute',
    right: 26,
    bottom: 220,
    zIndex: 101,
  },
  addImgSmall: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  addText: {
    width: 120,
    position: 'absolute',
    top: 10,
    left: -130,
    zIndex: 20,
    textAlign: 'right',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#fff',
  },
});

// import React from 'react';
// import {ScrollView, StyleSheet} from 'react-native';
// import Header from '../../misc/Header/Header';
// import HeadLine from '../../misc/HeadLine/HeadLine';
// import LocationsList from '../../misc/LocationsList/LocationsList';

// const Locaitons = () => {
//   return (
//     <ScrollView style={s.container}>
//       <Header />
//       <HeadLine title={'City name'} subtitle={'Total riders: 10'} />
//       <LocationsList title={'All Locations'} />
//     </ScrollView>
//   );
// };

// export default Locaitons;

// const s = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#141F25',
//   },
// });
