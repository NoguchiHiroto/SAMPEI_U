import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import { TouchableHighlight, GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './styles';

export const Title = () => {
  return (
    <View>
      <Text style={styles.titleText}>メッセージ</Text>
    </View>
  )
}