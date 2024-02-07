import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button } from 'react-native';
import { StyleSheetProperties } from 'react-native';
import GraphStyles from './Graph_style';

// Detailsスクリーンのコンポーネント
const Graph: React.FC = () => {
  return (
    <View style={GraphStyles.container}>
      <Text>1週間分の体温のグラフを表示</Text>
    </View>
  )
}

export default Graph