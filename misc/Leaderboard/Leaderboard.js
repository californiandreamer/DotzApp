import React from 'react';
import s from './Leaderboard.s';
import {View, Text, Image} from 'react-native';
import GirlImg from '../../assets/images/girl.jpg';
import FirstPlaceImg from '../../assets/icons/ic-1st-place-medal.png';
import SecondPlaceImg from '../../assets/icons/ic-2nd-place-medal.png';
import ThirdPlaceImg from '../../assets/icons/ic-3rd-place-medal.png';

const Leaderboard = () => {
  return (
    <View style={s.container}>
      <View style={s.wrapper}>
        <Text style={s.title}>Leaderboard</Text>
      </View>
      <View style={s.wrapper}>
        <View style={s.item}>
          <View style={[s.inner, {backgroundColor: '#FECE03'}]}>
            <View style={s.place}>
              <Image style={s.placeImg} source={FirstPlaceImg} />
            </View>
            <View style={s.content}>
              <Image style={s.image} source={GirlImg} />
              <View style={s.text}>
                <Text style={s.name}>Mark</Text>
                <Text style={s.result}>21 min</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={s.item}>
          <View style={[s.inner, {backgroundColor: '#C4C4C4'}]}>
            <View style={s.place}>
              <Image style={s.placeImg} source={SecondPlaceImg} />
            </View>
            <View style={s.content}>
              <Image style={s.image} source={GirlImg} />
              <View style={s.text}>
                <Text style={s.name}>Mark</Text>
                <Text style={s.result}>23 min</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={s.item}>
          <View style={[s.inner, {backgroundColor: '#E6AD79'}]}>
            <View style={s.place}>
              <Image style={s.placeImg} source={ThirdPlaceImg} />
            </View>
            <View style={s.content}>
              <Image style={s.image} source={GirlImg} />
              <View style={s.text}>
                <Text style={s.name}>Mark</Text>
                <Text style={s.result}>28 min</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Leaderboard;
