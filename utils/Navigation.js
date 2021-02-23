import React from 'react';
import {Image, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
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
import SavedLocations from '../screens/SavedLocations/SavedLocations';
import Cities from '../screens/Cities/Cities';
import Leaderboard from '../screens/Leaderboard/Leaderboard';
import MessageIcon from '../assets/icons/Ic-Message2.png';
import PersonIcon from '../assets/icons/Ic-Profile-menu.png';
import FriendsIcon from '../assets/icons/Ic-User.png';
import SavedIcon from '../assets/icons/Ic-Star.png';
import LocationIcon from '../assets/icons/ic-Location-menu.png';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const iconStyle = {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  };

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
          drawerLabel: 'Friends',
          drawerIcon: () => <Image style={iconStyle} source={FriendsIcon} />,
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
        name="SavedLocations"
        component={SavedLocations}
        options={{
          drawerLabel: 'Saved',
          drawerIcon: () => <Image style={iconStyle} source={SavedIcon} />,
        }}
      />
      <Drawer.Screen name="Main" component={Main} />
      <Drawer.Screen name="Cities" component={Cities} />
      <Drawer.Screen name="Leaderboard" component={Leaderboard} />
    </Drawer.Navigator>
  );
};

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="PrivacyBubble" component={PrivacyBubble} />
      <Stack.Screen name="ChooseActivity" component={ChooseActivity} />
      <Stack.Screen name="Root" component={DrawerNavigator} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Dialog" component={Dialog} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
