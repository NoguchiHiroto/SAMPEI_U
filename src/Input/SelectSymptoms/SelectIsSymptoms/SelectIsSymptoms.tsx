import React, { useState } from 'react';
import { useSelector } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { changeIsSymptoms } from '../../../slices/tempSlice';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './styles';

const SelectIsSymptoms = () => {
  const isSymptom = useSelector((state) => state.temp.isSymptoms);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.ttlText}>本日の症状</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={isSymptom === true ? styles.selectedButton : styles.button} onPress={() => dispatch(changeIsSymptoms(true))}>
          <Text style={isSymptom === true ? styles.Text__white : styles.Text__black}>あり</Text>
        </TouchableOpacity>
        <TouchableOpacity style={isSymptom === false ? styles.selectedButton : styles.button} onPress={() => dispatch(changeIsSymptoms(false))}>
          <Text style={isSymptom === false ? styles.Text__white : styles.Text__black}>なし</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


export default SelectIsSymptoms;