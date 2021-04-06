import React from 'react';
import s from './Timer.s';
import {View, Text, Image} from 'react-native';
import PolygonImg from '../../assets/icons/ic-Polygon.png';

const Timer = ({heading, time, speed, average}) => {
  return (
    <View style={s.container}>
      <View style={s.row}>
        <Image style={s.image} source={PolygonImg} />
        <Text style={s.heading}>{heading}</Text>
      </View>
      <View style={s.row}>
        {time ? (
          <Text style={s.timer}>{time}</Text>
        ) : (
          <Text style={s.timer}>{Math.floor(speed)} Mi / h</Text>
        )}
      </View>
      <View style={s.row}>
        <Text style={s.speed}>{Math.floor(average)} avg speed</Text>
      </View>
    </View>
  );
};

export default Timer;
