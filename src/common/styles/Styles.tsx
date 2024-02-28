import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { StyleSheetProperties } from 'react-native';


export interface Styles {
  container: ViewStyle;
  inputState? : ViewStyle;
  todayTemp? : ViewStyle;
  text: TextStyle;
}

export const themeColor =  'rgba(255,119,191,1)';


