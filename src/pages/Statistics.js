import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BarChart, StatCard, PopularListingItem } from '../components/StatisticsCharts';
import {
  getRentTrends,
  getPopularListings,
  getAreaDistribution,
  getPriceDistribution,
  getUserBehaviorStats,
} from '../utils/statisticsUtils';

const Statistics = () => {
  const [activeTab, setActiveTab] = useState('market');
  
  const rentTrends = getRentTrends();
  const popularListings = getPopularListings();
  const areaDistribution = getAreaDistribution();
  const priceDistribution = getPriceDistribution();
  const userStats = getUserBehaviorStats();

  const tabs = [
    { id: 'market', title: '市場分析', icon: '📊' },
    { id: 'popular', title: '熱門房源', icon: '🔥' },
    { id: 'behavior', title: '用戶行為', icon: '👥' },
    { id: 'distribution', title: '房源分布', icon: '🗺️' },
  ];

  const renderMarketAnalysis = () => (
    <View>
      <BarChart 
        data={rentTrends} 
        title="租金趨勢 (近6個月)" 
        maxValue={3500}
      />
      <BarChart 
        data={priceDistribution} 
        title="價格區間分布" 
      />
    </View>
  );

  const renderPopularListings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🔥 最受歡迎房源 TOP 10</Text>
      {popularListings.map((listing, index) => (
        <PopularListingItem 
          key={listing.id} 
          listing={listing} 
          rank={index + 1} 
        />
      ))}
    </View>
  );

  const renderUserBehavior = () => (
    <View>
      <View style={styles.statsRow}>
        <StatCard 
          title="總瀏覽量" 
          value={userStats.totalViews} 
          icon="👀"
        />
        <StatCard 
          title="總收藏數" 
          value={userStats.totalFavorites} 
          icon="❤️"
        />
      </View>
      <View style={styles.statsRow}>
        <StatCard 
          title="搜尋次數" 
          value={userStats.totalSearches} 
          icon="🔍"
        />
        <StatCard 
          title="平均停留" 
          value={userStats.avgSessionTime} 
          icon="⏱️"
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔍 熱門搜尋關鍵字</Text>
        {userStats.topSearchKeywords.map((item, index) => (
          <View key={index} style={styles.keywordItem}>
            <Text style={styles.keywordText}>{item.keyword}</Text>
            <Text style={styles.keywordCount}>{item.count}次</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderDistribution = () => (
    <View>
      <BarChart 
        data={areaDistribution} 
        title="區域房源分布" 
      />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 區域統計摘要</Text>
        <View style={styles.summaryGrid}>
          {areaDistribution.map((area, index) => (
            <View key={index} style={styles.summaryItem}>
              <Text style={styles.summaryArea}>{area.name}</Text>
              <Text style={styles.summaryCount}>{area.count}間</Text>
              <Text style={styles.summaryPercent}>
                {((area.count / 50) * 100).toFixed(1)}%
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'market': return renderMarketAnalysis();
      case 'popular': return renderPopularListings();
      case 'behavior': return renderUserBehavior();
      case 'distribution': return renderDistribution();
      default: return renderMarketAnalysis();
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#9BB7D4', '#E4DFD8']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>📊 數據統計</Text>
        <Text style={styles.headerSubtitle}>深入了解租屋市場趨勢</Text>
      </LinearGradient>

      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText
              ]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  tabContainer: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#9BB7D4',
  },
  tabIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  keywordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  keywordText: {
    fontSize: 14,
    color: '#333',
  },
  keywordCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9BB7D4',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  summaryArea: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  summaryCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9BB7D4',
  },
  summaryPercent: {
    fontSize: 12,
    color: '#666',
  },
  bottomPadding: {
    height: 100,
  },
});

export default Statistics;