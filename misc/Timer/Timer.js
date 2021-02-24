import React, {useEffect, useState} from 'react';
import s from './Timer.s';
import {View, Text, Image} from 'react-native';
import PolygonImg from '../../assets/icons/ic-Polygon.png';
import {formatTime} from '../../utils/TimeFormater';

const Timer = ({time, speed}) => {
  return (
    <View style={s.container}>
      <View style={s.row}>
        <Image style={s.image} source={PolygonImg} />
        <Text style={s.heading}>You’re live:</Text>
      </View>
      <View style={s.row}>
        <Text style={s.timer}>00:00:00</Text>
      </View>
      <View style={s.row}>
        <Text style={s.speed}>{speed} Mi / h. speed</Text>
      </View>
    </View>
  );
};

export default Timer;
