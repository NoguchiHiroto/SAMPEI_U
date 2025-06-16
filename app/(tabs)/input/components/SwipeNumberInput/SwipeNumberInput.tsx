import React, { useRef, useEffect, useState } from 'react';
import { View, FlatList, Text, Dimensions, StyleSheet } from 'react-native';
// import { useSelector, AppDispatch } from '../../store/store';
// import { changeTemp, changeIsSymptoms } from '../../slices/tempSlice';
// import { AppState } from '../../states/AppState';
// import { useDispatch } from 'react-redux';
// import { URL } from '../../common/variables';
interface CenteredNumberPickerProps {
  onTemperatureChange?: (temperature: number) => void;
}

export const CenteredNumberPicker = ({ onTemperatureChange }: CenteredNumberPickerProps) => {
  // const dispatch = useDispatch();
  // const selectedNumber = useSelector((state) => state.temp.temp);
  const initialIndex = 20; // デフォルトで選択している体温(36.0)
  const flatListRef = useRef<FlatList<number>>(null); // 体温入力コンポーネントのref
  const numbers = Array.from({ length: 30 }, (_, i) => 34.0 + i * 0.1); // 体温一覧(34.0から0.1刻み)
  const [selectedNumber, setSelectedNumber] = useState(numbers[initialIndex]); // 36.0度に対応
  
  // スクロール終了時の処理を記述
  const onMomentumScrollEnd = (e:any) => {
    const screenWidth = Dimensions.get('window').width;
    const centerPoint = e.nativeEvent.contentOffset.x + screenWidth / 2;
    const paddingLeft = (screenWidth - itemSize) / 2;
    const adjustedCenterPoint = centerPoint - paddingLeft;
    const index = Math.round(adjustedCenterPoint / itemSize); // 数字のリストコンポーネントの中央をアイテムサイズで割ることで何番目のコンポーネントなのかを特定する
    if (index >= 0 && index < numbers.length) {
      setSelectedNumber(numbers[index]); // stateを更新
      onTemperatureChange?.(numbers[index]); // 親コンポーネントに体温変更を通知
    }
    // dispatch(changeTemp(numbers[index])); // stateを更新
  };

  // 初回に選択されているものを36.0になるように調整
  useEffect(() => {
    // dispatch(changeTemp(numbers[initialIndex])); // stateを更新
    onTemperatureChange?.(numbers[initialIndex]); // 初期値を親コンポーネントに通知
    if (flatListRef.current) {
      const selectedIndex = numbers.indexOf(selectedNumber);
      // flatListRef.current.scrollToIndex({ animated: true, index: initialIndex, viewPosition: 0.5, viewOffset: offset});
      flatListRef.current.scrollToIndex({ animated: true, index: initialIndex, viewPosition: 0.5 });
    }
  }, []);
  
  const getItemLayout = (data:any, index:number) => {
    return ({
      length: itemSize,
      offset: itemSize * index,
      index,
    })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>本日の体温/℃</Text>
      <FlatList
        ref={flatListRef}
        data={numbers}
        horizontal
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <Text style={item === selectedNumber ? styles.selectedText : styles.text}>{item.toFixed(1)}</Text>
              {/* <Text>{selectedNumber}</Text> */}
            </View>
          )}}
        keyExtractor={(item) => item.toString()}
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemSize} // same as item width
        decelerationRate="fast"
        initialScrollIndex={initialIndex}
        initialNumToRender={initialIndex}
        getItemLayout={getItemLayout}
        contentContainerStyle={{
          paddingLeft: (Dimensions.get('window').width - itemSize) / 2,
          paddingRight: (Dimensions.get('window').width - itemSize) / 2,
        }}
      />
    </View>
  );
};

const itemSize = 160;
const styles = StyleSheet.create({
  container: {
      marginTop: '5%',
      width: '100%',
      height: 100,
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
      fontSize: 40,
      color: 'red', // Highlight the selected number
      fontWeight: 'bold',
    },
    label: {
      fontSize: 22,
      fontWeight: 'bold',
    }
});