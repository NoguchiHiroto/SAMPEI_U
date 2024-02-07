import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Input from '../../Input/Input';
import Graph from '../../Graph/Graph';
import Footer from '../../Footer/Footer';
const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Input" component={Input} />
      <Drawer.Screen name="Graph" component={Graph} />
      {/* <Drawer.Screen name="Tabs" component={Footer} /> */}
    </Drawer.Navigator>
  );
}

export default DrawerMenu;