import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { themeColor } from '../../common/styles/Styles';
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
  },
  comment: {

  },
  selectedButton: {
    borderRadius: 25,
    backgroundColor: themeColor,
    Text: {
      color: 'white',
      fontSize: $fontSize,
    },
    ...commonStyles,
  },
});

export default styles;