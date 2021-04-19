import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {
  NavigationContainer,
  useNavigationState,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Geolocation from '@react-native-community/geolocation';
import Login from '../screens/Login/Login';
import SignUp from '../screens/SignUp/SignUp';
import Registration from '../screens/Registration/Registration';
import PrivacyBubble from '../screens/PrivacyBubble/PrivacyBubble';
import ChooseActivity from '../screens/ChooseActivity/ChooseActivity';
import Main from '../screens/Main/Main';
import Profile from '../screens/Profile/Profile';
import Messages from '../screens/Messages/Messages';
import Dialog from '../screens/Dialog/Dialog';
import Friends from '../screens/Friends/Friends';
import Locations from '../screens/Locations/Locations';
import FilteredLocations from '../screens/FilteredLocations/FilteredLocations';
import Cities from '../screens/Cities/Cities';
import CheckOut from '../screens/CheckOut/CheckOut';
import MessageIcon from '../assets/icons/Ic-Message2.png';
import PersonIcon from '../assets/icons/Ic-Profile-menu.png';
import FriendsIcon from '../assets/icons/Ic-User.png';
import SavedIcon from '../assets/icons/Ic-Star.png';
import BookmarkIcon from '../assets/icons/bookmark.png';
import ElipseIcon from '../assets/icons/ellipse.png';
import LocationIcon from '../assets/icons/ic-Location-menu.png';
import Settings from '../screens/Settings/Settings';
import Start from '../screens/Start/Start';
import {getAccessToken} from '../hooks/useAccessToken';
import {getItem} from '../hooks/useAsyncStorage';
import {calculateByCoordinates} from '../hooks/useDistanceCalculator';
import {socketUrl} from '../api/api';
import {privacyBubbleData} from '../data';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const iconStyle = {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  };

  const connectToSocket = async () => {
    const token = await getAccessToken();

    let conn = new WebSocket(`${socketUrl}${token}`);
    console.log('connectingInNavigator');

    Geolocation.getCurrentPosition(async (geolocation) => {
      const location = [
        geolocation.coords.longitude,
        geolocation.coords.latitude,
      ];

      const profile = await getItem('profile');
      const parsedProfile = JSON.parse(profile);
      const privacyBubble = parsedProfile.profile_privacy_buble;
      const parsedPrivacyBubble = JSON.parse(privacyBubble);
      const distance = calculateByCoordinates(location, parsedPrivacyBubble);
      const distanceInMiles = distance * 0.621371192;

      const timeStamp = +new Date();
      const formatedTimeStamp = timeStamp / 1000;
      const stringedTimeStamp = JSON.stringify(formatedTimeStamp);
      const stringedUserLocation = JSON.stringify(location);
      const obj = {
        my_cur_loc: stringedUserLocation,
        msg_timestamp_sent: stringedTimeStamp,
      };
      const stringed = JSON.stringify(obj);

      if (distanceInMiles > privacyBubbleData.distance) {
        conn.onopen = (e) => {
          conn.send(stringed);
          console.log('onopenInNavigator');
        };
      }
    });
  };

  useEffect(() => {
    connectToSocket();
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerStyle={{backgroundColor: '#F18303', opacity: 0.9}}
      drawerContentOptions={{
        labelStyle: {
          fontFamily: 'Gilroy-SemiBold',
          fontSize: 18,
          color: '#141F25',
        },
        activeBackgroundColor: '#FAC978',
        itemStyle: {marginVertical: 5},
      }}>
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerLabel: 'My profile',
          drawerIcon: () => <Image style={iconStyle} source={PersonIcon} />,
        }}
      />
      <Drawer.Screen
        name="Messages"
        component={Messages}
        options={{
          drawerLabel: 'Messages',
          drawerIcon: () => <Image style={iconStyle} source={MessageIcon} />,
        }}
      />
      <Drawer.Screen
        name="Friends"
        component={Friends}
        options={{
          drawerLabel: 'Teammates',
          drawerIcon: () => <Image style={iconStyle} source={FriendsIcon} />,
        }}
      />
      <Drawer.Screen
        name="Cities"
        component={Cities}
        options={{
          drawerLabel: 'Rankings',
          drawerIcon: () => <Image style={iconStyle} source={SavedIcon} />,
        }}
      />
      <Drawer.Screen
        name="FilteredLocations"
        component={FilteredLocations}
        options={{
          drawerLabel: 'Saved',
          drawerIcon: () => <Image style={iconStyle} source={BookmarkIcon} />,
        }}
      />
      <Drawer.Screen
        name="Locations"
        component={Locations}
        options={{
          drawerLabel: 'Locations',
          drawerIcon: () => <Image style={iconStyle} source={LocationIcon} />,
        }}
      />
      <Drawer.Screen
        name="Main"
        component={Main}
        options={{
          drawerLabel: 'DOTZ',
          drawerIcon: () => <Image style={iconStyle} source={ElipseIcon} />,
        }}
      />
    </Drawer.Navigator>
  );
};

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Start"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="PrivacyBubble" component={PrivacyBubble} />
      <Stack.Screen name="ChooseActivity" component={ChooseActivity} />
      <Stack.Screen name="Root" component={DrawerNavigator} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Locations" component={Locations} />
      <Stack.Screen name="Dialog" component={Dialog} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="CheckOut" component={CheckOut} />
      <Stack.Screen name="FilteredLocations" component={FilteredLocations} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
