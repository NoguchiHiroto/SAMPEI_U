import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, SafeAreaView } from 'react-native';
import { StyleSheetProperties } from 'react-native';
import Header from './src/Header/Header';
import DeviceInfo from 'react-native-device-info';
import Footer from './src/Footer/Footer';
import DrawerMenu from './src/Header/Menu/DrawerMenu';
import firebase from '@react-native-firebase/app';

// const firebaseConfig = {
//   apiKey: "AIzaSyBfY0SZjHRg64G4cPP0pQu_jiTbDlPm_qw",
//   projectId: "ondu-ee7db",
//   // messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "1:610582804749:android:422787ce8e914ffe72d844",
//   measurementId: "YOUR_MEASUREMENT_ID"
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
// スクリーンのパラメータを定義する型

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

// スタックナビゲーターの作成と型の指定
const Stack = createStackNavigator<RootStackParamList>();
// AndroidのIMEIまたはiOSのIDFAを取得
const uniqueId = DeviceInfo.getUniqueId();


export default function App() {
  return (
    <SafeAreaView style={{height: '100%', flex: 1}}>
      <Header />
      <NavigationContainer>
        <Footer />
        {/* <DrawerMenu /> */}
      </NavigationContainer>
    </SafeAreaView>
  );
}
