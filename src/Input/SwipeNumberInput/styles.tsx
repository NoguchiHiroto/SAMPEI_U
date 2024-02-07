import { StyleSheet } from 'react-native';
export const itemSize = 160;
const styles = StyleSheet.create({
  container: {
      marginTop: '5%',
      width: '100%',
      height: '15%',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black'
    },
    item: {
      // border: 'solid',
      textAlign: 'center',
      width: itemSize, // width of each item
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemStart: {
      width: itemSize, // width of each item
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
    },
    selectedText: {
      fontSize: 30,
      color: 'red', // Highlight the selected number
    },
    label: {
      fontSize: 22,
      fontWeight: 'bold',
    }
});
  
export default styles;