import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button } from 'react-native';
import { StyleSheetProperties } from 'react-native';
import GroupStyles from './GroupTableHeader_style';

// Detailsスクリーンのコンポーネント
const GroupTableHeader: React.FC = () => {
  
  return (
    <View style={GroupStyles.container}>
      {/* <Text>グループとコメントを表示</Text> */}
      <View style={GroupStyles.inputState}><Text>記入状況</Text></View>
      <View style={GroupStyles.todayTemp}><Text>本日の体温</Text></View>
    </View>
  )
}

export default GroupTableHeader;