import React, { useState } from 'react';
import { Text, View, Button, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // お好きなアイコンライブラリを選択
import ProfileIconImage from './../ProfileIcon.png';
import { launchImageLibrary } from 'react-native-image-picker';


const ProfileIcon = ({ onPress }: any) => {
  const [imageUri, setImageUri] = useState(null);
  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
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