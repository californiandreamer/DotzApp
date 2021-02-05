import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Header from '../../misc/Header/Header';
import HeadLine from '../../misc/HeadLine/HeadLine';
import LocationsList from '../../misc/LocationsList/LocationsList';

const SavedLocations = () => {
  return (
    <ScrollView style={s.container}>
      <Header />
      <HeadLine title={'Saved Locations'} subtitle={''} />
      <LocationsList />
    </ScrollView>
  );
};

export default SavedLocations;

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#141F25',
  },
});
