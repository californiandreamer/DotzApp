import React from 'react';
import s from './Leaderboard.s';
import {View, Text, Image} from 'react-native';
import AvatarPlaceholderImg from '../../assets/images/avatar.jpg';
import FirstPlaceImg from '../../assets/icons/ic-1st-place-medal.png';
import SecondPlaceImg from '../../assets/icons/ic-2nd-place-medal.png';
import ThirdPlaceImg from '../../assets/icons/ic-3rd-place-medal.png';
import {profileImageUrl} from '../../api/api';

const Leaderboard = ({data}) => {
  const renderStyledItem = (name, time, image, index) => {
    switch (index) {
      case 0:
        return (
          <View style={s.item} key={index}>
            <View style={[s.inner, {backgroundColor: '#FECE03'}]}>
              <View style={s.place}>
                <Image style={s.placeImg} source={FirstPlaceImg} />
              </View>
              <View style={s.content}>
                <Image
                  style={s.image}
                  source={
                    image !== null
                      ? {uri: `${profileImageUrl}${image}`}
                      : AvatarPlaceholderImg
                  }
                />
                <View style={s.text}>
                  <Text style={s.name}>{name}</Text>
                  <Text style={s.result}>{time}</Text>
                </View>
              </View>
            </View>
          </View>
        );
        break;

      case 1:
        return (
          <View style={s.item} key={index}>
            <View style={[s.inner, {backgroundColor: '#C4C4C4'}]}>
              <View style={s.place}>
                <Image style={s.placeImg} source={SecondPlaceImg} />
              </View>
              <View style={s.content}>
                <Image
                  style={s.image}
                  source={
                    image !== null
                      ? {uri: `${profileImageUrl}${image}`}
                      : AvatarPlaceholderImg
                  }
                />
                <View style={s.text}>
                  <Text style={s.name}>{name}</Text>
                  <Text style={s.result}>{time}</Text>
                </View>
              </View>
            </View>
          </View>
        );
        break;
      case 2:
        return (
          <View style={s.item} key={index}>
            <View style={[s.inner, {backgroundColor: '#E6AD79'}]}>
              <View style={s.place}>
                <Image style={s.placeImg} source={ThirdPlaceImg} />
              </View>
              <View style={s.content}>
                <Image
                  style={s.image}
                  source={
                    image !== null
                      ? {uri: `${profileImageUrl}${image}`}
                      : AvatarPlaceholderImg
                  }
                />
                <View style={s.text}>
                  <Text style={s.name}>{name}</Text>
                  <Text style={s.result}>{time}</Text>
                </View>
              </View>
            </View>
          </View>
        );
        break;
      default:
        return (
          <View style={s.wrapper}>
            <Text style={s.info}>This location doesn't have records yet</Text>
          </View>
        );
        break;
    }
  };

  return data && data !== null ? (
    <View style={s.container}>
      <View style={s.wrapper}>
        <Text style={s.title}>Leaderboard</Text>
      </View>
      <View style={s.wrapper}>
        {data.map((item, index) =>
          renderStyledItem(
            item.app_user_name,
            item.time,
            item.profile_img_ava,
            index,
          ),
        )}
      </View>
    </View>
  ) : null;
};

export default Leaderboard;
