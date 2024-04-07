import React, {ReactNode, useState, useEffect, useRef} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput } from 'react-native';
import { StyleSheetProperties } from 'react-native';
import HomeStyles from './Input_styles';
import Header from  './../Header/Header'
import SwipeNumberInput from './SwipeNumberInput/SwipeNumberInput';
import SelectIsSymptoms from './SelectSymptoms/SelectIsSymptoms/SelectIsSymptoms';
import SelectSymptoms from './SelectSymptoms/SelectSymptoms/SelectSymptoms';
import Comment from './comment/Comment';
interface DismissKeyboardViewProps {
  children: ReactNode;
}

const DismissKeyboardView:  React.FC<DismissKeyboardViewProps> = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);


const _handleKeyboardDidHide = () => {
  // キーボードが閉じたときに実行したい処理
  console.log('Keyboard is hidden');
  Keyboard.dismiss()
};
// Homeスクリーンのコンポーネント
const Input: React.FC = ({ navigation }: any) => {
  
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _handleKeyboardDidHide,
    );
  
    // コンポーネントのクリーンアップ時にリスナーを削除
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <ScrollView>
      <DismissKeyboardView>
        <View style={ HomeStyles.container }>
          <SwipeNumberInput />
          <SelectIsSymptoms state={{isFocused, setIsFocused}} />
          <SelectSymptoms state={{isFocused, setIsFocused}}/>
          <Comment state={{isFocused, setIsFocused}} />
        </View>
      </DismissKeyboardView>
    </ScrollView>
  )};

export default Input;

