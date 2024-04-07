import React, { useState } from 'react';
import { useSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import styles from './styles';

import { Title } from './component/Title/Title';
import { Input } from './component/Input/Input';
import { SendButton } from './component/SendButton/SendButton';
const Comment = ({ state }: any) => {
  const isSymptom = useSelector((state) => state.temp.isSymptoms);
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.temp.comment);

  return (
    
    <View style={styles.container}>
      <Title />
      <Input state={state} />
      <SendButton />
    </View>
  );
}


export default Comment;