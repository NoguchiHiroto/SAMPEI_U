import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { StyleSheetProperties } from 'react-native';
import { Styles } from '../common/styles/Styles';
const InputStyles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 16,
    color: 'black',
  }
})

export default InputStyles; 