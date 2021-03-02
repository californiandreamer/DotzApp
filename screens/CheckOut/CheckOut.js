import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Button from '../../misc/Button/Button';
import Header from '../../misc/Header/Header';
import BarStatus from '../../misc/BarStatus/BarStatus';
import LeaderboardComponent from '../../misc/Leaderboard/Leaderboard';

const CheckOut = ({route}) => {
  const data = {...route.params};

  return (
    <ScrollView style={s.container}>
      <Header />
      <View style={s.wrapper}>
        <BarStatus title={data.title} image={data.image} imageType={'link'} />
      </View>
      <View style={s.wrapper}>
        <Button text={'Go to location'} style={'orange'} />
        <LeaderboardComponent />
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
