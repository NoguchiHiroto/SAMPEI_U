import { StyleSheetProperties, StyleSheet, Dimensions } from 'react-native';


const ImageSize = 35; // プロフィール画像のサイズ
const GroupStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  Table: {
    width: '100%',
    borderWidth: 0,
    backgroundColor: '#ffffff'
  },
  Header: {
    backgroundColor: '#f5f5f5',
    marginLeft: 10,
  },
  CHECK_OK__wrapper: {
    alignItems: 'center',
  },
  Account: {
    // backgroundColor: 'yellow'
    flexDirection: 'row', 
    alignItems: 'center'
  },
  ProfileIcon: {
    width: ImageSize, 
    height:ImageSize, 
    borderRadius: ImageSize / 2, 
    marginLeft: 10,
  },
  Account__name: {
    marginLeft: 10,
  },
  CHECK_OK: {
    width: ImageSize / 1.8,
    height: ImageSize / 1.8,
    borderRadius: ImageSize / 3.6,
    backgroundColor: 'blue',
    textAlign: 'center',
  },
  Comment: {
    // borderWidth: 1
  }
});

export default GroupStyles;