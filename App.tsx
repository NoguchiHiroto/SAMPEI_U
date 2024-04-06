import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, SafeAreaView } from 'react-native';
import { StyleSheetProperties } from 'react-native';
import Header from './src/Header/Header';

import Footer from './src/Footer/Footer';
import DrawerMenu from './src/Header/Menu/DrawerMenu';
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBfY0SZjHRg64G4cPP0pQu_jiTbDlPm_qw",
  projectId: "ondu-ee7db",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
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
