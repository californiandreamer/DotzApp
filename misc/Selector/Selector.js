import React, {useEffect, useState} from 'react';
import s from './Selector.s';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import agreeOn from '../../assets/icons/ic-agreeOn.png';
import agreeOff from '../../assets/icons/ic-agreeOff.png';

const Selector = ({activities, onActivityChange}) => {
  const data = activities;
  const path = 'http://admin.officialdotzapp.com/uploads/activities';

  const [activeItems, setActiveItems] = useState(['1']);

  const checkActiveItems = (id) => {
    const isIncluded = activeItems.includes(id);

    if (isIncluded) {
      const index = activeItems.indexOf(id);
      if (index > -1) {
        activeItems.splice(index, 1);
        setActiveItems([...activeItems]);
      }
    } else {
      if (activeItems.length < 4) {
        setActiveItems([...activeItems, id]);
      }
    }
  };

  useEffect(() => {
    onActivityChange(activeItems);
  }, [activeItems]);

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>Activities</Text>
      </View>
      {data.map((item, index) => (
        <View
          style={
            index === data.length - 1
              ? [
                  s.item,
                  {borderBottomLeftRadius: 16, borderBottomRightRadius: 16},
                ]
              : s.item
          }
          key={item.activity_id}>
          <Image
            style={s.itemImg}
            source={{
              uri: `${path}/${item.activity_img}`,
            }}
          />
          <Text style={s.itemTitle}>{item.activity_name}</Text>
          <TouchableOpacity
            style={s.checkBox}
            activeOpacity={0.8}
            onPress={() => checkActiveItems(item.activity_id)}>
            {activeItems.includes(item.activity_id) ? (
              <Image style={s.checkBoxImg} source={agreeOn} />
            ) : (
              <Image style={s.checkBoxImg} source={agreeOff} />
            )}
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default Selector;
