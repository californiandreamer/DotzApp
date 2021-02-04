import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {useNavigation} from '@react-navigation/native';
import Tab from '../../misc/Tab/Tab';
import Header from '../../misc/Header/Header';
import Button from '../../misc/Button/Button';
import Changer from '../../misc/Changer/Changer';
import GradientImg from '../../assets/images/gradient.jpg';
import AvatarImg from '../../assets/images/girl.jpg';
import DotImg from '../../assets/icons/ic-likeOn.png';
import SettingsImg from '../../assets/icons/Ic-Setting.png';
import LocationImg from '../../assets/icons/ic-Location2.png';
import {mapBoxToken} from '../../api/api';

MapboxGL.setAccessToken(mapBoxToken);

const Profile = () => {
  const navigation = useNavigation();
  const tabProps = {
    tab1: 'Main info',
    tab2: 'Feed',
  };

  const [activeTab, setActiveTab] = useState(tabProps.tab1);

  const getActiveTab = (value) => {
    setActiveTab(value);
  };

  const stackNavigate = (route) => {
    navigation.navigate(route);
  };

  const renderMainInfo = (
    <View style={s.tabContent}>
      <Text style={s.title}>Current activity</Text>
      <Changer />
      <Text style={s.title}>All activities</Text>
      <Changer />
      <View style={s.wrapper}>
        <Text style={s.text}>Miles since registration: 14</Text>
      </View>
      <View style={s.wrapper}>
        <Text style={s.text}>Largest rideout: 21</Text>
      </View>
    </View>
  );

  const renderFeed = (
    <View style={s.tabContent}>
      <Text style={s.title}>Latests posts</Text>
      <View style={s.wrapper}>
        <Text style={s.text}>My best time on Random Route: 50s</Text>
      </View>
      <View style={s.wrapper}>
        <MapboxGL.MapView
          style={s.map}
          compassEnabled={false}
          attributionEnabled={false}
          logoEnabled={false}>
          <MapboxGL.Camera zoomLevel={12} followUserLocation />
          <MapboxGL.UserLocation />
        </MapboxGL.MapView>
      </View>
      <View style={s.dotWrapper}>
        <TouchableOpacity style={s.dotBtn} activeOpacity={0.8}>
          <Image style={s.dotImg} source={DotImg} />
          <Text style={s.dotText}>Dot it</Text>
        </TouchableOpacity>
        <Text style={s.dotCount}>1</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={s.container}>
      <Header
        title={'Profile'}
        icon={SettingsImg}
        action={() => stackNavigate('Registration')}
      />
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
          {activeTab === tabProps.tab1 ? renderMainInfo : renderFeed}
        </View>
        <View style={s.wrapper}>
          <Button text={'Add to friends'} style={'orange'} />
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
  tabContent: {
    width: '100%',
    paddingVertical: 16,
  },
  title: {
    width: '100%',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 24,
    color: '#fff',
  },
  text: {
    width: '100%',
    fontSize: 18,
    fontFamily: 'Gilroy-Regular',
    color: '#fff',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  dotWrapper: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dotBtn: {
    width: 42,
    height: 42,
  },
  dotImg: {
    width: 42,
    height: 42,
  },
  dotText: {
    width: 50,
    marginTop: 5,
    textTransform: 'uppercase',
    color: '#fff',
  },
  dotCount: {
    marginLeft: 5,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 32,
    color: '#fff',
  },
});
