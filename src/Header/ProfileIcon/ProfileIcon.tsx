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

const encodeImageToBase64 = (imageUri:string) => {
  return new Promise((resolve, reject) => {
    // iphone内のPathを引数にして画像を取得する
    // console.log(imageUri);
    fetch(imageUri)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          console.log('loadしました');
          // console.log(reader.result);
          const base64Image = reader.result;
          resolve(base64Image);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
  }) 
}

const uploadImageToDatabase = (imageUri:string) => {
  return new Promise((resolve, reject) => {
    try {
      // console.log(imageUri);
      encodeImageToBase64(imageUri).then((base64Image) => {
        // console.log(base64Image);
        console.log('upload');
        const body = new FormData();
        body.append('img', base64Image);
        body.append('userName', 'Noguchi4');
        return fetch('http://127.0.0.1:8000/api/setProfileImg', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body),
        })
      }).then((response) => {
        response.json().then((data) => {
          console.log('画像アップロードOK!', data)
        });
      }).catch(err => {
        console.error(err);
      })
    } catch(error) {
      console.error('ダメです！画像がアップロードできません！', error);
    }
  });
}

const ProfileIcon = ({ onPress }: any) => {
  const userName = useSelector((state) => state.temp.userName);
  const [imageUri, setImageUri] = useState<string>('');
  const selectImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo' as MediaType
    };
    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const body = new FormData();
        const selectedImage = response.assets[0];
        ImageResizer.createResizedImage(selectedImage.uri, 200, 200, 'JPEG', 80)
        .then(({uri}) => {
          console.log(uri);
          // const imagePath = response.assets[0].uri;
          const imagePath = uri;
          // body.append('img', response.assets[0].uri);
          // body.append('userName', userName);
          // console.log('eeee');
          // fetch('http://127.0.0.1:8000/api/setProfileImg', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json'
          //   },
          //   body: JSON.stringify(body),
          // })
          uploadImageToDatabase(imagePath).then(() => {
            setImageUri(imagePath);
          });
        })
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