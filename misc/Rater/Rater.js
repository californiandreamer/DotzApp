import React, {Fragment, useState} from 'react';
import s from './Rater.s';
import {View, Text, Image, ScrollView} from 'react-native';
import StarImg from '../../assets/icons/ic-star2.png';
import HalfStarImg from '../../assets/icons/ic-Half-Star.png';
import EmptyStarImg from '../../assets/icons/ic-star1.png';

const Rater = ({title, onChange}) => {
  const [rate, setRate] = useState(5);
  const [layoutX, setLayoutX] = useState(0);
  const [rateElement, setRateElement] = useState(
    <Fragment>
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
    </Fragment>,
  );

  const handleTap = (e) => {
    const tapPosition = e.nativeEvent.pageX;
    const initialPageX = layoutX + 20;
    const val = -initialPageX + tapPosition;
    getRate(val);
  };

  const getRate = (val) => {
    if (val > 0 && val < 20) {
      onChange(0.5);
      setRateElement(
        <Fragment>
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
        </Fragment>,
      );
    } else if (val > 20 && val < 40) {
      onChange(1);
      setRateElement(
        <Fragment>
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
        </Fragment>,
      );
    } else if (val > 40 && val < 60) {
      onChange(1.5);
      setRateElement(
        <Fragment>
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
        </Fragment>,
      );
    } else if (val > 60 && val < 80) {
      onChange(2);
      setRateElement(
        <Fragment>
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
        </Fragment>,
      );
    } else if (val > 80 && val < 100) {
      onChange(2.5);
      setRateElement(
        <Fragment>
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
        </Fragment>,
      );
    } else if (val > 100 && val < 120) {
      onChange(3);
      setRateElement(
        <Fragment>
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
        </Fragment>,
      );
    } else if (val > 120 && val < 140) {
      onChange(3.5);
      setRateElement(
        <Fragment>
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
        </Fragment>,
      );
    } else if (val > 140 && val < 160) {
      onChange(4);
      setRateElement(
        <Fragment>
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
        </Fragment>,
      );
    } else if (val > 160 && val < 180) {
      onChange(4.5);
      setRateElement(
        <Fragment>
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
        </Fragment>,
      );
    } else if (val > 180 && val < 200) {
      onChange(5);
      setRateElement(
        <Fragment>
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
        </Fragment>,
      );
    }
  };

  return (
    <View style={s.container}>
      <View style={s.wrapper}>
        <Text style={s.heading}>Rate this location</Text>
      </View>
      <View style={s.wrapper}>
        <ScrollView
          style={s.starsRow}
          horizontal
          onLayout={(e) => {
            e.persist();
            setLayoutX(e.nativeEvent.layout.x);
          }}
          onTouchStart={(e) => {
            e.persist();
            handleTap(e);
          }}>
          {rateElement}
        </ScrollView>
      </View>
      <View style={s.wrapper}>
        <Text style={s.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Rater;
