import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../../misc/Button/Button';
import Changer from '../../misc/Changer/Changer';
import {axiosGet, axiosPost} from '../../hooks/useAxios';
import {getItem, setItem} from '../../hooks/useAsyncStorage';
import {activitiesPath, updateCurrentActivityPath} from '../../api/routes';
import {getHeadersWithToken} from '../../hooks/useApiData';

const ChooseActivity = () => {
  const navigation = useNavigation();

  const [activitiesData, setActivitiesData] = useState([]);
  const [currentActivity, setCurrentActivity] = useState(null);

  const stackNavigate = (route) => {
    navigation.navigate(route);
  };

  const getActivities = async () => {
    const profileData = await getItem('profile');
    const parsedData = JSON.parse(profileData);

    const request = await axiosGet(activitiesPath);
    setActivitiesData(request);
    await getProfileActivity(parsedData);
    // filterUserActivities(request);
  };

  // const filterUserActivities = async (arr) => {
  //   let initialActivitiesArr = [];
  //   const profileData = await getItem('profile');
  //   const parsedData = JSON.parse(profileData);
  //   const activities = parsedData.activities;

  //   for (let i = 0; i < activities.length; i++) {
  //     const activitiesItem = activities[i];
  //     const findedActivity = arr.find(
  //       (item) => item.activity_id === activitiesItem,
  //     );
  //     initialActivitiesArr.push(findedActivity);
  //   }
  //   setActivitiesData(initialActivitiesArr);
  //   await getProfileActivity(parsedData);
  // };

  const getProfileActivity = async (data) => {
    setCurrentActivity(data.profile_current_act);
  };

  const currentActivityRequest = async () => {
    const headers = await getHeadersWithToken('urlencoded');

    let postData = new URLSearchParams();
    postData.append('profile_current_act', currentActivity);

    const request = await axiosPost(
      updateCurrentActivityPath,
      postData,
      headers,
    );
    console.log('request', request);

    await setItem('current_activity', currentActivity);
    await saveCurrentActivity();
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
    getActivities();
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
