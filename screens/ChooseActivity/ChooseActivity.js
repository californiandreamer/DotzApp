import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../../misc/Button/Button';
import Changer from '../../misc/Changer/Changer';
import {axiosGet, axiosPost} from '../../hooks/useAxios';
import {getAccessToken} from '../../hooks/useAccessToken';
import {activities} from '../../data';
import {getItem, setItem} from '../../hooks/useAsyncStorage';

const ChooseActivity = () => {
  const path = 'profiles/current_activity';
  const navigation = useNavigation();

  const [activitiesData, setActivitiesData] = useState([]);
  const [currentActivity, setCurrentActivity] = useState('1');

  const stackNavigate = (route) => {
    navigation.navigate(route);
  };

  const getProfileActivity = async () => {
    const profileData = await getItem('profile');
    const parsedData = JSON.parse(profileData);
    setCurrentActivity(parsedData.profile_current_act);
    getActivities();
  };

  const getActivities = async () => {
    const activitiesPath = 'activities?activities=[]';
    const request = await axiosGet(activitiesPath);
    setActivitiesData(request);
  };

  const currentActivityRequest = async () => {
    const token = await getAccessToken();
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    let postData = new URLSearchParams();
    postData.append('profile_current_act', currentActivity);

    await setItem('current_activity', currentActivity);

    const request = await axiosPost(path, postData, headers);

    saveCurrentActivity();

    stackNavigate('Root');
  };

  const saveCurrentActivity = async () => {
    const profileData = await getItem('profile');
    const parsedData = JSON.parse(profileData);
    parsedData.profile_current_act = currentActivity;
    const stringedData = JSON.stringify(parsedData);
    await setItem('profile', stringedData);
  };

  useEffect(() => {
    getProfileActivity();
  }, []);

  return (
    <ScrollView style={s.container}>
      <View style={s.wrapper}>
        <Text style={s.title}>Welcome!</Text>
      </View>
      <View style={s.wrapper}>
        <Text style={s.text}>Choose your current activity</Text>
      </View>
      <View style={s.wrapper}>
        <Changer
          activities={activitiesData}
          currentActivity={currentActivity}
          action={(activity) => setCurrentActivity(activity)}
        />
      </View>
      <View style={s.wrapper}>
        <Button
          text={'Start'}
          style={'orange'}
          action={() => currentActivityRequest()}
        />
      </View>
    </ScrollView>
  );
};

export default ChooseActivity;

const innerWidth = Dimensions.get('screen').width;
const smallScreen = innerWidth < 350;

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    backgroundColor: '#141F25',
  },
  wrapper: {
    paddingVertical: 10,
  },
  title: {
    marginTop: 16,
    fontFamily: 'Gilroy-Regular',
    textTransform: 'uppercase',
    fontSize: smallScreen ? 14 : 18,
    color: '#F0FCFF',
  },
  text: {
    width: '80%',
    fontFamily: 'Gilroy-SemiBold',
    textTransform: 'uppercase',
    fontSize: smallScreen ? 22 : 28,
    lineHeight: 35,
    color: '#F0FCFF',
  },
});
