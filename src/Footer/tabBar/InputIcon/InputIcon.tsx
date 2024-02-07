import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, Image } from 'react-native';
import { StyleSheetProperties } from 'react-native';
import inputImage from './../../img/input.png'
import inputImage_active from './../../img/input_active.png'

const InputIcon = (props:any) => {
  const source = props.fucused ? inputImage_active: inputImage;
  return (
    <View>
      <Image source={source} style = {{ width: 30, height: 30 }}/>
    </View>
  )
}

export default InputIcon;