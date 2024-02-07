import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../../store/store';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import styles from './styles';
import { TouchableHighlight, GestureHandlerRootView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
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
  const comment =  useSelector((state) => state.temp.comment);
  const sendData = () => {
    const body = new FormData();
    const now = moment();
    const year = now.year();
    const month = now.month() + 1;
    const date = now.date();
    const hour = now.hour();
    const minute = now.minute();
    body.append('comment', comment);
    body.append('year', year);
    body.append('month', month);
    body.append('date', date);
    body.append('hour', hour);
    body.append('minute', minute);
    body.append('userName', userName);
    body.append('userID', 12345);
    console.log('body:',body);
    console.log('comment:',comment);
    fetch('http://127.0.0.1:8000/api/setData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    }).then((res) => res.json()).then(value => console.log(value))
    // getData().then(value => console.log(value))
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