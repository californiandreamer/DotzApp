import React, {useState, useMemo, useRef, useEffect, Fragment} from 'react';
import s from './Bar.s';
import {
  View,
  Text,
  Animated,
  ScrollView,
  TouchableOpacity,
  PanResponder,
  Image,
  Dimensions,
} from 'react-native';
import * as turf from '@turf/turf';
import MapboxGL from '@react-native-mapbox-gl/maps';
import ResponderImg from '../../assets/icons/ic-responder.png';
import Leaderboard from '../Leaderboard/Leaderboard';
import {mapBoxToken} from '../../api/api';
import Button from '../Button/Button';
import BarStatus from '../BarStatus/BarStatus';
import Rater from '../Rater/Rater';
import Timer from '../Timer/Timer';
import Alert from '../Alert/Alert';
import {axiosPost} from '../../hooks/useAxios';
import {getAccessToken} from '../../hooks/useAccessToken';
import SuccessImg from '../../assets/icons/ic-agreeOn.png';
import {getItem, setItem} from '../../hooks/useAsyncStorage';
import {getHeadersWithToken} from '../../hooks/useApiData';
import {calculateByCoordinates} from '../../hooks/useDistanceCalculator';
import {updateFavoritesPath, updateRatePath} from '../../api/routes';
import {errorsContent} from '../../data';
import {generateRandomId} from '../../hooks/useIdGenerator';

MapboxGL.setAccessToken(mapBoxToken);

const Bar = ({
  id,
  title,
  activity,
  start,
  finish,
  coordinates,
  rating,
  records,
  testAction,
}) => {
  const generatedId = generateRandomId();
  const innerHeight = Dimensions.get('window').height;
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0}));
  // const defaultTopVal = innerHeight * 0.66;
  // const layout = pan.current.getLayout();

  const [error, setError] = useState({
    isVisible: false,
    title: '',
    text: '',
  });
  const [barStatusProps, setBarStatusProps] = useState({
    title,
    image: activity.activity_img,
    imageType: 'link',
  });
  const [timerProps, setTimerProps] = useState({speed: 0});
  const [barShowed, setBarShowed] = useState(true);
  const [isRouteStarted, setIsRouteStarted] = useState(false);
  const [isPublishingMode, setIsPublishingMode] = useState(false);
  const [userLocation, setUserLocation] = useState([]);
  const [usersRouteCoordinates, setUsersRouteCoordinates] = useState([]);

  // const [defaultPan, setDefaultPan] = useState(layout.top._value);
  // const [defaultOffset, setDefaultOffset] = useState(pan.current.x._offset);

  const renderRater = (
    <Rater
      title={title}
      onChange={(rate) => {
        rateLocationRequest(rate);
      }}
    />
  );
  const renderBarStatus = <BarStatus {...barStatusProps} />;
  const renderTimer = <Timer {...timerProps} />;

  const [activeElement, setActiveElement] = useState(renderBarStatus);

  const checkCanStartRoute = () => {
    const parsedCoordinates = JSON.parse(coordinates);
    const startPoint = parsedCoordinates[0];
    const distanceToStart = calculateByCoordinates(startPoint, userLocation);
    const canStartRoute = distanceToStart < 0.2 * 1.36;

    if (canStartRoute) {
      startRoute();
    } else {
      setError({
        isVisible: true,
        title: errorsContent.routeStartingDistanceError.title,
        text: errorsContent.routeStartingDistanceError.text,
      });
    }
  };

  const startRoute = () => {
    if (userLocation.length !== 0) {
      setIsRouteStarted(true);
      setActiveElement(renderTimer);
    } else {
      setError({
        isVisible: true,
        title: errorsContent.geolocationError.title,
        text: errorsContent.geolocationError.text,
      });
    }
  };

  const checkCanFinishRoute = () => {
    const parsedCoordinates = JSON.parse(coordinates);
    const coordinatesLength = parsedCoordinates.length;
    const finishPoint = parsedCoordinates[coordinatesLength - 1];
    const distanceToFinish = calculateByCoordinates(finishPoint, userLocation);
    const canFinishRoute = distanceToFinish < 0.2 * 1.36;

    if (canFinishRoute) {
      finishRoute();
    } else {
      setError({
        isVisible: true,
        title: errorsContent.routeFinishingDistanceError.title,
        text: errorsContent.routeFinishingDistanceError.text,
      });
    }
  };

  const finishRoute = () => {
    setIsRouteStarted(false);
    setIsPublishingMode(true);
  };

  const handleUserCoordinates = (e) => {
    const longitude = e.coords.longitude;
    const latitude = e.coords.latitude;
    setUserLocation([longitude, latitude]);
    if (isRouteStarted) {
      setUsersRouteCoordinates((prev) => [...prev, [longitude, latitude]]);
    }
  };

  const returnShape = () => {
    const parsedCoordinates = JSON.parse(coordinates);
    const point = turf.geometry('MultiPoint', []);
    const line = turf.geometry('LineString', parsedCoordinates);
    const collection = turf.geometryCollection([point, line]);
    return collection;
  };

  const returnUsersShape = () => {
    const initialCordinates = [userLocation, userLocation];
    const parsedCoordinates =
      usersRouteCoordinates.length <= 1
        ? initialCordinates
        : usersRouteCoordinates;
    const point = turf.geometry('MultiPoint', []);
    const line = turf.geometry('LineString', parsedCoordinates);
    const collection = turf.geometryCollection([point, line]);
    return collection;
  };

  const returnStartCoordinates = () => {
    const parsedCoordinates = JSON.parse(coordinates);
    const startCoordinates = parsedCoordinates[0];
    return startCoordinates;
  };

  const rateLocationRequest = async (rate) => {
    const headers = await getHeadersWithToken('urlencoded');

    let postData = new URLSearchParams();
    postData.append('loc_id', id);
    postData.append('loc_rating', +rate);

    await axiosPost(updateRatePath, postData, headers);
  };

  let initialFavoriteLocations = [];
  const saveLocation = async () => {
    setBarStatusProps({
      title: 'Location saved',
      image: SuccessImg,
      imageType: 'image',
    });

    const headers = await getHeadersWithToken('urlencoded');
    const profileData = await getItem('profile');
    let postData = new URLSearchParams();
    let parsedProfileData = JSON.parse(profileData);
    let favoriteLocaitons = parsedProfileData.profile_favourite_locs;

    if (favoriteLocaitons !== null) {
      const isExist = checkItemExistsInArray(favoriteLocaitons, id);
      if (isExist) {
        removeItemFromArray(favoriteLocaitons, id);
      } else {
        addItemToArray(favoriteLocaitons, id);
      }
      parsedProfileData.profile_favourite_locs = favoriteLocaitons;

      const stringedFavoriteLocations = JSON.stringify(favoriteLocaitons);
      postData.append('favourite_locs', stringedFavoriteLocations);

      await axiosPost(updateFavoritesPath, postData, headers);
    } else {
      addItemToArray(initialFavoriteLocations, id);
      parsedProfileData.profile_favourite_locs = initialFavoriteLocations;

      const stringedInitialFavoriteLocations = JSON.stringify(
        initialFavoriteLocations,
      );
      postData.append('favourite_locs', stringedInitialFavoriteLocations);

      await axiosPost(updateFavoritesPath, postData, headers);
    }

    const stringedProfileData = JSON.stringify(parsedProfileData);
    await setItem('profile', stringedProfileData);
  };

  const addItemToArray = (arr, item) => {
    arr.push(item);
    return arr;
  };

  const removeItemFromArray = (arr, item) => {
    const index = arr.indexOf(item);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };

  const checkItemExistsInArray = (arr, item) => {
    const res = arr.includes(item);
    return res;
  };

  const hideAlert = () => {
    setTimeout(() => {
      setError({isVisible: false, title: '', text: ''});
    }, 500);
  };

  useEffect(() => {
    setActiveElement(renderBarStatus);
  }, [barStatusProps]);

  const renderAlert = error.isVisible ? (
    <Alert
      title={error.title}
      text={error.text}
      type="error"
      closeAction={hideAlert}
    />
  ) : null;

  const renderResponder = (
    <TouchableOpacity
      style={s.responder}
      activeOpacity={0.8}
      onPress={testAction}>
      <Image style={s.responderImg} source={ResponderImg} />
    </TouchableOpacity>
    // <View
    //   style={s.responder}
    //   // {...panResponder.panHandlers}
    // >
    //   <Image style={s.responderImg} source={ResponderImg} />
    // </View>
  );

  const renderButtonsRow = (
    <View style={s.wrapper}>
      <View style={s.buttonsRow}>
        <View style={s.item}>
          <Button
            text={'Rate'}
            style={'orange'}
            customStyle={{height: 39}}
            imageStyle={{borderRadius: 30}}
            action={() => setActiveElement(renderRater)}
          />
        </View>
        <View style={s.item}>
          <Button
            text={'Save'}
            style={'orange'}
            customStyle={{height: 39}}
            imageStyle={{borderRadius: 30}}
            action={() => saveLocation()}
          />
        </View>
        {isRouteStarted ? (
          <View style={s.item}>
            <Button
              text={'Finish'}
              style={'orange'}
              customStyle={{height: 39}}
              imageStyle={{borderRadius: 30}}
              action={() => checkCanFinishRoute()}
            />
          </View>
        ) : (
          <View style={s.item}>
            <Button
              text={'Start'}
              style={'orange'}
              customStyle={{height: 39}}
              imageStyle={{borderRadius: 30}}
              action={() => checkCanStartRoute()}
            />
          </View>
        )}
      </View>
    </View>
  );

  const renderMapButtons = (
    <Fragment>
      <View style={s.leftMapButton}>
        <Button
          text={'Delete'}
          style={'red'}
          customStyle={{height: 39}}
          imageStyle={{borderRadius: 20}}
          action={() => {
            setIsPublishingMode(false);
            setActiveElement(renderBarStatus);
          }}
        />
      </View>
      <View style={s.rightMapButton}>
        <Button
          text={'Publish'}
          style={'green'}
          customStyle={{height: 39}}
          imageStyle={{borderRadius: 20}}
          action={() => {
            setIsPublishingMode(false);
            setActiveElement(renderBarStatus);
          }}
        />
      </View>
    </Fragment>
  );

  const renderMap = (
    <View style={s.wrapper}>
      <MapboxGL.MapView
        style={s.map}
        compassEnabled={false}
        attributionEnabled={false}
        logoEnabled={false}>
        <MapboxGL.Camera
          zoomLevel={14}
          centerCoordinate={returnStartCoordinates()}
        />
        <MapboxGL.UserLocation
          onUpdate={(e) => {
            setTimerProps({...timerProps, speed: e.coords.speed / 1.36});
            handleUserCoordinates(e);
          }}
        />
        {coordinates ? (
          <MapboxGL.ShapeSource id={id} shape={returnShape()}>
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
        ) : null}
        {isRouteStarted ? (
          <MapboxGL.ShapeSource id="id" shape={returnUsersShape()}>
            <MapboxGL.LineLayer
              id="userLine"
              style={{
                lineColor: 'red',
                lineWidth: 3,
              }}
            />
            <MapboxGL.CircleLayer
              id="userCircle"
              style={{
                circleRadius: 2,
                circleColor: 'red',
              }}
            />
          </MapboxGL.ShapeSource>
        ) : null}
      </MapboxGL.MapView>
      {isPublishingMode ? renderMapButtons : null}
    </View>
  );

  return (
    <Animated.View
      style={[
        s.container,
        {transform: [{translateY: pan.current.getLayout().top}]},
      ]}>
      <View style={s.inner}>
        {renderResponder}
        {renderAlert}
        <ScrollView style={s.scrollBox} scrollEnabled={barShowed}>
          {activeElement}
          {renderButtonsRow}
          {renderMap}
          <Leaderboard />
        </ScrollView>
      </View>
    </Animated.View>
  );
};

export default Bar;

// <Animated.View style={[s.container, {top: pan.current.getLayout().top}]}>

{
  /* <View style={s.wrapper}>
            <Text style={s.text}>Your time: 24 min, speed 52 mi/h</Text>
          </View> */
}

{
  /* <Text style={{color: '#fff', fontSize: 20}}>Pan: {defaultPan}</Text>
          <Text style={{color: '#fff', fontSize: 20}}>
            Offset: {defaultOffset}
          </Text> */
}

// const onMove = (e) => {
//   setDefaultPan(layout.top._value);
//   setDefaultOffset(pan.current.x._offset);
//   // if (layout.top._value < -200) {
//   //   Animated.spring(pan.current, {
//   //     toValue: {
//   //       x: 0 - pan.current.x._offset,
//   //       y: -400,
//   //     },
//   //     useNativeDriver: false,
//   //   }).start(() => {
//   //     // pan.current.setValue({x: 0, y: 0});
//   //     pan.current.setOffset({x: 0, y: 0});
//   //   });
//   //   pan.current.setValue({x: 0, y: -400});
//   //   console.log(layout);
//   // }
// };

// const panResponder = useMemo(
//   () =>
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onMoveShouldSetPanResponderCapture: () => true,

//       onPanResponderGrant: (evt, gestureState) => {
//         pan.current.setOffset({
//           x: pan.current.x._value,
//           y: pan.current.y._value,
//         });
//         pan.current.setValue({x: 0, y: 0});
//       },

//       onPanResponderMove: Animated.event(
//         [
//           null,
//           {
//             dx: pan.current.x,
//             dy: pan.current.y,
//           },
//         ],
//         {
//           listener: onMove,
//           useNativeDriver: false,
//         },
//       ),
//       onPanResponderRelease: (e, gesture) => {
//         if (barShowed) {
//           console.log('Im here');
//           hideBar();
//         } else {
//           console.log('Im there');
//           showBar();
//         }
//       },
//     }),
//   [],
// );

// const showBar = () => {
//   Animated.spring(pan.current, {
//     toValue: {
//       x: 0 - pan.current.x._offset,
//       y: 0,
//     },
//     useNativeDriver: true,
//   }).start(() => {
//     //   pan.current.setValue({x: 0, y: 0});
//     //   pan.current.setOffset({x: 0, y: 0});
//   });
//   setBarShowed(true);
// };

// const hideBar = () => {
//   console.log('pan.current', pan.current);
//   Animated.spring(pan.current, {
//     toValue: {
//       x: 0 - pan.current.x._offset,
//       y: 400,
//       // y: 0 - pan.current.y._offset,
//     },
//     useNativeDriver: true,
//   }).start(() => {
//     // pan.current.setValue({x: 0, y: 0});
//     // pan.current.setOffset({x: 0, y: 0});
//   });
//   setBarShowed(false);
// };
