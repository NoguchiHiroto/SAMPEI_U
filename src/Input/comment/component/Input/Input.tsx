import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../../store/store';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import styles from './styles';
import { changeInputComment } from '../../../../slices/tempSlice';
export const Input = ({ state }: any) => {
  const dispatch = useDispatch();
  const inputComment = useSelector((state) => state.temp.inputComment);
  const inputRef = useRef<TextInput>(null);
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        placeholder='ここをタップして記入してください'
        ref={inputRef}
        value={inputComment}
        style={styles.input}
        onChange={(e) => {dispatch(changeInputComment(e.nativeEvent.text))}}
        onFocus={() => state.setIsFocused(true)}
        onBlur={() => state.setIsFocused(false)}
        keyboardType='default'
      />
    </View>
  )
}