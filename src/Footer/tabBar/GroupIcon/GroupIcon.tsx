import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, Image } from 'react-native';
import { StyleSheetProperties } from 'react-native';
import GroupImage from './../../img/group.png'
import GroupImage_active from './../../img/group_active.png'

const GroupIcon = (props:any) => {
  const source = props.fucused ? GroupImage_active: GroupImage;
  return (
    <View>
      <Image source={source} style = {{ width: 30, height: 30 }}/>
    </View>
  )
}

export default GroupIcon;