import React from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import graphImage from './img/graph.png';
import inputImage from './img/input.png';
import groupImage from './img/group.png';
import inputImage_active from './img/input_active.png';
import tabBarIcon from './tabBar/tabBarIcon';
import InputIcon from './tabBar/InputIcon/InputIcon';
import GraphIcon from './tabBar/GraphIcon/GraphIcon';
import GroupIcon from './tabBar/GroupIcon/GroupIcon';
import LinearGradient from 'react-native-linear-gradient';
import { RouteProp, ParamListBase } from '@react-navigation/native';
type TabParamList = {
  Input: undefined; // 他のパラメータがある場合はここに追加
  Graph: undefined;
  Group: undefined;
};
const screenOptions = ({ route, navigation }: {route: RouteProp<ParamListBase, string>; navigation: any}) => {
  return ({
    tabBarIcon: ({focused, color, size}:any) => {
      let iconName = null;
      if (route.name === 'Input') {
        return <InputIcon fucused={focused}/>
      } else if (route.name === 'Graph') {
        return <GraphIcon fucused={focused} />
      } else if (route.name === 'Group') {
        return <GroupIcon fucused={focused} />
      }
    },
    tabBarActiveTintColor: '#C819C8',
    tabBarInactiveTintColor: 'gray',
    labelStyle: { fontSize: 12 },
    tabBarStyle: { backgroundColor: '#ffffff' },
    headerBackground: () => (
      <LinearGradient 
        colors={['rgba(0,0,107,1)', 'rgba(255,119,191,1)']} 
        start={{x: 0.0, y: 1}} 
        end={{x: 1, y: 1}} 
      />
      // <View style={{backgroundColor: 'green'}}>
      //   <Text>TTT</Text>
      // </View>
    ),
  })
}


export default screenOptions;