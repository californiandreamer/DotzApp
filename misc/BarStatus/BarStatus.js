import React, {useEffect, useRef} from 'react';
import s from './BarStatus.s';
import {View, Text, Image, Animated} from 'react-native';
import {activitiesImageUrl} from '../../api/api';

const BarStatus = ({title, image, imageType}) => {
  const imageUrl = `${activitiesImageUrl}/${image}`;

  const rotatingVal = useRef(new Animated.Value(0)).current;
  const spin = rotatingVal.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '0deg'],
  });

  const startAnimation = () => {
    Animated.timing(rotatingVal, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    startAnimation();
  }, [image]);

  return (
    <View style={s.container}>
      <View style={s.wrapper}>
        <Animated.View style={[s.imageOuter, {transform: [{rotateY: spin}]}]}>
          <Image
            style={s.image}
            source={imageType === 'link' ? {uri: imageUrl} : image}
          />
        </Animated.View>
      </View>
      <View style={s.wrapper}>
        <Text style={s.title}>{title}</Text>
      </View>
    </View>
  );
};

export default BarStatus;
