import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Header from '../../misc/Header/Header';
import HeadLine from '../../misc/HeadLine/HeadLine';
import LocationsList from '../../misc/LocationsList/LocationsList';

const Locaitons = () => {
  return (
    <ScrollView style={s.container}>
      <Header />
      <HeadLine title={'City name'} subtitle={'Total riders: 10'} />
      <LocationsList title={'All Locations'} />
    </ScrollView>
  );
};

export default Locaitons;

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#141F25',
  },
});
