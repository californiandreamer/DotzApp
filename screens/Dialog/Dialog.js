import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../misc/Header/Header';
import ArrowCircleImg from '../../assets/icons/ic-Arrow-Left-Circle.png';

const Dialog = () => {
  return (
    <View style={s.container}>
      <Header title={'Maciej Kowalski'} style={'orange'} />
      <View style={s.wrapper}>
        <View style={s.chat}>
          <ScrollView style={s.messages} showsVerticalScrollIndicator={false}>
            <View style={s.item}>
              <View style={s.inner}>
                <Text style={s.text}>Some message...</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={s.inputArea}>
          <TextInput style={s.input} placeholder="Message here..." />
          <TouchableOpacity style={s.button} activeOpacity={0.8}>
            <Image style={s.buttonImg} source={ArrowCircleImg} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Dialog;

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#141F25',
  },
  wrapper: {
    height: '100%',
    paddingTop: 0,
    marginTop: 66,
  },
  chat: {
    width: '100%',
    height: '100%',
    paddingBottom: 50,
  },
  messages: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 90,
  },
  item: {
    width: '100%',
    paddingVertical: 8,
  },
  inner: {
    maxWidth: '75%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderBottomLeftRadius: 0,
  },
  inputArea: {
    height: 50,
    paddingHorizontal: 3,
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 82,
    zIndex: 1,
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '85%',
    paddingLeft: 16,
    fontFamily: 'Gilroy-Regular',
  },
  button: {
    width: 50,
  },
  buttonImg: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
