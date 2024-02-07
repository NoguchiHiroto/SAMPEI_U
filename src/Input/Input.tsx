import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button } from 'react-native';
import { StyleSheetProperties } from 'react-native';
import HomeStyles from './Input_styles';
import Header from  './../Header/Header'
import SwipeNumberInput from './SwipeNumberInput/SwipeNumberInput';
import SelectIsSymptoms from './SelectSymptoms/SelectIsSymptoms/SelectIsSymptoms';
import SelectSymptoms from './SelectSymptoms/SelectSymptoms/SelectSymptoms';
import Comment from './comment/Comment';
// Homeスクリーンのコンポーネント
const Input: React.FC = ({ navigation }: any) => (
  
  <View style={ HomeStyles.container }>
    <SwipeNumberInput />
    <SelectIsSymptoms />
    <SelectSymptoms />
    <Comment />
  </View>
);

export default Input;

