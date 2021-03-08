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
// import {activities} from '../../data';
import {profileImageUrl} from '../../api/api';
import {activitiesImagePath, activitiesPath} from '../../api/routes';

const PopUp = ({
  title,
  name,
  text,
  type,
  image,
  activities,
  isActionDisabled,
  onContentChange,
  onActivityChange,
  action1,
  closeAction,
}) => {
  const [activeItem, setActiveItem] = useState(null);

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
    closeAction();
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
              {activities?.map((item) => (
                <View style={s.item} key={item.activity_id}>
                  <TouchableOpacity
                    style={
                      activeItem === item.activity_id
                        ? s.activeButton
                        : s.button
                    }
                    activeOpacity={0.8}
                    onPress={() => {
                      onActivityChange(item.activity_id);
                      setActiveItem(item.activity_id);
                    }}>
                    <Image
                      style={s.image}
                      source={{
                        uri: `${activitiesImagePath}${item.activity_img}`,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ))}
              <TextInput
                style={s.input}
                textAlignVertical={'top'}
                multiline
                numberOfLines={4}
                onChange={(e) => {
                  e.persist();
                  onContentChange(e.nativeEvent.text);
                }}
              />
            </View>
          </View>
          <View style={s.wrapper}>
            <Button text={'Close'} action={hideAlert} />
            <Button
              isDisabled={isActionDisabled}
              text={'Send'}
              style={'orange'}
              customStyle={{marginBottom: 0}}
              action={action1}
            />
          </View>
        </View>
      ) : type === 'receive' ? (
        <View style={s.inner}>
          <View style={s.wrapper}>
            <Text style={s.title}>{title}</Text>
          </View>
          <View style={s.wrapper}>
            <Image
              style={s.avatar}
              source={{uri: `${profileImageUrl}${image}`}}
            />
            <Text style={s.name}>{name}</Text>
          </View>
          <View style={s.wrapper}>
            <Text style={s.description}>{text}</Text>
          </View>
          <View style={s.wrapper}>
            <View style={s.wrapper}>
              <Button text={'Close'} action={hideAlert} />
              <Button
                text={"I'm in"}
                style={'orange'}
                customStyle={{marginBottom: 0}}
                action={action1}
              />
            </View>
          </View>
        </View>
      ) : null}
    </Animated.View>
  );
};

export default PopUp;
