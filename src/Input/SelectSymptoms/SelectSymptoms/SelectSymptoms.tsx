import React, { useState } from 'react';
import { useSelector } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { changeSymptoms } from '../../../slices/tempSlice';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './styles';
import { symptomsList } from '../../../common/variables';
import { AppState } from '../../../states/AppState';
import clone from 'clone';

const isIncludeSymptomsList = (symptomsState: AppState['symptoms'], symptom: string) => {
  for (let i = 0; i < symptomsState.length; i++) {
    if (symptomsState[i].includes(symptom)) {
      return true;
    }
  }
  return false;
};

const SelectSymptoms = () => {
  const dispatch = useDispatch();
  const isSymptoms = useSelector((state) => state.temp.isSymptoms);
  const symptoms = useSelector((state) => state.temp.symptoms);
  console.log(symptoms);
  const onPress = (symptomsState:AppState['symptoms'] ,index:number, i:number) => {
    return (
      () => {
        const newSymptomsState = clone(symptomsState);

        if (isIncludeSymptomsList(symptomsState,symptomsList[index][i])) {
          newSymptomsState[index][i] = '';
        } else {
          newSymptomsState[index][i] = symptomsList[index][i];
        };
        return dispatch(changeSymptoms(newSymptomsState));
      }
    )
  }
  console.log(symptoms)
  return (
    <View style={isSymptoms ? styles.container : {display: 'none'}}>
      {/* 3列で症状を表示 */}
      {symptomsList.map((symptom_3, index) => (
        <View style={styles.buttonWrapper} key={index}>
          {symptom_3.map((symptom, i)  => (
            <TouchableOpacity style={isIncludeSymptomsList(symptoms,symptom) ? styles.selectedButton : styles.button} onPress={onPress(symptoms, index, i)} key={symptomsList[index][i]}>
              <Text style={isIncludeSymptomsList(symptoms, symptom) === true ? styles.selectedButton.Text : styles.button.Text}>{symptomsList[index][i]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}      
    </View>
  )
}

export default SelectSymptoms