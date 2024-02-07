import React from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
// import graphImage from './img/graph.png';
// import inputImage from './img/input.png';
// import groupImage from './img/group.png';
import inputImage_active from './img/input_active.png';
import GraphIcon from './GraphIcon/GraphIcon';

const tabBarIcon = (route) => {
  const initName = 'accessibility';
  let icon;
  if (route.name === 'Input') {
    return GraphIcon;
  } else if (route.name === 'Graph') {
    icon = focused ? 'accessibility' : graphImage;
  } else if (route.name === 'Group') {
    icon = focused ? 'accessibility' : groupImage;
  } else {
    icon = initName;
  }
  iconNameがnullでなければIoniconsを描画する
  return (    
  <View>
    <Image source={icon} style={{ width: 30, height: 30 }} />
  </View>
  )
}

export default tabBarIcon;