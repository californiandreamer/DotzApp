import React from 'react';
import s from './ClubSelector.s';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

const ClubSelector = ({data, onClubChange, hideClubSelector}) => {
  return (
    <TouchableOpacity
      style={s.contaier}
      onPress={hideClubSelector}
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
              key={item.club_id}
              onPress={() => onClubChange(item.club_id)}>
              <Text style={s.text}>{item.club_name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ClubSelector;
