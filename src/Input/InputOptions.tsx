import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button } from 'react-native';
import { StyleSheetProperties } from 'react-native';

const InputOptions = ( props:any ) => ({
  title: '入力',
  headerStyle: {
    backgroundColor: '#001100',
    height: 0,
  },
});

export default InputOptions;