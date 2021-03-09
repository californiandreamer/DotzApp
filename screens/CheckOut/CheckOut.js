import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Button from '../../misc/Button/Button';
import Header from '../../misc/Header/Header';
import BarStatus from '../../misc/BarStatus/BarStatus';
import Leaderboard from '../../misc/Leaderboard/Leaderboard';
import {useNavigation} from '@react-navigation/native';

const CheckOut = ({route}) => {
  const data = {...route.params};

  const navigation = useNavigation();
  const stackPush = (route, params) => {
    navigation.push(route, params);
  };

  return (
    <ScrollView style={s.container}>
      <Header />
      <View style={s.wrapper}>
        <BarStatus title={data.title} image={data.image} imageType={'link'} />
      </View>
      <View style={s.wrapper}>
        <Button
          text={'Go to location'}
          style={'orange'}
          action={() => stackPush('Locations', {...data})}
        />
        <Leaderboard data={data.records} />
      </View>
    </ScrollView>
  );
};

export default CheckOut;

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#141F25',
  },
  wrapper: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 40,
  },
});
