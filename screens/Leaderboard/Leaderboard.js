import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import BarStatus from '../../misc/BarStatus/BarStatus';
import Button from '../../misc/Button/Button';
import Header from '../../misc/Header/Header';
import LeaderboardComponent from '../../misc/Leaderboard/Leaderboard';

const Leaderboard = () => {
  return (
    <ScrollView style={s.container}>
      <Header />
      <View style={s.wrapper}>
        <BarStatus title={'Location name'} />
      </View>
      <View style={s.wrapper}>
        <Button text={'Go to location'} style={'orange'} />
        <LeaderboardComponent />
      </View>
    </ScrollView>
  );
};

export default Leaderboard;

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
