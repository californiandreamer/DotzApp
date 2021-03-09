import React from 'react';
import s from './LocationsList.s';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {handleStars} from '../../utils/StarsHandler';
import ArrowRightImg from '../../assets/icons/ic-forward.png';

const LocationsList = ({title, locations}) => {
  const navigation = useNavigation();
  const stackPush = (route, params) => {
    navigation.push(route, params);
  };

  const returnStars = (rate) => {
    const parsedRate = JSON.parse(rate);
    const stars = handleStars(parsedRate, 20);
    return stars;
  };

  return (
    <View style={s.container}>
      {title ? (
        <View style={s.wrapper}>
          <Text style={s.title}>{title}</Text>
        </View>
      ) : null}
      {locations.map((location, index) => (
        <TouchableOpacity
          style={s.item}
          activeOpacity={0.8}
          key={index}
          onPress={() =>
            stackPush('CheckOut', {
              id: location.loc_id,
              title: location.loc_title,
              image: location.activity.activity_img,
              coordinates: location.loc_cors_all,
              records: location.loc_records,
            })
          }>
          <View style={s.divider}>
            <Text style={s.number}>{index + 1}</Text>
            <Text style={s.name}>{location.loc_title}</Text>
          </View>
          <View style={[s.divider, {justifyContent: 'flex-end'}]}>
            <View style={s.stars}>
              {(() => returnStars(location.loc_rating))()}
            </View>
            <Image style={s.arrow} source={ArrowRightImg} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LocationsList;
