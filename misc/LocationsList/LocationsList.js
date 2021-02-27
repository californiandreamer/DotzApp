import React, {Fragment} from 'react';
import s from './LocationsList.s';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import StarImg from '../../assets/icons/ic-star2.png';
import ArrowRightImg from '../../assets/icons/ic-forward.png';

const LocationsList = ({title, locations}) => {
  return (
    <View style={s.container}>
      {title ? (
        <View style={s.wrapper}>
          <Text style={s.title}>{title}</Text>
        </View>
      ) : null}
      {locations.map((location, index) => (
        <TouchableOpacity style={s.item} activeOpacity={0.8} key={index}>
          <View style={s.divider}>
            <Text style={s.number}>{index + 1}</Text>
            <Text style={s.name}>{location.loc_title}</Text>
          </View>
          <View style={[s.divider, {justifyContent: 'flex-end'}]}>
            <View style={s.stars}>
              <Image style={s.starImg} source={StarImg} />
              <Image style={s.starImg} source={StarImg} />
              <Image style={s.starImg} source={StarImg} />
              <Image style={s.starImg} source={StarImg} />
              <Image style={s.starImg} source={StarImg} />
            </View>
            <Image style={s.arrow} source={ArrowRightImg} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LocationsList;
