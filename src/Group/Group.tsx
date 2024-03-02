import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button } from 'react-native';
import { StyleSheetProperties, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from '../store/store';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
// Detailsスクリーンのコンポーネント
const Group: React.FC = () => {
  console.log(useSelector(state => state));
  // console.log('asdasd');
  const GroupStyles = StyleSheet.create({
    container: {

    },
    Table: {
      width: '100%',
      borderWidth: 0,
    }
  })
  
  const tableHead = ['記入状況', '本日の体温'];
  const tableData = [
    ['1', '2', '3'],
    ['a', 'b', 'c'],
    ['1', '2', '3'],
    ['a', 'b', 'c']
  ];
  return (
    <View style={GroupStyles.container}>
      <Table style={GroupStyles.Table}>
        <Row data={tableHead} />
        <Rows data={tableData} />
      </Table>
    </View>
  )
}

export default Group;