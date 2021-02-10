import React from 'react';
import s from './Button.s';
import {ImageBackground, Text, TouchableOpacity} from 'react-native';
import RedFrame from '../../assets/images/red-frame.jpg';
import GreenFrame from '../../assets/images/green-frame.jpg';
import VioletFrame from '../../assets/images/violet-frame.jpg';
import OrangeFrame from '../../assets/images/orange-frame.jpg';

const Button = ({text, style, isDisabled, customStyle, imageStyle, action}) => {
  return (
    <TouchableOpacity
      style={[s.button, {borderWidth: style ? 0 : 2}, customStyle]}
      activeOpacity={0.8}
      disabled={isDisabled}
      onPress={action}>
      <ImageBackground
        style={[s.background, {opacity: isDisabled ? 0.8 : 1}]}
        imageStyle={imageStyle || s.imageStyle}
        source={
          style === 'violet'
            ? VioletFrame
            : style === 'orange'
            ? OrangeFrame
            : style === 'red'
            ? RedFrame
            : style === 'green'
            ? GreenFrame
            : null
        }>
        <Text style={s.text}>{text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Button;
