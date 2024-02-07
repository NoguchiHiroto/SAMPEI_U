import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button } from 'react-native';
import { StyleSheetProperties } from 'react-native';


const GraphOptions = (props:any) => ({ 
  title: 'グラフ',
  headerShown: false,
});

export default GraphOptions;