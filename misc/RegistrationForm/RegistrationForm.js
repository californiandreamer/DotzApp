import React, {useState} from 'react';
import s from './RegistrationForm.s';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import EditImg from '../../assets/icons/ic-edit.png';

const RegistrationForm = ({onNameChange, onCityChange, onImageLoaded}) => {
  const [uploadedImage, setUploadedImage] = useState({});

  const chooseFile = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 1000,
      maxHeight: 1000,
      quality: 1,
      includeBase64: false,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('didCancel');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        console.log('errorChoose');
        return;
      } else if (response.errorCode === 'permission') {
        console.log('errorChoose');
        return;
      } else if (response.errorCode === 'others') {
        console.log('errorChoose');
        return;
      }
      setUploadedImage(response);
      onImageLoaded(response);
    });
  };

  return (
    <View style={s.container}>
      <View style={s.wrapper}>
        <View style={s.avatar}>
          <Image style={s.avatarImg} source={{uri: uploadedImage.uri}} />
          <TouchableOpacity
            style={s.editAvatarBtn}
            activeOpacity={0.8}
            onPress={chooseFile}>
            <Image style={s.editAvatarImg} source={EditImg} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={s.wrapper}>
        <View style={s.form}>
          <View style={s.wrapper}>
            <Text style={s.title}>User Name</Text>
            <TextInput
              style={s.input}
              onChange={(e) => {
                e.persist();
                onNameChange(e.nativeEvent.text);
              }}
            />
          </View>
          <View style={s.wrapper}>
            <Text style={s.title}>City</Text>
            <TextInput
              style={s.input}
              onChange={(e) => {
                e.persist();
                onCityChange(e.nativeEvent.text);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegistrationForm;
