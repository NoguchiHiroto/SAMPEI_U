import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button } from 'react-native';
import { StyleSheetProperties } from 'react-native';
import GroupStyles from './Group_styles';

// Detailsスクリーンのコンポーネント
const Group: React.FC = () => {
  return (
    <View style={GroupStyles.container}>
      <Text>グループとコメントを表示</Text>
    </View>
  )
}

export default Group