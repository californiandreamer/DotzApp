import React, {useState} from 'react';
import s from './RegistrationForm.s';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import EditImg from '../../assets/icons/ic-edit.png';
import {profileImageUrl} from '../../api/api';

const RegistrationForm = ({
  nameValue,
  cityValue,
  imageUri,
  onNameChange,
  showCitySelector,
  onImageLoaded,
}) => {
  const [uploadedImage, setUploadedImage] = useState(null);

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
          <Image
            style={s.avatarImg}
            source={
              uploadedImage !== null
                ? {uri: uploadedImage.uri}
                : {uri: `${profileImageUrl}${imageUri}`}
            }
          />
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
              value={nameValue}
              onChange={(e) => {
                e.persist();
                onNameChange(e.nativeEvent.text);
              }}
            />
          </View>
          <View style={s.wrapper}>
            <Text style={s.title}>City</Text>
            <TouchableOpacity
              style={s.citySelectorBtn}
              activeOpacity={0.8}
              onPress={showCitySelector}>
              <Text style={s.citySelectorBtnText}>{cityValue}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegistrationForm;
