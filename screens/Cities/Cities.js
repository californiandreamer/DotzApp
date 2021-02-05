import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import CitiesList from '../../misc/CitiesList/CitiesList';
import Header from '../../misc/Header/Header';
import HeadLine from '../../misc/HeadLine/HeadLine';

const Cities = () => {
  return (
    <ScrollView style={s.container}>
      <Header />
      <HeadLine title={'Select a city'} subtitle={''} />
      <CitiesList />
    </ScrollView>
  );
};

export default Cities;

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#141F25',
  },
});
