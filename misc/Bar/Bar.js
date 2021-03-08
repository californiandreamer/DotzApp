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
  TextInput,
} from 'react-native';
import * as turf from '@turf/turf';
import MapboxGL from '@react-native-mapbox-gl/maps';
import ResponderImg from '../../assets/icons/ic-responder.png';
import Leaderboard from '../Leaderboard/Leaderboard';
import {mapBoxToken, socketUrl} from '../../api/api';
import Button from '../Button/Button';
import BarStatus from '../BarStatus/BarStatus';
import Rater from '../Rater/Rater';
import Timer from '../Timer/Timer';
import Alert from '../Alert/Alert';
import {axiosPost} from '../../hooks/useAxios';
import SuccessImg from '../../assets/icons/ic-agreeOn.png';
import {getItem, setItem} from '../../hooks/useAsyncStorage';
import {getHeadersWithToken} from '../../hooks/useApiData';
import {calculateByCoordinates} from '../../hooks/useDistanceCalculator';
import {updateFavoritesPath, updateRatePath} from '../../api/routes';
import {errorsContent, postAddedContent, postDeleteContent} from '../../data';
import {generateRandomId} from '../../hooks/useIdGenerator';
import {getAccessToken} from '../../hooks/useAccessToken';

MapboxGL.setAccessToken(mapBoxToken);

const Bar = ({id, title, activity, coordinates, records, hideBarAction}) => {
  const [barStatusProps, setBarStatusProps] = useState({
    title,
    image: activity.activity_img,
    imageType: 'link',
  });
  const [timerProps, setTimerProps] = useState({speed: 0, average: 0});
  const [alertProps, setAlertProps] = useState({});
  const [postInputValue, setPostInputValue] = useState('No description');
  const [isRouteStarted, setIsRouteStarted] = useState(false);
  const [isPublishingMode, setIsPublishingMode] = useState(false);
  const [userLocation, setUserLocation] = useState([]);
  const [usersRouteCoordinates, setUsersRouteCoordinates] = useState([]);
  const [saveButtonText, setSaveButtonText] = useState('Save');
  const [socket, setSocket] = useState(null);

  const calculateAverageSpeed = () => {
    const arr = [1, 5, 7, 4, 7, 3, 7, 2, 8, 29];
    const reduced = arr.reduce((a, b) => a + b, 0);
    const length = arr.length;
    const average = reduced / length;
    console.log('average', average);
  };
  useEffect(() => {
    calculateAverageSpeed();
  }, []);

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

  const connectToSocket = async () => {
    const token = await getAccessToken();
    const conn = new WebSocket(`${socketUrl}${token}`);
    setSocket(conn);
  };

  const checkCanStartRoute = () => {
    const parsedCoordinates = JSON.parse(coordinates);
    const startPoint = parsedCoordinates[0];
    const distanceToStart = calculateByCoordinates(startPoint, userLocation);
    const canStartRoute = distanceToStart < 0.2 * 1.36;

    if (canStartRoute) {
      startRoute();
    } else {
      setAlertProps({
        isVisible: true,
        title: errorsContent.routeStartingDistanceError.title,
        text: errorsContent.routeStartingDistanceError.text,
        type: 'error',
        closeAction: hideAlert,
      });
    }
  };

  const startRoute = () => {
    if (userLocation.length !== 0) {
      setIsRouteStarted(true);
      setActiveElement(renderTimer);
    } else {
      setAlertProps({
        isVisible: true,
        title: errorsContent.geolocationError.title,
        text: errorsContent.geolocationError.text,
        type: 'error',
        closeAction: hideAlert,
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
      setAlertProps({
        isVisible: true,
        title: errorsContent.routeFinishingDistanceError.title,
        text: errorsContent.routeFinishingDistanceError.text,
        type: 'error',
        closeAction: hideAlert,
      });
    }
  };

  const finishRoute = () => {
    if (!barShowed) {
      showBar();
    }
    connectToSocket();
    setIsPublishingMode(true);
  };

  const addPostRequest = async () => {
    const timeStamp = +new Date();
    const stringedTimeStamp = JSON.stringify(timeStamp);
    const obj = {
      pp_content: `${postInputValue}\nMy last time on ${title}: 12:32s`,
      msg_timestamp_sent: stringedTimeStamp,
      post_action: 'addPost',
      type: 'record',
    };
    socket.send(JSON.stringify(obj));
    setAlertProps({
      isVisible: true,
      title: postAddedContent.title,
      text: postAddedContent.text,
      type: 'error',
      closeAction: hideAlert,
    });
    clearPostData();
  };

  const deletePost = () => {
    setAlertProps({
      isVisible: true,
      title: postDeleteContent.title,
      text: postDeleteContent.text,
      type: 'choice',
      action1: clearPostData,
      closeAction: hideAlert,
    });
  };

  const clearPostData = () => {
    setIsRouteStarted(false);
    setIsPublishingMode(false);
    setActiveElement(renderBarStatus);
    setPostInputValue('No description');
    hideAlert();
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

  const checkIsLocationSaved = async () => {
    const profileData = await getItem('profile');
    let parsedProfileData = JSON.parse(profileData);
    let favoriteLocaitons = parsedProfileData.profile_favourite_locs;
    const isExist = checkItemExistsInArray(favoriteLocaitons, id);

    if (isExist) {
      setSaveButtonText('Unsave');
    } else {
      setSaveButtonText('Save');
    }
  };

  const saveLocation = async () => {
    const headers = await getHeadersWithToken('urlencoded');
    const profileData = await getItem('profile');
    let postData = new URLSearchParams();
    let parsedProfileData = JSON.parse(profileData);
    let favoriteLocaitons = parsedProfileData.profile_favourite_locs;
    const parsedFavoriteLocations = JSON.parse(favoriteLocaitons);

    if (favoriteLocaitons !== null) {
      const isExist = checkItemExistsInArray(parsedFavoriteLocations, id);
      if (isExist) {
        removeItemFromArray(parsedFavoriteLocations, id);
        setBarStatusProps({
          title: 'Location was removed from saved',
          image: SuccessImg,
          imageType: 'image',
        });
      } else {
        addItemToArray(parsedFavoriteLocations, id);
        setBarStatusProps({
          title: 'Location saved',
          image: SuccessImg,
          imageType: 'image',
        });
      }

      const stringedFavoriteLocations = JSON.stringify(parsedFavoriteLocations);

      parsedProfileData.profile_favourite_locs = stringedFavoriteLocations;

      postData.append('favourite_locs', stringedFavoriteLocations);
      await axiosPost(updateFavoritesPath, postData, headers);
    } else {
      setBarStatusProps({
        title: 'Location saved',
        image: SuccessImg,
        imageType: 'image',
      });
      let initialFavoriteLocations = [];
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
    console.log('adding');
    arr.push(item);
    return arr;
  };

  const removeItemFromArray = (arr, item) => {
    console.log('removing');
    const index = arr.indexOf(item);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };

  const checkItemExistsInArray = (arr, item) => {
    console.log('checking');
    const res = arr.includes(item);
    return res;
  };

  const hideAlert = () => {
    setTimeout(() => {
      setAlertProps({isVisible: false, title: '', text: ''});
    }, 500);
  };

  useEffect(() => {
    checkIsLocationSaved();
  }, []);

  useEffect(() => {
    setActiveElement(renderBarStatus);
  }, [barStatusProps]);

  useEffect(() => {
    setActiveElement(renderBarStatus);
    setBarStatusProps({title, image: activity.activity_img, imageType: 'link'});
  }, [title, activity]);

  // PanResponder animation
  const maxVal = innerHeight - 80;
  const innerHeight = Dimensions.get('window').height;

  const [animation] = useState(
    new Animated.ValueXY({x: 0, y: innerHeight - 350}),
  );
  const [barShowed, setBarShowed] = useState(false);
  const [offset, setOffset] = useState(innerHeight - 350);

  const handlePanResponderMove = (e, gestureState) => {
    const newVal =
      offset + gestureState.dy > maxVal
        ? maxVal
        : offset + gestureState.dy < 0
        ? 0
        : offset + gestureState.dy;
    animation.setValue({x: 0, y: newVal});
  };

  const handlePanResponderRelease = (e, gestureState) => {
    const newVal =
      offset + gestureState.dy > maxVal
        ? maxVal
        : offset + gestureState.dy < 0
        ? 0
        : offset + gestureState.dy;
    setOffset(newVal);
    if (newVal > 150) {
      hideBar();
    } else if (newVal < 150) {
      showBar();
    }
    if (newVal > innerHeight - 100) {
      hideBarAction();
    }
  };

  const animatedStyle = {
    transform: [...animation.getTranslateTransform()],
  };

  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderGrant: () => console.log('granted'),
    onPanResponderMove: (evt, gestureState) =>
      handlePanResponderMove(evt, gestureState),
    onPanResponderRelease: (e, g) => handlePanResponderRelease(e, g),
  });

  const panHandlers = _panResponder.panHandlers;

  const showBar = () => {
    Animated.spring(animation, {
      toValue: {
        x: 0,
        y: 0,
      },
      useNativeDriver: true,
    }).start(() => {
      setOffset(0);
    });
    setBarShowed(true);
  };

  const hideBar = () => {
    Animated.spring(animation, {
      toValue: {
        x: 0,
        y: innerHeight - 350,
      },
      useNativeDriver: true,
    }).start(() => {
      setOffset(innerHeight - 350);
    });
    setBarShowed(false);
  };

  const renderResponder = (
    <View style={s.responder} {...panHandlers}>
      <Image style={s.responderImg} source={ResponderImg} />
    </View>
  );

  const renderAlert = alertProps.isVisible ? <Alert {...alertProps} /> : null;

  const renderPostInput = isPublishingMode ? (
    <TextInput
      style={s.input}
      placeholder="Post description or link"
      placeholderTextColor={'#777'}
      onChange={(e) => {
        e.persist;
        setPostInputValue(e.nativeEvent.text);
      }}
    />
  ) : null;

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
            text={saveButtonText}
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
          action={() => deletePost()}
        />
      </View>
      <View style={s.rightMapButton}>
        <Button
          text={'Publish'}
          style={'green'}
          customStyle={{height: 39}}
          imageStyle={{borderRadius: 20}}
          action={() => addPostRequest()}
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
    <Animated.View style={[s.container, animatedStyle]}>
      <View style={s.inner}>
        {renderResponder}
        {renderAlert}
        <ScrollView style={s.scrollBox} scrollEnabled={barShowed}>
          {activeElement}
          {renderButtonsRow}
          {renderPostInput}
          {renderMap}
          <Leaderboard />
        </ScrollView>
      </View>
    </Animated.View>
  );
};

export default Bar;

{
  /* <View style={s.wrapper}>
            <Text style={s.text}>Your time: 24 min, speed 52 mi/h</Text>
          </View> */
}
