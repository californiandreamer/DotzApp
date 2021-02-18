import React, {useState} from 'react';
import s from './Changer.s';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const Changer = ({activities, action}) => {
  const path = 'http://admin.officialdotzapp.com/uploads/activities';

  const [activeItem, setActiveItem] = useState('1');

  return (
    <View style={s.container}>
      {activities.map((activity) => (
        <View style={s.item} key={activity.activity_id}>
          <TouchableOpacity
            style={
              activeItem === activity.activity_id ? s.activeInner : s.inner
            }
            activeOpacity={0.8}
            onPress={() => {
              action(activity.activity_id);
              setActiveItem(activity.activity_id);
            }}>
            <Image
              style={s.image}
              source={{
                uri: `${path}/${activity.activity_img}`,
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
