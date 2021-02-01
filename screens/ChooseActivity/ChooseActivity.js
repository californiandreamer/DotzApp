import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
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
        <Text style={s.title}>Welcome Devon!</Text>
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

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: '#141F25',
  },
  wrapper: {
    paddingVertical: 10,
  },
  title: {
    fontFamily: 'Gilroy-Regular',
    textTransform: 'uppercase',
    fontSize: 18,
    color: '#F0FCFF',
  },
  text: {
    width: '80%',
    fontFamily: 'Gilroy-SemiBold',
    textTransform: 'uppercase',
    fontSize: 28,
    lineHeight: 35,
    color: '#F0FCFF',
  },
});
