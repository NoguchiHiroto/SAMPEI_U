import React from "react"
import { FlatList, NativeScrollEvent, StyleSheet, Text, View } from "react-native"
import { number } from "zod";

interface CenteredNumberPickerProps {
  onTemperatureChange: (temperature: number) => void;
}
export const CenteredNumberPicker = ({ onTemperatureChange }: CenteredNumberPickerProps) => {
  const [selectedTemperature, setSelectedTemperature] = React.useState<number>(36.0);
  const handleOnScrollEnd = (event: NativeScrollEvent) => {
    const offsetX = event.contentOffset.x;
    const centerabsolutePosition = offsetX + (containerwidth / 2)
  }
  return (
    <View style={styles.numberPickerContainer}>
      <Text style={styles.label}>本日の体温/℃</Text>
      <FlatList 
        data={[...Array.from({ length: 100 }, (_, i) => 0.1 * i + 35.0)]}
        horizontal
        onMomentumScrollBegin={() => {}}
        onMomentumScrollEnd={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(offsetX / 50);
          const temperature = 0.1 * index + 35.0;
          onTemperatureChange(temperature);
        }}
        keyExtractor={(item) => item.toString()}
        showsHorizontalScrollIndicator={false} // 水平スクロールバーを非表示
        decelerationRate={"fast"}
        initialScrollIndex={50}
        initialNumToRender={50}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <Text style={{ fontSize: 24 }}>{item.toFixed(1)}</Text>
            </View>
          )
        }}
        getItemLayout={(data, index) => (
          // これにより、FlatListは各アイテムのサイズとオフセットを事前に計算し、
          // scrollToOffsetがより正確に動作するようになる
          { length: itemSize, offset: itemSize * index, index }
        )}
      />
    </View>
  )
}

const itemSize = 160;
const styles = StyleSheet.create({
  numberPickerContainer: {
    marginTop: '5%',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#0000000',
    borderWidth: 1,
  },
  item: {
    textAlign: 'center',
    width: itemSize,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
  }
})