import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Input from '../Input/Input';
import Graph from '../Graph/Graph';
import Group from '../Group/Group';
import screenOptions from './screenOptions';
import InputOptions from '../Input/InputOptions';
import DrawerMenu from '../Header/Menu/DrawerMenu';
import { Text, View, Button, Image, Dimensions } from 'react-native';
import GraphOptions from '../Graph/GraphOptions';
import GroupOptions from '../Group/GroupOptions';

const BottomTab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

const Footer = () => {
  return (
      <BottomTab.Navigator screenOptions = {screenOptions}>
        <BottomTab.Screen name="Input" component={Input} options={InputOptions}/>
        <BottomTab.Screen name="Graph" component={Graph} options={GraphOptions}/>
        <BottomTab.Screen name="Group" component={Group} options={GroupOptions}/>
        {/* <BottomTab.Screen name="Groud" component={Group} /> */}
        {/* <BottomTab.Screen name="Group" component={DrawerMenu} /> */}
      </BottomTab.Navigator>
  )
}

export default Footer;