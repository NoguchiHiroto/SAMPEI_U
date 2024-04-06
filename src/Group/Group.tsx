import React, {useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, Image } from 'react-native';
import { StyleSheetProperties, StyleSheet, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from '../store/store';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import { URL } from '../common/variables';
import GroupStyles from './styles';
import { getMoment } from '../common/getMoment';
import firestore from '@react-native-firebase/firestore';

function fetchData() {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        // console.log('EEEEEEEEEEE')
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          console.log('data',Object.keys(data))
          console.log('data',data.userName)
          // console.log('Documrent ID: ', documentSnapshot.id, documentSnapshot.data());
          resolve('OK');
        });
      }).catch((err:any) => {
        console.log('error', err)
      })
  })
}
// Detailsスクリーンのコンポーネント

const Group: React.FC = () => {
  const [profileImgs, setProfileImgs] = useState<any>({}); // {userName: base64Image}
  const [comments, setCooments] = useState<any>({}); // {userName: comment, ...}
  const [isfinished, setIsfinished] = useState<boolean[]>([false, false]); // [profileImgs, comments]

  const now = getMoment();
  const date = `${now.year}-${now.month}-${now.date}`;

  // 初回に実行する
  useEffect(() => {
    fetchData().then(() => {
      fetch(URL.getProfileImgs)
      .then(response => {
        // console.log("RESPONSE", response);
        return response.json()
      })
      .then((Imgs:any) => {
        // console.log("IMGs")
        setProfileImgs(Imgs);
      });
  
      fetch(URL.getComments)
      .then(response => {
        // console.log("RESPONSE", response);
        return response.json()
      })
      .then((Comments:any) => {
        console.log(Comments);
        // console.log("Comments")
        setCooments(Comments);
      });
    });
  }, []);

  // プロフィールアイコン画像の取得が完了したらstate更新する
  useEffect(() => {
    setIsfinished((prev) => {
      return ([true, prev[1]]);
    })
  }, [profileImgs]);

  // コメントの取得が完了したらstateを更新する
  useEffect(() => {
    setIsfinished((prev) => {
      return ([prev[0], true]);
    })
  }, [comments])

  // どちらの取得も完了したら処理を実行
  useEffect(() => {
    if (isfinished[0] === true && isfinished[1] === true) {
      console.log('All OK!!!');
      setIsfinished([false, false]);
    }
  }, [isfinished]);


  const ImageSize = 35; // プロフィール画像のサイズ
  const tableHead = [<Text>記入状況</Text>, <Text>本日の検温</Text>, ''];
  const tableData:any = [];
  Object.keys(profileImgs).forEach((key) => {
    const Account = (
      <View style={GroupStyles.Account}>
        <Image source={{uri: profileImgs[key]}} style={GroupStyles.ProfileIcon} />
        <View style={GroupStyles.Account__name}><Text>{key}</Text></View>
      </View>
    )
    const CHECK_OK = <View style={GroupStyles.CHECK_OK__wrapper}><View style={GroupStyles.CHECK_OK}/></View>;
    const Comment = (
      <View style={GroupStyles.Comment}>
        <Text>{comments[key] ? (comments[key])[comments[key].length - 1].comment : ''}</Text>
      </View>
    );
    const data = [ Account, CHECK_OK, Comment];
    tableData.push(data);
  })
  const Window_width = Dimensions.get('window').width;
  const LR_SIZE = 0.40;
  const CENTER_SIZE = 1 - LR_SIZE * 2;
  const widthArr = [Window_width * LR_SIZE, Window_width * CENTER_SIZE, Window_width*LR_SIZE];
  return (
    <View style={GroupStyles.container}>
      <TableWrapper>
        <Table style={GroupStyles.Table}>
          <Row data={tableHead} style={GroupStyles.Header} widthArr={widthArr}/>
          <Rows data={tableData} style={{marginTop: 20}} widthArr={widthArr}/>
        </Table>
      </TableWrapper>
    </View>
  )
}

export default Group;