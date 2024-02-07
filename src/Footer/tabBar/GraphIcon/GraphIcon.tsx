import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, Image } from 'react-native';
import { StyleSheetProperties } from 'react-native';
import GraphImage from './../../img/graph.png'
import GraphImage_active from './../../img/graph_active.png'

const GraphIcon = (props:any) => {
  const source = props.fucused ? GraphImage_active: GraphImage;
  return (
    <View>
      <Image source={source} style = {{ width: 30, height: 30 }}/>
    </View>
  )
}

export default GraphIcon;