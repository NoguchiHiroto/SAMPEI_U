import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button } from 'react-native';
import { StyleSheetProperties } from 'react-native';
import GroupStyles from './Group_styles';
import { Table, Row, Rows } from 'react-native-table-component';


// Detailsスクリーンのコンポーネント
const Group: React.FC = () => {
 
const tableHead = ['記入状況', '本日の体温'];
const tableData = [
  ['1', '2', '3', '4'],
  ['a', 'b', 'c', 'd'],
  ['1', '2', '3', '456\n789'],
  ['a', 'b', 'c', 'd']
];
  
  return (
    <View style={GroupStyles.container}>
      <Table borderStyle={{borderWidth: 1}}>
        <Row data={tableHead} />
        <Rows data={tableData} />
      </Table>
    </View>
    
  )
}

export default Group