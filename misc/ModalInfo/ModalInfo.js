import React from 'react';
import s from './ModalInfo.s';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

const ModalInfo = ({data, hideModal}) => {
  return (
    <TouchableOpacity
      style={s.contaier}
      onPress={hideModal}
      activeOpacity={0.8}>
      <TouchableOpacity style={s.inner} activeOpacity={1}>
        <ScrollView style={s.scrollBox}>
          {data.map((item, index) => (
            <Text style={s.text} key={index}>
              {item}
            </Text>
          ))}
        </ScrollView>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ModalInfo;
