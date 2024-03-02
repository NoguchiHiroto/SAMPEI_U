import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { StyleSheetProperties } from 'react-native';
import { Styles } from '../common/styles/Styles';

const GroupStyles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 16,
    color: 'black',
  }
})

export default GroupStyles;