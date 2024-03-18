import React from 'react'
import { useEffect } from 'react';
import { View, Image, Text, StyleSheet, ImageSourcePropType } from 'react-native';
import { URL } from '../../../common/variables';
interface Props {
  src: ImageSourcePropType;
}

const userIconStyle = StyleSheet.create({
  userIcon: {
    width: 10,
    height: 10,
    opacity: 1,
    borderRadius: 25,
  }
});

const userIcon = (props: Props) => {
  return (
    <Image source={props.src} style={userIconStyle.userIcon} />
  )
}

export default userIcon;
