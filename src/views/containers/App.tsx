import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, SafeAreaView } from 'react-native';
import { StyleSheetProperties } from 'react-native';
import Header from './../../Header/Header'
import Footer from './../../Footer/Footer';
import DrawerMenu from './../../Header/Menu/DrawerMenu';


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
