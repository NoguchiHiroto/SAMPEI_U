import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MenuImage from './Menu.png';
import Logo from './Logo_after.png'
import ProfileIcon from './ProfileIcon/ProfileIcon';
const Header = () => {
  	
  const { width, height, scale } = Dimensions.get('window');
  const HeaderHeight = height / 10;
  const MenuIconSize = 35;
  return (
    <LinearGradient 
      colors={['rgba(249,190,107,1)', 'rgba(255,119,191,1)']} 
      start={{x: 0.0, y: 1}} 
      end={{x: 1, y: 1}}
      style={{height: HeaderHeight}}
      >
        <View style={{display: 'flex',  justifyContent: 'center', flex: 1, marginLeft: 20}}>
          <Image source={ MenuImage } style={{width: MenuIconSize, height: MenuIconSize, margin: 'auto'}}/>
        </View>
        <View style={{position: 'absolute',marginLeft: ((width - 100) / 2), alignItems: 'center'}}>
          <Image source={ Logo } style={{width: 100, height:60, marginTop: ((HeaderHeight) - 50) / 2}}/>
        </View>
        <View style={{position: 'absolute', marginLeft: (width - 55), marginTop: (HeaderHeight - 40) / 2}}>
          <ProfileIcon/>
        </View>
          
    </LinearGradient>
    
  ) 
}

export default Header;