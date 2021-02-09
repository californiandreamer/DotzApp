import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../../misc/Button/Button';
import Changer from '../../misc/Changer/Changer';

const ChooseActivity = () => {
  const navigation = useNavigation();

  const stackNavigate = (route) => {
    navigation.navigate(route);
  };

  return (
    <ScrollView style={s.container}>
      <View style={s.wrapper}>
        <Text style={s.title}>Welcome!</Text>
      </View>
      <View style={s.wrapper}>
        <Text style={s.text}>Choose your current activity</Text>
      </View>
      <View style={s.wrapper}>
        <Changer />
      </View>
      <View style={s.wrapper}>
        <Button
          text={'Start'}
          style={'orange'}
          action={() => stackNavigate('Root')}
        />
      </View>
    </ScrollView>
  );
};

export default ChooseActivity;

const innerWidth = Dimensions.get('screen').width;
const smallScreen = innerWidth < 350;

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    backgroundColor: '#141F25',
  },
  wrapper: {
    paddingVertical: 10,
  },
  title: {
    marginTop: 16,
    fontFamily: 'Gilroy-Regular',
    textTransform: 'uppercase',
    fontSize: smallScreen ? 14 : 18,
    color: '#F0FCFF',
  },
  text: {
    width: '80%',
    fontFamily: 'Gilroy-SemiBold',
    textTransform: 'uppercase',
    fontSize: smallScreen ? 22 : 28,
    lineHeight: 35,
    color: '#F0FCFF',
  },
});
