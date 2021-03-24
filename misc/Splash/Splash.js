import React from 'react';
import s from './Splash.s';
import {View} from 'react-native';
import Video from 'react-native-video';

const Splash = () => {
  return (
    <View style={s.container}>
      <Video
        source={require('../../assets/videos/splash.mp4')}
        style={s.video}
        muted={true}
        repeat={false}
        paused={false}
        resizeMode="contain"
      />
    </View>
  );
};

export default Splash;
