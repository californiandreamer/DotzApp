import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {getHeadersWithAccessToken} from '../../hooks/useAccessToken';
import {axiosGet} from '../../hooks/useAxios';
import CitiesList from '../../misc/CitiesList/CitiesList';
import Header from '../../misc/Header/Header';
import HeadLine from '../../misc/HeadLine/HeadLine';

const Cities = () => {
  const path = '/locations';

  const [locationsData, setLocationsData] = useState([]);
  const [allLocationsData, setAllLocationsData] = useState([]);

  const getLocations = async () => {
    const headers = await getHeadersWithAccessToken();
    const locations = await axiosGet(path, headers);
    setAllLocationsData(locations);
    filterCities(locations);
  };

  let initialCitiesArray = [];
  const filterCities = (locations) => {
    for (let i = 0; i < locations.length; i++) {
      const item = locations[i];
      const city = item.loc_city;
      const isExist = initialCitiesArray.some((el) => el.loc_city === city);
      if (!isExist) {
        initialCitiesArray.push(item);
      }
    }
    setLocationsData(initialCitiesArray);
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <ScrollView style={s.container}>
      <Header />
      <HeadLine title={'Select a city'} subtitle={''} />
      <CitiesList locations={locationsData} allLocations={allLocationsData} />
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
