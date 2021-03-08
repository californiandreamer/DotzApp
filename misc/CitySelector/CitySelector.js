import React from 'react';
import s from './CitySelector.s';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

const CitySelector = ({data, onCityChange, hideCitySelector}) => {
  return (
    <TouchableOpacity
      style={s.contaier}
      onPress={hideCitySelector}
      activeOpacity={0.8}>
      <TouchableOpacity style={s.inner} activeOpacity={1}>
        <ScrollView style={s.scrollBox}>
          {data.map((item, index) => (
            <TouchableOpacity
              style={[
                s.item,
                {borderBottomWidth: data.length - 1 === index ? 0 : 2},
              ]}
              activeOpacity={0.8}
              key={index}
              onPress={() => onCityChange(item)}>
              <Text style={s.text}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CitySelector;
