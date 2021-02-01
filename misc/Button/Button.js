import React from 'react';
import s from './Button.s';
import {ImageBackground, Text, TouchableOpacity} from 'react-native';
import VioletFrame from '../../assets/images/violet-frame.jpg';
import OrangeFrame from '../../assets/images/orange-frame.jpg';

const Button = ({text, style, action}) => {
  return (
    <TouchableOpacity
      style={[s.button, {borderWidth: style ? 0 : 2}]}
      activeOpacity={0.8}
      onPress={action}>
      <ImageBackground
        style={s.background}
        imageStyle={s.imageStyle}
        source={
          style === 'violet'
            ? VioletFrame
            : style === 'orange'
            ? OrangeFrame
            : null
        }>
        <Text style={s.text}>{text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Button;
