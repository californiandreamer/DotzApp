import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Header from '../../misc/Header/Header';
import HeadLine from '../../misc/HeadLine/HeadLine';
import LocationsList from '../../misc/LocationsList/LocationsList';

const FilteredLocations = ({route}) => {
  const data = route.params.data;
  const value = route.params.filterValue;

  const filteredData = data.filter((item) => item.loc_city === value);

  return (
    <ScrollView style={s.container}>
      <Header />
      <HeadLine title={value} subtitle={''} />
      <LocationsList locations={filteredData} />
    </ScrollView>
  );
};

export default FilteredLocations;

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#141F25',
  },
});
