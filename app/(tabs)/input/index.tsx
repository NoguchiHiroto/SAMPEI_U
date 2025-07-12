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
  const [isCommentFocused, setIsCommentFocused] = useState(false);
  
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
    } catch {
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
          style={[
            styles.commentInput,
            isCommentFocused && styles.commentInputFocused
          ]}
          placeholder="今日の体調やコメントを入力してください"
          placeholderTextColor="#999"
          value={comment}
          onChangeText={setComment}
          onFocus={() => setIsCommentFocused(true)}
          onBlur={() => setIsCommentFocused(false)}
          multiline
          numberOfLines={4}
          maxLength={500}
        />
        <Text style={styles.characterCount}>{comment.length}/500</Text>
        
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
    borderWidth: 2,
    borderColor: '#e1e5e9',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    textAlignVertical: 'top',
    backgroundColor: '#f8f9fa',
    marginBottom: 8,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  commentInputFocused: {
    borderColor: '#007AFF',
    backgroundColor: '#fff',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  characterCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#666',
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
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: '#e1e5e9',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
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
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
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
