import React from 'react';
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

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      // initialRouteName="Main"
      drawerStyle={{backgroundColor: '#F18303', opacity: 0.9}}
      drawerContentOptions={{
        labelStyle: {
          marginLeft: 10,
          fontFamily: 'Gilroy-SemiBold',
          fontSize: 18,
          color: '#141F25',
        },
        activeBackgroundColor: '#FAC978',
        itemStyle: {marginVertical: 5},
      }}>
      <Drawer.Screen name="Main" component={Main} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Messages" component={Messages} />
      <Drawer.Screen name="Friends" component={Friends} />
      <Drawer.Screen name="SavedLocations" component={SavedLocations} />
      <Drawer.Screen name="Locations" component={Locations} />
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
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
