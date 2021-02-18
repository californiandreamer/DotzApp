import React, {useEffect, useRef} from 'react';
import s from './Alert.s';
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

const Alert = ({
  title,
  text,
  text2,
  type,
  action1,
  action2,
  onType,
  onType2,
  closeAction,
}) => {
  const animationVal = useRef(new Animated.Value(-500)).current;

  const showAlert = () => {
    Animated.timing(animationVal, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const hideAlert = () => {
    Animated.timing(animationVal, {
      toValue: -500,
      duration: 500,
      useNativeDriver: false,
    }).start();
    closeAction();
  };

  const typeHandler = () => {
    switch (type) {
      case 'next':
        return (
          <View style={s.wrapper}>
            <TouchableOpacity
              style={s.nextBtn}
              activeOpacity={0.8}
              onPress={action1}>
              <Image style={s.nextImg} source={NextImg} />
            </TouchableOpacity>
          </View>
        );
        break;

      case 'choice':
        return (
          <View style={s.wrapper}>
            <Button text={'Close'} action={action1} />
            <Button text={'Next'} style={'orange'} action={action2} />
          </View>
        );
        break;

      case 'input':
        return (
          <View style={s.wrapper}>
            <TextInput
              style={s.input}
              onChange={(e) => {
                e.persist;
                onType(e.nativeEvent.text);
              }}
            />
            {text2 ? (
              <View style={s.wrapper}>
                <Text style={s.text}>{text2}</Text>
              </View>
            ) : null}
            {onType2 ? (
              <TextInput
                style={s.input}
                onChange={(e) => {
                  e.persist;
                  onType2(e.nativeEvent.text);
                }}
              />
            ) : null}
            <Button text={'Next'} style={'orange'} action={action1} />
          </View>
        );
        break;

      case 'error':
        return (
          <View style={s.wrapper}>
            <Button
              text={'Close'}
              customStyle={{marginBottom: 0}}
              action={hideAlert}
            />
          </View>
        );
      default:
        return null;
        break;
    }
  };

  const content = typeHandler();

  useEffect(() => {
    showAlert();
  }, []);

  return (
    <Animated.View style={[s.container, {bottom: animationVal}]}>
      <View style={s.inner}>
        {type === 'input' ? (
          <TouchableOpacity
            style={s.closeBtn}
            activeOpacity={0.8}
            onPress={closeAction}>
            <Image style={s.closeImg} source={CloseImg} />
          </TouchableOpacity>
        ) : null}
        <View style={s.wrapper}>
          <Text style={s.title}>{title}</Text>
        </View>
        <View style={s.wrapper}>
          <Text style={s.text}>{text}</Text>
        </View>
        {content}
      </View>
    </Animated.View>
  );
};

export default Alert;
