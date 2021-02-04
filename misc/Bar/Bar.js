import React, {useState, useMemo, useRef} from 'react';
import s from './Bar.s';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  PanResponder,
  Image,
  Dimensions,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import ResponderImg from '../../assets/icons/ic-responder.png';
import Leaderboard from '../Leaderboard/Leaderboard';
import {mapBoxToken} from '../../api/api';
import Button from '../Button/Button';
import BarStatus from '../BarStatus/BarStatus';

MapboxGL.setAccessToken(mapBoxToken);

const Bar = () => {
  const innerHeight = Dimensions.get('window').height;
  const defaultTopVal = innerHeight * 0.66;
  const pan = useRef(new Animated.ValueXY());
  const layout = pan.current.getLayout();

  const [defaultPan, setDefaultPan] = useState(layout.top._value);
  const [defaultOffset, setDefaultOffset] = useState(pan.current.x._offset);

  const onMove = (e) => {
    setDefaultPan(layout.top._value);
    setDefaultOffset(pan.current.x._offset);
    // if (layout.top._value < -200) {
    //   Animated.spring(pan.current, {
    //     toValue: {
    //       x: 0 - pan.current.x._offset,
    //       y: -400,
    //     },
    //     useNativeDriver: false,
    //   }).start(() => {
    //     // pan.current.setValue({x: 0, y: 0});
    //     pan.current.setOffset({x: 0, y: 0});
    //   });
    //   pan.current.setValue({x: 0, y: -400});
    //   console.log(layout);
    // }
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

        onPanResponderGrant: (evt, gestureState) => {
          pan.current.setOffset({
            x: pan.current.x._value,
            y: pan.current.y._value,
          });
          pan.current.setValue({x: 0, y: 0});
        },

        onPanResponderMove: Animated.event(
          [
            null,
            {
              dx: pan.current.x,
              dy: pan.current.y,
            },
          ],
          {
            listener: onMove,
            useNativeDriver: false,
          },
        ),
        onPanResponderRelease: (e, gesture) => {
          if (layout.top._value < -200) {
            Animated.spring(pan.current, {
              toValue: {
                x: 0 - pan.current.x._offset,
                y: -300,
              },
              useNativeDriver: false,
            }).start(() => {
              //   pan.current.setValue({x: 0, y: 0});
              //   pan.current.setOffset({x: 0, y: 0});
            });
          } else {
            Animated.spring(pan.current, {
              toValue: {
                x: 0 - pan.current.x._offset,
                y: 0 - pan.current.y._offset,
              },
              useNativeDriver: false,
            }).start(() => {
              pan.current.setValue({x: 0, y: 0});
              pan.current.setOffset({x: 0, y: 0});
            });
          }
        },
      }),
    [],
  );

  return (
    <View style={s.container}>
      <Animated.ScrollView
        style={[s.inner, {top: pan.current.getLayout().top}]}>
        <View style={s.responder} {...panResponder.panHandlers}>
          <Image style={s.responderImg} source={ResponderImg} />
        </View>
        {/* <Text style={{color: '#fff', fontSize: 20}}>Pan: {defaultPan}</Text>
        <Text style={{color: '#fff', fontSize: 20}}>
          Offset: {defaultOffset}
        </Text> */}
        <BarStatus />
        <View style={s.wrapper}>
          <View style={s.buttonsRow}>
            <View style={s.item}>
              <Button
                text={'Rate'}
                style={'orange'}
                customStyle={{height: 39}}
                imageStyle={{borderRadius: 30}}
              />
            </View>
            <View style={s.item}>
              <Button
                text={'Save'}
                style={'orange'}
                customStyle={{height: 39}}
                imageStyle={{borderRadius: 30}}
              />
            </View>
            <View style={s.item}>
              <Button
                text={'Start'}
                style={'orange'}
                customStyle={{height: 39}}
                imageStyle={{borderRadius: 30}}
              />
            </View>
          </View>
        </View>
        <View style={s.wrapper}>
          <Text style={s.text}>Your time: 24 min, speed 52 mi/h</Text>
        </View>
        <View style={s.wrapper}>
          <MapboxGL.MapView
            style={s.map}
            compassEnabled={false}
            attributionEnabled={false}
            logoEnabled={false}>
            <MapboxGL.Camera zoomLevel={12} followUserLocation />
            <MapboxGL.UserLocation />
          </MapboxGL.MapView>
          <View style={s.leftMapButton}>
            <Button
              text={'Delete'}
              style={'red'}
              customStyle={{height: 39}}
              imageStyle={{borderRadius: 20}}
            />
          </View>
          <View style={s.rightMapButton}>
            <Button
              text={'Publish'}
              style={'green'}
              customStyle={{height: 39}}
              imageStyle={{borderRadius: 20}}
            />
          </View>
        </View>
        <Leaderboard />
      </Animated.ScrollView>
    </View>
  );
};

export default Bar;
