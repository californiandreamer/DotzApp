import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Tab from '../../misc/Tab/Tab';
import Header from '../../misc/Header/Header';
import GradientImg from '../../assets/images/gradient.jpg';
import AvatarImg from '../../assets/images/girl.jpg';
import LocationImg from '../../assets/icons/ic-Location2.png';

const Profile = () => {
  const tabProps = {
    tab1: 'Main info',
    tab2: 'Feed',
  };

  const [activeTab, setActiveTab] = useState(tabProps.tab1);

  const getActiveTab = (value) => {
    setActiveTab(value);
  };

  return (
    <ScrollView style={s.container}>
      <Header />
      <Image style={s.background} source={GradientImg} />
      <View style={s.avatar}>
        <Image style={s.avatarImg} source={AvatarImg} />
      </View>
      <View style={s.content}>
        <View style={s.wrapper}>
          <Text style={s.name}>Megan Rain</Text>
        </View>
        <View style={s.rowWrapper}>
          <Image style={s.locationImg} source={LocationImg} />
          <Text style={s.locationText}>Los Angeles</Text>
        </View>
        <View style={s.wrapper}>
          <Tab {...tabProps} action={getActiveTab} />
        </View>
        <View style={s.wrapper}>
          <Text style={{color: '#fff'}}>
            {activeTab === tabProps.tab1
              ? 'SOME CONTENT'
              : 'ANOTHER CONTENT!!!!!'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#141F25',
  },
  wrapper: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowWrapper: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  background: {
    height: 180,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    resizeMode: 'cover',
  },
  avatar: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImg: {
    width: 150,
    height: 150,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: '#fff',
  },
  content: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    marginTop: 230,
  },
  name: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 20,
    color: '#fff',
  },
  locationImg: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
    marginRight: 5,
  },
  locationText: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 18,
    color: '#fff',
  },
});
