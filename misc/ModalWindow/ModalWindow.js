import React from 'react';
import s from './ModalWindow.s';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import OrangeFrame from '../../assets/images/orange-frame.jpg';

const ModalWindow = ({title, buttonText, cancelText, action, cancelAction}) => {
  const customButtonStyle = {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.12)',
  };
  const customButtonTextStyle = {
    color: '#E64646',
  };

  return (
    <View style={s.container}>
      <View style={s.inner}>
        <ImageBackground
          style={s.background}
          source={OrangeFrame}
          imageStyle={s.imageStyle}>
          <Text style={s.title}>{title}</Text>
          <TouchableOpacity
            style={[s.button, customButtonStyle]}
            activeOpacity={0.8}
            onPress={action}>
            <Text style={[s.text, customButtonTextStyle]}>{buttonText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.button}
            activeOpacity={0.8}
            onPress={cancelAction}>
            <Text style={s.text}>{cancelText}</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  );
};

export default ModalWindow;
