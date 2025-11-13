import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { fetchUserComments } from '@/slice/commentSlice';
import { AppDispatch, RootState } from '@/store/store';
import { Image } from 'expo-image';
import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, Dimensions, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface TemperatureDataPoint {
  date: string;
  temperature: number | null;
  healthStatus?: string;
}

export default function GraphScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { userComments, loading, error } = useSelector((state: RootState) => state.comments);
  const { currentUser } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchUserComments(currentUser.id));
    }
  }, [dispatch, currentUser]);

  const handleRefresh = () => {
    if (currentUser?.id) {
      dispatch(fetchUserComments(currentUser.id));
    }
  };

  // 直近7日分のデータを抽出
  const last7DaysData = useMemo(() => {
    const sortedComments = [...userComments]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 7)
      .reverse();

    return sortedComments.map(comment => ({
      date: new Date(comment.createdAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' }),
      temperature: comment.temperature ? (typeof comment.temperature === 'string' ? parseFloat(comment.temperature) : comment.temperature) : null,
      healthStatus: comment.healthStatus || undefined,
    }));
  }, [userComments]);

  // 温度の最小値と最大値を計算（グラフスケール用）
  const temperatureRange = useMemo(() => {
    const temps = last7DaysData
      .map(d => d.temperature)
      .filter((t): t is number => t !== null);

    if (temps.length === 0) return { min: 35, max: 40 };

    const min = Math.floor(Math.min(...temps) - 0.5);
    const max = Math.ceil(Math.max(...temps) + 0.5);

    return { min: Math.max(min, 35), max: Math.min(max, 42) };
  }, [last7DaysData]);

  // 体温を棒グラフの高さに変換
  const getBarHeight = (temperature: number | null) => {
    if (temperature === null) return 0;

    const { min, max } = temperatureRange;
    const range = max - min;
    const normalizedValue = (temperature - min) / range;

    return normalizedValue * 150; // 最大150pxの高さ
  };

  // 健康状態の色を取得
  const getHealthStatusColor = (status?: string) => {
    switch (status) {
      case '良好': return '#4CAF50';
      case '普通': return '#FF9800';
      case '不調': return '#F44336';
      default: return '#E0E0E0';
    }
  };

  // 統計情報を計算
  const statistics = useMemo(() => {
    const temps = last7DaysData
      .map(d => d.temperature)
      .filter((t): t is number => t !== null);

    if (temps.length === 0) {
      return { avg: 0, min: 0, max: 0 };
    }

    return {
      avg: temps.reduce((sum, t) => sum + t, 0) / temps.length,
      min: Math.min(...temps),
      max: Math.max(...temps),
    };
  }, [last7DaysData]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/img/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">体温グラフ</ThemedText>
        </ThemedView>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>エラー: {error}</Text>
          </View>
        )}

        {loading && userComments.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>読み込み中...</Text>
          </View>
        ) : last7DaysData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>データがありません</Text>
            <Text style={styles.emptySubtext}>体温を記録してください</Text>
          </View>
        ) : (
          <>
            {/* 統計情報 */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>平均</Text>
                <Text style={styles.statValue}>{statistics.avg.toFixed(1)}°C</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>最低</Text>
                <Text style={styles.statValue}>{statistics.min.toFixed(1)}°C</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>最高</Text>
                <Text style={styles.statValue}>{statistics.max.toFixed(1)}°C</Text>
              </View>
            </View>

            {/* 棒グラフ */}
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>直近7日間の体温推移</Text>

              <View style={styles.chart}>
                {/* Y軸ラベル */}
                <View style={styles.yAxis}>
                  <Text style={styles.yAxisLabel}>{temperatureRange.max}°C</Text>
                  <Text style={styles.yAxisLabel}>{((temperatureRange.max + temperatureRange.min) / 2).toFixed(1)}°C</Text>
                  <Text style={styles.yAxisLabel}>{temperatureRange.min}°C</Text>
                </View>

                {/* グラフエリア */}
                <View style={styles.graphArea}>
                  <View style={styles.barsContainer}>
                    {last7DaysData.map((data, index) => (
                      <View key={index} style={styles.barColumn}>
                        <View style={styles.barWrapper}>
                          {data.temperature ? (
                            <>
                              <Text style={styles.barValue}>{data.temperature.toFixed(1)}</Text>
                              <View
                                style={[
                                  styles.bar,
                                  {
                                    height: getBarHeight(data.temperature),
                                    backgroundColor: getHealthStatusColor(data.healthStatus),
                                  },
                                ]}
                              />
                            </>
                          ) : (
                            <Text style={styles.noDataText}>-</Text>
                          )}
                        </View>
                        <Text style={styles.barLabel}>{data.date}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              {/* 凡例 */}
              <View style={styles.legend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
                  <Text style={styles.legendText}>良好</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#FF9800' }]} />
                  <Text style={styles.legendText}>普通</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#F44336' }]} />
                  <Text style={styles.legendText}>不調</Text>
                </View>
              </View>
            </View>

            {/* データリスト */}
            <View style={styles.dataListContainer}>
              <Text style={styles.dataListTitle}>記録一覧</Text>
              {userComments.slice(0, 10).map((comment, index) => (
                <View key={comment.id} style={styles.dataItem}>
                  <View style={styles.dataItemHeader}>
                    <Text style={styles.dataItemDate}>
                      {new Date(comment.createdAt).toLocaleDateString('ja-JP')}
                    </Text>
                    {comment.temperature && (
                      <Text style={styles.dataItemTemp}>{comment.temperature}°C</Text>
                    )}
                  </View>
                  {comment.healthStatus && (
                    <View style={[styles.healthBadge, { backgroundColor: getHealthStatusColor(comment.healthStatus) }]}>
                      <Text style={styles.healthBadgeText}>{comment.healthStatus}</Text>
                    </View>
                  )}
                  {comment.content && (
                    <Text style={styles.dataItemContent} numberOfLines={2}>
                      {comment.content}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
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
    padding: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
  },
  chartContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    height: 200,
  },
  yAxis: {
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginRight: 8,
    width: 50,
  },
  yAxisLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'right',
  },
  graphArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 170,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    maxWidth: 60,
  },
  barWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 160,
  },
  bar: {
    width: 32,
    borderRadius: 4,
    minHeight: 4,
  },
  barValue: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  barLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  noDataText: {
    fontSize: 12,
    color: '#999',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  dataListContainer: {
    padding: 16,
  },
  dataListTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  dataItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dataItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dataItemDate: {
    fontSize: 14,
    color: '#666',
  },
  dataItemTemp: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
  healthBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  healthBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  dataItemContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
