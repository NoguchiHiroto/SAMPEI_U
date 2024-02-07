import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { themeColor } from '../../../../common/styles/Styles';

const styles = StyleSheet.create({
  button: {
    width: '100%', 
    height: '100%', 
    justifyContent: 'center', //　上下中央
    alignItems: 'center',

  },
  textWrapper: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center', //　上下中央
    alignItems: 'center',    
  },
  text: {
    fontSize: 20,
    color: '#ffffff',
  }
});

export default styles;