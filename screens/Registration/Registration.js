import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import EditImg from '../../assets/icons/ic-edit.png';
import Button from '../../misc/Button/Button';
import Selector from '../../misc/Selector/Selector';

const Registration = () => {
  const navigation = useNavigation();

  const stackNavigate = (route) => {
    navigation.navigate(route);
  };

  return (
    <ScrollView style={s.container}>
      <View style={s.wrapper}>
        <View style={s.avatar}>
          <TouchableOpacity style={s.editAvatarBtn} activeOpacity={0.8}>
            <Image style={s.editAvatarImg} source={EditImg} />
          </TouchableOpacity>
        </View>
        <View style={s.wrapper}>
          <View style={s.form}>
            <View style={s.wrapper}>
              <Text style={s.title}>User Name</Text>
              <TextInput style={s.input} />
            </View>
            <View style={s.wrapper}>
              <Text style={s.title}>City</Text>
              <TextInput style={s.input} />
            </View>
          </View>
        </View>
        <View style={s.wrapper}>
          <Selector />
        </View>
        <View style={s.wrapper}>
          <Button
            text={'Continue'}
            style={'orange'}
            action={() => stackNavigate('PrivacyBubble')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Registration;

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    backgroundColor: '#141F25',
  },
  wrapper: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    backgroundColor: '#C4C4C4',
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 150,
    position: 'relative',
    zIndex: 1,
  },
  editAvatarBtn: {
    width: 32,
    height: 32,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  editAvatarImg: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  form: {
    width: '100%',
  },
  title: {
    width: '100%',
    fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    color: '#FECE03',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 56,
    padding: 16,
    backgroundColor: '#212E36',
    borderWidth: 1,
    borderColor: '#3A454B',
    borderRadius: 16,
    fontSize: 18,
    fontFamily: 'Gilroy-Regular',
    color: '#F0FCFF',
  },
});
