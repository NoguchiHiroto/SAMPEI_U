import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { themeColor } from '../../../common/styles/Styles';
const $margin = 25; 
const $fontSize = 16;
const $ttlFontSize = 22;

const commonStyles: ViewStyle = {
  width: 80,
  height: 35,
  marginRight: $margin,
  marginLeft: $margin,
  justifyContent: 'center',
  alignItems: 'center',
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderTopColor: themeColor,
    padding: 10,
    height: 100,
  },

    ttlText: {
      textAlign: 'center',
      fontSize: $ttlFontSize,
      fontWeight:'bold'
    } as TextStyle,
  buttonWrapper: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 25,
    backgroundColor: 'lightgray',
    ...commonStyles,
  },
  Text__black: {
    color: 'black',
    fontSize: $fontSize,
  } as TextStyle,
  selectedButton: {
    borderRadius: 25,
    backgroundColor: themeColor,
    ...commonStyles,
  },
  Text__white: {
    color: 'white',
    fontSize: $fontSize,
  },
});

export default styles;