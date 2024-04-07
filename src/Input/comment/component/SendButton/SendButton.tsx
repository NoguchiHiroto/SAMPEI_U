import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../../store/store';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import styles from './styles';
import { TouchableHighlight, GestureHandlerRootView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { getMoment } from '../../../../common/getMoment';
import { URL } from '../../../../common/variables';
import postComment from '../../../../common/api/postComment';
interface Body extends FormData {
  comment: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  userName: string;
  userID: number;
}
export const SendButton = () => {
  const userName = useSelector((state) => state.temp.userName);
  const comment =  useSelector((state) => state.temp.inputComment);
  const sendData = () => {
    const body = {
      comment: comment,
      userName: userName,
      userID: 12345,
    }
    postComment(body)
    .then(value => console.log(value));
  }
  return (
    <LinearGradient
      colors={['rgba(255,32,144,1)', 'rgba(255,19,191,1)']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={{
        marginHorizontal: '5%',
        height: '25%',
        width: '90%',
      }}
      >
      <GestureHandlerRootView>
        <TouchableHighlight onPress={() => sendData()} underlayColor="gray" style={styles.button}>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>登録</Text>
          </View>
        </TouchableHighlight>
      </GestureHandlerRootView>
    </LinearGradient>
  )
}