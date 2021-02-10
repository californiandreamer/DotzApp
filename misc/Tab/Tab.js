import React, {useRef, useState} from 'react';
import s from './Tab.s';
import {View, Text, TouchableOpacity, Animated} from 'react-native';

const Tab = ({tab1, tab2, action}) => {
  const tabAnimation = useRef(new Animated.Value(0)).current;

  const [activeTab, setActiveTab] = useState(tab1);
  const [containerHalfWidth, setContainerHalfWidth] = useState(300);

  const toggleTab = () => {
    action(activeTab === tab1 ? tab2 : tab1);
    setActiveTab((prev) => (prev === tab1 ? tab2 : tab1));
    if (activeTab === tab1) {
      Animated.timing(tabAnimation, {
        toValue: containerHalfWidth,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(tabAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  };

  const getContainerWidth = (e) => {
    const halfWidth = e.nativeEvent.layout.width / 2 - 1;
    setContainerHalfWidth(halfWidth);
  };

  return (
    <TouchableOpacity
      style={s.container}
      activeOpacity={1}
      onLayout={(e) => getContainerWidth(e)}
      onPress={() => {
        toggleTab();
      }}>
      <Text style={s.text}>{tab1}</Text>
      <Text style={s.text}>{tab2}</Text>
      <Animated.View style={[s.tab, {left: tabAnimation}]}>
        {/* <Animated.View style={[s.tab, {transform: [{translateX: tabAnimation}]}]}> */}
        <TouchableOpacity style={s.area} activeOpacity={1}>
          <View style={s.inner}>
            <Text style={s.activeText}>{activeTab}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Tab;
