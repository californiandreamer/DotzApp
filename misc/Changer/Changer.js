import React, {useState} from 'react';
import s from './Changer.s';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {activitiesImagePath} from '../../api/routes';

const Changer = ({disabled, activities, currentActivity, action}) => {
  console.log('activitiesCHANGER', activities);
  console.log('currentActivityCHANGER', currentActivity);
  return (
    <View style={s.container}>
      {activities.map((activity) => (
        <View style={s.item} key={activity.activity_id}>
          <TouchableOpacity
            style={
              currentActivity === activity.activity_id ? s.activeInner : s.inner
            }
            disabled={disabled}
            activeOpacity={0.8}
            onPress={() => {
              action(activity.activity_id);
            }}>
            <Image
              style={s.image}
              source={{
                uri: `${activitiesImagePath}/${activity.activity_img}`,
              }}
            />
            <Text style={s.text}>{activity.activity_name}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default Changer;
