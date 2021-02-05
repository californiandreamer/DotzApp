import React from 'react';
import s from './HeadLine.s';
import {View, Text, ImageBackground} from 'react-native';
import OrangeFrame from '../../assets/images/orange-frame.jpg';

const HeadLine = ({title, subtitle}) => {
  return (
    <View style={s.container}>
      <ImageBackground style={s.background} source={OrangeFrame}>
        <Text style={s.title}>{title}</Text>
        {subtitle ? <Text style={s.subtitle}>{subtitle}</Text> : null}
      </ImageBackground>
    </View>
  );
};

export default HeadLine;
