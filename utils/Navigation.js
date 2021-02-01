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

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      // initialRouteName="Profile"
      drawerStyle={{backgroundColor: '#141F25'}}
      drawerContentOptions={{
        labelStyle: {
          marginLeft: 10,
          fontFamily: 'Gilroy-SemiBold',
          fontSize: 18,
          color: '#fff',
        },
        activeBackgroundColor: '#212E36',
        itemStyle: {marginVertical: 5},
      }}>
      <Drawer.Screen name="Main" component={Main} />
      <Drawer.Screen name="Profile" component={Profile} />
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
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
