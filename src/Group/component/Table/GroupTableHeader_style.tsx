import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { StyleSheetProperties } from 'react-native';
import { Styles } from '../common/styles/Styles';

const GroupStyles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    
    flex: 1,
    justifyContent: 'space-between',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  inputState: {
    // それぞれの列のスペースを確認するときにはONにする
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: 'blue',
    flex: 2,
    width: '50%',
  },
  todayTemp: {
    // それぞれの列のスペースを確認するときにはONにする
    // borderColor: 'white',
    // borderWidth: 3,
    // backgroundColor: 'blue',
    flex: 3,
    width: '50%',
  },
  text: {
    fontSize: 16,
    color: 'black',
  }
})

export default GroupStyles;