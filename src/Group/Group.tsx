import React, {useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, Image } from 'react-native';
import { StyleSheetProperties, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from '../store/store';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import userIcon from './component/icon/userIcon';
import { URL } from '../common/variables';
import RNFetchBlob from 'rn-fetch-blob';

// Detailsスクリーンのコンポーネント

const Group: React.FC = () => {
  const [profileImgs, setProfileImgs] = useState<any>({});
  useEffect(() => {
    console.log('use!')
    fetch(URL.getProfileImgs)
    .then(response => {
      // console.log("RESPONSE", response);
      return response.json()
    })
    .then((Imgs:any) => {
      console.log("IMGs")
      setProfileImgs(Imgs);
    })
  }, []);
  const GroupStyles = StyleSheet.create({
    container: {
    },
    Table: {
      width: '100%',
      borderWidth: 0,
    }
  });
  const ImageSize = 35; // プロフィール画像のサイズ
  const tableHead = ['記入状況', '本日の検温'];
  const tableData = [];
  Object.keys(profileImgs).forEach((key) => {
    const data = [<Image source={{uri: profileImgs[key]}} style={{width: ImageSize, height:ImageSize, borderRadius: ImageSize / 2}} />, 1, 2];
    tableData.push(data);
  })
  console.log(tableData[0]);
  return (
    <View style={GroupStyles.container}>
      <Table style={GroupStyles.Table}>
        <Row data={tableHead} />
        <Rows data={tableData} style={{marginTop: 20}}/>
      </Table>
    </View>
  )
}

export default Group;