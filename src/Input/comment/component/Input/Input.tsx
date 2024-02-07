import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import styles from './styles';
import { changeComment } from '../../../../slices/tempSlice';
export const Input = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        placeholder='ここをタップして記入してください'
        style={styles.input}
        onChangeText={(comment) => dispatch(changeComment(comment))}
      />
    </View>
  )
}