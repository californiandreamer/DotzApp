import React, {useEffect, useRef, useState} from 'react';
import s from './PopUp.s';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
} from 'react-native';
import Button from '../Button/Button';
import NextImg from '../../assets/icons/icon-siguiente.png';
import CloseImg from '../../assets/icons/ic-close2.png';
import GirlImg from '../../assets/images/girl.jpg';
import BlastMessageImg from '../../assets/icons/ic-message.png';
import {activities} from '../../data';

const PopUp = ({title, name, text, type, action1, action2, closeAction}) => {
  const data = activities;

  const [activeItem, setActiveItem] = useState(1);

  const animationVal = useRef(new Animated.Value(-200)).current;

  const showAlert = () => {
    Animated.timing(animationVal, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const hideAlert = () => {
    Animated.timing(animationVal, {
      toValue: -2000,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    showAlert();
  }, []);

  return (
    <Animated.View style={[s.container, {bottom: animationVal}]}>
      {type === 'compose' ? (
        <View style={s.inner}>
          <Image style={s.blastImage} source={BlastMessageImg} />
          <View style={s.wrapper}>
            <Text style={s.title}>{title}</Text>
          </View>
          <View style={s.wrapper}>
            <View style={s.row}>
              <Text style={s.rowText}>To:</Text>
              {data.map((item) => (
                <View style={s.item}>
                  <TouchableOpacity
                    style={activeItem === item.id ? s.activeButton : s.button}
                    key={item.id}
                    activeOpacity={0.8}
                    onPress={() => setActiveItem(item.id)}>
                    <Image style={s.image} source={item.image} />
                  </TouchableOpacity>
                </View>
              ))}
              <TextInput
                style={s.input}
                textAlignVertical={'top'}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
          <View style={s.wrapper}>
            <Button text={'Close'} action={action1} />
            <Button
              text={'Send'}
              style={'orange'}
              customStyle={{marginBottom: 0}}
              action={action2}
            />
          </View>
        </View>
      ) : type === 'receive' ? (
        <View style={s.inner}>
          <View style={s.wrapper}>
            <Text style={s.title}>{title}</Text>
          </View>
          <View style={s.wrapper}>
            <Image style={s.avatar} source={GirlImg} />
            <Text style={s.name}>Megan Rain</Text>
          </View>
          <View style={s.wrapper}>
            <Text style={s.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio id
              maiores eius culpa tempora error tempore.
            </Text>
          </View>
          <View style={s.wrapper}>
            <View style={s.wrapper}>
              <Button text={'Close'} action={action1} />
              <Button
                text={"I'm in"}
                style={'orange'}
                customStyle={{marginBottom: 0}}
                action={action2}
              />
            </View>
          </View>
        </View>
      ) : null}
    </Animated.View>
  );
};

export default PopUp;
