import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { CenteredNumberPicker } from './components/SwipeNumberInput/SwipeNumberInput';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { submitComment } from '@/slice/commentSlice';

export default function InputScreen() {
  const [comment, setComment] = useState('');
  const [temperature, setTemperature] = useState<number | null>(36.0);
  const [healthStatus, setHealthStatus] = useState<'良好' | '普通' | '不調' | null>(null);
  
  const dispatch = useDispatch<AppDispatch>();
  const { submitting } = useSelector((state: RootState) => state.comments);
  const { currentUser } = useSelector((state: RootState) => state.users);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      Alert.alert('エラー', 'コメントを入力してください');
      return;
    }

    if (!currentUser) {
      Alert.alert('エラー', 'ユーザー情報が取得できません');
      return;
    }

    try {
      await dispatch(submitComment({
        userId: currentUser.id,
        groupId: currentUser.groupId,
        content: comment.trim(),
        temperature: temperature || undefined,
        healthStatus: healthStatus || undefined,
      })).unwrap();

      setComment('');
      setTemperature(36.0);
      setHealthStatus(null);
      Alert.alert('成功', 'コメントを投稿しました');
    } catch (error) {
      Alert.alert('エラー', 'コメントの投稿に失敗しました');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image 
          source={require('@/assets/images/partial-react-logo.png')} 
          style={styles.reactLogo} 
        />
      }
    >
      <CenteredNumberPicker onTemperatureChange={setTemperature} />
      
      <View style={styles.commentSection}>
        <Text style={styles.sectionTitle}>コメント</Text>
        
        <TextInput
          style={styles.commentInput}
          placeholder="今日の体調やコメントを入力してください"
          value={comment}
          onChangeText={setComment}
          multiline
          numberOfLines={4}
          maxLength={500}
        />
        
        <View style={styles.healthStatusSection}>
          <Text style={styles.healthStatusTitle}>健康状態</Text>
          <View style={styles.healthStatusButtons}>
            {(['良好', '普通', '不調'] as const).map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.healthStatusButton,
                  healthStatus === status && styles.healthStatusButtonActive
                ]}
                onPress={() => setHealthStatus(status)}
              >
                <Text style={[
                  styles.healthStatusButtonText,
                  healthStatus === status && styles.healthStatusButtonTextActive
                ]}>
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={styles.submitButtonText}>
            {submitting ? '投稿中...' : '投稿する'}
          </Text>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  commentSection: {
    marginTop: 20,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  healthStatusSection: {
    marginBottom: 20,
  },
  healthStatusTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  healthStatusButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  healthStatusButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  healthStatusButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  healthStatusButtonText: {
    fontSize: 14,
    color: '#333',
  },
  healthStatusButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
