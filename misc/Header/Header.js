import React, {useState} from 'react';
import s from './Header.s';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import ArrowLeftImg from '../../assets/icons/ic-Arrow-Left.png';
// import SettingsImg from '../../assets/icons/Ic-Setting.png';
import {useNavigation} from '@react-navigation/native';

const Header = ({title, style, icon, quantity, action}) => {
  const [goBackDisabled, setGoBackDisabled] = useState(canGoBack);

  const navigation = useNavigation();

  const canGoBack = navigation.canGoBack();

  const stackGoBack = (route) => {
    if (canGoBack) {
      navigation.goBack(route);
    } else {
      setGoBackDisabled(true);
    }
  };

  return (
    <View
      style={[
        s.container,
        {backgroundColor: style === 'orange' ? '#F18303' : 'transparent'},
      ]}>
      <TouchableOpacity
        style={[s.button, {opacity: canGoBack ? 1 : 0.7}]}
        disabled={goBackDisabled}
        activeOpacity={0.8}
        onPress={stackGoBack}>
        <Image style={s.image} source={ArrowLeftImg} />
      </TouchableOpacity>
      <Text style={[s.title, {fontSize: style === 'orange' ? 18 : 24}]}>
        {title}
      </Text>
      {action ? (
        <TouchableOpacity style={s.button} activeOpacity={0.8} onPress={action}>
          {quantity ? (
            <View style={s.quantity}>
              <Text style={s.quantityText}>{quantity}</Text>
            </View>
          ) : null}
          <Image style={s.image} source={icon} />
        </TouchableOpacity>
      ) : (
        <View style={s.button} />
      )}
    </View>
  );
};

export default Header;
