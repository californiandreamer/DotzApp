import React, {useState} from 'react';
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
import {launchImageLibrary} from 'react-native-image-picker';
import EditImg from '../../assets/icons/ic-edit.png';
import Button from '../../misc/Button/Button';
import Selector from '../../misc/Selector/Selector';
import axios from 'axios';
import GirlImg from '../../assets/images/girl.jpg';
import {headers, url} from '../../api/api';
import {activities} from '../../data';

const Registration = () => {
  const navigation = useNavigation();

  const stackNavigate = (route) => {
    navigation.navigate(route);
  };

  const [filePath, setFilePath] = useState({});
  console.log('filePath', filePath);

  const chooseFile = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 1000,
      maxHeight: 1000,
      quality: 1,
      includeBase64: true,
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
      setFilePath(response);
    });
  };

  const testRequest = async () => {
    const testImage = activities[0].image;
    let postData = new FormData();
    postData.append('email', 'test3@nazar.com');
    postData.append('password', '12345678');
    postData.append('name', 'Nazar Test');
    postData.append('scope', 'app');
    postData.append('profile_img_ava', {
      uri: filePath.uri,
      name: filePath.fileName,
      type: filePath.type,
    });
    postData.append('profile_city', 'Warsaw');
    console.log('postData', postData);

    // return fetch(url, {
    //   method: 'POST',
    //   body: postData,
    //   headers: {
    //     Authorization:
    //       'Basic WlB3Y0diRkdGRmpNWjM0aENNNHI0WEV5QUw4U0NMOjd3UDRqZT1OZVIzJnpKYUp6MyMzNSNiSFo/VUErZ1AtOEVHSGNQVC0=',
    //     'Content-Type': 'multipart/form-data',
    //   },
    // }).then((res) => console.log('res', res));

    const request = await axios
      .post(
        'http://admin.officialdotzapp.com/api/appuser/register',
        {postData},
        {
          Authorization:
            'Basic WlB3Y0diRkdGRmpNWjM0aENNNHI0WEV5QUw4U0NMOjd3UDRqZT1OZVIzJnpKYUp6MyMzNSNiSFo/VUErZ1AtOEVHSGNQVC0=',
          'Content-Type': 'multipart/form-data',
        },
      )
      .then((res) => console.log('res', res))
      .catch((error) => console.log('error', error));
  };

  return (
    <ScrollView style={s.container}>
      <View style={s.wrapper}>
        <View style={s.avatar}>
          <TouchableOpacity
            style={s.editAvatarBtn}
            activeOpacity={0.8}
            onPress={chooseFile}>
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
            // action={() => testRequest()}
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
