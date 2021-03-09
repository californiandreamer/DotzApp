import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {getHeadersWithAccessToken} from '../../hooks/useAccessToken';
import {getItem} from '../../hooks/useAsyncStorage';
import {axiosGet} from '../../hooks/useAxios';
import Header from '../../misc/Header/Header';
import HeadLine from '../../misc/HeadLine/HeadLine';
import LocationsList from '../../misc/LocationsList/LocationsList';
import {errorsContent, swipeToUpdateContent} from '../../data';

const FilteredLocations = ({route}) => {
  const path = '/locations';

  const [locations, setLocations] = useState([]);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const checkRoureParams = () => {
    if (route.params !== undefined) {
      filterLocations();
    } else {
      getFavoriteLocations();
    }
  };

  const filterLocations = () => {
    const data = route.params.data;
    const value = route.params.filterValue;

    const filteredData = data.filter((item) => item.loc_city === value);
    setLocations(filteredData);
    setTitle(value);
    setSubtitle('');
  };

  const getFavoriteLocations = async () => {
    setTitle('Saved');
    const profileData = await getItem('profile');
    const parsedProfileData = JSON.parse(profileData);
    const favoriteLocations = parsedProfileData.profile_favourite_locs;
    if (favoriteLocations !== null) {
      returnLocations(favoriteLocations);
      setSubtitle(`${swipeToUpdateContent.text} saved locations`);
    } else {
      setSubtitle(errorsContent.noLocations.title);
    }
  };

  let initialLocationsArr = [];
  const returnLocations = async (arr) => {
    const headers = await getHeadersWithAccessToken();
    const locationsList = await axiosGet(path, headers);
    for (let i = 0; i < arr.length; i++) {
      const id = arr[i];
      const findedLocation = locationsList.find((item) => item.loc_id === id);
      if (findedLocation) {
        initialLocationsArr.push(findedLocation);
      }
    }
    setLocations(initialLocationsArr);
  };

  useEffect(() => {
    checkRoureParams();
  }, []);

  return (
    <ScrollView style={s.container} onTouchEnd={checkRoureParams}>
      <Header />
      <HeadLine title={title} subtitle={subtitle} />
      <LocationsList locations={locations} />
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
