import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from './../../store/store';
import { Text, View, Button, TouchableOpacity, Image, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // お好きなアイコンライブラリを選択
import ProfileIconImage from './../ProfileIcon.png';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
const fs = require('fs');
const path = require('path');
const userName = 'Noguchi7'

// 画像をbase64形式にエンコードする
const encodeImageToBase64 = (imageUri:string) => {
  return new Promise((resolve, reject) => {
    // iphone内のPathを引数にして画像を取得する
    // console.log(imageUri);
    fetch(imageUri)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result;
          resolve(base64Image);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
  }) 
}
const postProfileImg = (body:any) => {
  return fetch('http://127.0.0.1:8000/api/setProfileImg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  });
}
// 画像のuriを引数にとってDBへアップロードする
const uploadImageToDatabase = (imageUri:string) => {
  return new Promise<string>((resolve, reject) => {
    try {
      encodeImageToBase64(imageUri)
      .then((base64Image) => {
        const body = new FormData();
        body.append('img', base64Image);
        body.append('userName', userName);
        return postProfileImg(body);
      })
      .then((response) => {
        return response.json();
      })
      .then(() => resolve(imageUri))
      .catch(err => {
        console.error(err);
      })
    } catch(error) {
      console.error('ダメです！画像がアップロードできません！', error);
    }
  });
};

const ProfileIcon = () => {
  const [imageUri, setImageUri] = useState<string>('');
  const userName = useSelector((state) => state.temp.userName);
  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    mediaType: 'photo' as MediaType
  };
  // プロフィールアイコンがタップされた時の処理
  const selectImage = () => {
    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        ImageResizer.createResizedImage(response.assets[0].uri, 200, 200, 'JPEG', 80)
        .then(({uri}) => uploadImageToDatabase(uri))
        .then((uri) => setImageUri(uri));
        
      }
    });
  };
  return (
    <TouchableOpacity onPress={selectImage}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{ width: 40, height: 40, borderRadius: 20 }} />
      ) : (
        <Image source={ProfileIconImage} style={{ width: 40, height: 40, borderRadius: 20 }} />
      )}
    </TouchableOpacity>
  );
};

export default ProfileIcon;