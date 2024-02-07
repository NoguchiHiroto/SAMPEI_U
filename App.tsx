import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, SafeAreaView } from 'react-native';
import { StyleSheetProperties } from 'react-native';
import Header from './src/Header/Header';

import Footer from './src/Footer/Footer';
import DrawerMenu from './src/Header/Menu/DrawerMenu';

// スクリーンのパラメータを定義する型

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

// スタックナビゲーターの作成と型の指定
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <Header />
      <NavigationContainer>
        <Footer />
        {/* <DrawerMenu /> */}
      </NavigationContainer>
    </SafeAreaView>
  );
}
