import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import StarImg from '../assets/icons/ic-star2.png';
import HalfStarImg from '../assets/icons/ic-Half-Star.png';
import EmptyStarImg from '../assets/icons/ic-star1.png';

export const handleStars = (val, size) => {
  const s = StyleSheet.create({
    starsRow: {
      flexDirection: 'row',
    },
    button: {
      width: size,
      height: size,
      paddingHorizontal: 2,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    text: {
      fontFamily: 'Gilroy-Regular',
      fontSize: 12,
      color: '#fff',
    },
  });

  switch (val) {
    case 0.5:
      return (
        <View style={s.starsRow}>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={HalfStarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
        </View>
      );
      break;

    case 1:
      return (
        <View style={s.starsRow}>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
        </View>
      );
      break;

    case 1.5:
      return (
        <View style={s.starsRow}>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={HalfStarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
        </View>
      );
      break;

    case 2:
      return (
        <View style={s.starsRow}>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
        </View>
      );
      break;

    case 2.5:
      return (
        <View style={s.starsRow}>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={HalfStarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
        </View>
      );
      break;

    case 3:
      return (
        <View style={s.starsRow}>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
        </View>
      );
      break;

    case 3.5:
      return (
        <View style={s.starsRow}>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={HalfStarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
        </View>
      );
      break;

    case 4:
      return (
        <View style={s.starsRow}>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={EmptyStarImg} />
          </View>
        </View>
      );
      break;

    case 4.5:
      return (
        <View style={s.starsRow}>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={HalfStarImg} />
          </View>
        </View>
      );
      break;

    case 5:
      return (
        <View style={s.starsRow}>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
          <View style={s.button} activeOpacity={0.8}>
            <Image style={s.image} source={StarImg} />
          </View>
        </View>
      );
      break;

    default:
      return <Text style={s.text}>No rate</Text>;
      break;
  }
};
