import React, { useEffect } from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchGroupComments } from '@/slice/commentSlice';
import { CommentResponse } from '@/features/comments/types/comment';

interface CommentItemProps {
  comment: CommentResponse;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP') + ' ' + date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.commentItem}>
      <View style={styles.commentHeader}>
        <Text style={styles.userName}>ユーザー {comment.userId}</Text>
        <Text style={styles.commentDate}>{formatDate(comment.createdAt)}</Text>
      </View>
      
      <Text style={styles.commentContent}>{comment.content}</Text>
      
      <View style={styles.commentMetrics}>
        {comment.temperature && (
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>体温:</Text>
            <Text style={styles.metricValue}>{comment.temperature}°C</Text>
          </View>
        )}
        {comment.healthStatus && (
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>健康状態:</Text>
            <Text style={[styles.metricValue, styles.healthStatusValue]}>
              {comment.healthStatus}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default function GroupScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { comments, loading, error } = useSelector((state: RootState) => state.comments);
  const { currentUser } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (currentUser?.groupId) {
      dispatch(fetchGroupComments(currentUser.groupId));
    }
  }, [dispatch, currentUser]);

  const handleRefresh = () => {
    if (currentUser?.groupId) {
      dispatch(fetchGroupComments(currentUser.groupId));
    }
  };

  const renderComment = ({ item }: { item: CommentResponse }) => (
    <CommentItem comment={item} />
  );

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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">グループ</ThemedText>
      </ThemedView>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>エラーが発生しました: {error}</Text>
        </View>
      )}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>読み込み中...</Text>
        </View>
      ) : (
        <View style={styles.commentsContainer}>
          <Text style={styles.sectionTitle}>グループメンバーの投稿</Text>
          
          {comments.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>まだ投稿がありません</Text>
            </View>
          ) : (
            <FlatList
              data={comments}
              renderItem={renderComment}
              keyExtractor={(item) => item.id.toString()}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
              }
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      )}
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
  commentsContainer: {
    padding: 16,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  commentItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  commentDate: {
    fontSize: 12,
    color: '#666',
  },
  commentContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 12,
  },
  commentMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  healthStatusValue: {
    color: '#007AFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f44336',
  },
  errorText: {
    color: '#f44336',
    fontSize: 14,
    textAlign: 'center',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
