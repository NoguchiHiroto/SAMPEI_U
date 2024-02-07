import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { rootPath } from '../../../../common/variables';
import { themeColor } from '../../../../common/styles/Styles';
import { commonStyles } from '../../commmon/variables';

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    fontSize: commonStyles.titleFontSize,
    fontWeight:'bold'
  } as TextStyle
})

export default styles;
