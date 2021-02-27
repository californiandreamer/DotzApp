import React from 'react';
import s from './CitiesList.s';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import ArrowRightImg from '../../assets/icons/ic-forward.png';
import {useNavigation} from '@react-navigation/native';

const CitiesList = ({locations, allLocations}) => {
  const firstItemStyle = {
    borderTopWidth: 2,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  };
  const lastItemStyle = {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  };

  const navigation = useNavigation();
  const stackNavigate = (route, params) => {
    navigation.navigate(route, params);
  };

  return (
    <View style={s.container}>
      {locations.map((location, index) => (
        <TouchableOpacity
          style={[
            s.item,
            index === 0
              ? firstItemStyle
              : index === locations.length - 1
              ? lastItemStyle
              : null,
          ]}
          activeOpacity={0.8}
          key={index}
          onPress={() =>
            stackNavigate('FilteredLocations', {
              data: allLocations,
              filterValue: location.loc_city,
            })
          }>
          <Text style={s.name}>
            {location.loc_city !== null ? location.loc_city : 'Others'}
          </Text>
          <Image style={s.arrow} source={ArrowRightImg} />
        </TouchableOpacity>
      ))}
      {/* <TouchableOpacity style={[s.item, lastItemStyle]} activeOpacity={0.8}>
        <Text style={s.name}>Chicago</Text>
        <Image style={s.arrow} source={ArrowRightImg} />
      </TouchableOpacity> */}
    </View>
  );
};

export default CitiesList;
