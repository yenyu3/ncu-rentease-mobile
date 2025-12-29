import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 簡單的長條圖組件
export const BarChart = ({ data, title, maxValue }) => {
  const max = maxValue || Math.max(...data.map(item => item.count || item.avgRent));
  
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.barRow}>
          <Text style={styles.barLabel}>
            {item.name || item.month || item.range}
          </Text>
          <View style={styles.barContainer}>
            <View 
              style={[
                styles.bar, 
                { width: `${((item.count || item.avgRent) / max) * 100}%` }
              ]} 
            />
            <Text style={styles.barValue}>
              {item.count || item.avgRent}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

// 統計卡片組件
export const StatCard = ({ title, value, subtitle, icon }) => (
  <View style={styles.statCard}>
    <Text style={styles.statIcon}>{icon}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
    {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
  </View>
);

// 熱門房源列表組件
export const PopularListingItem = ({ listing, rank }) => (
  <View style={styles.popularItem}>
    <View style={styles.rankBadge}>
      <Text style={styles.rankText}>{rank}</Text>
    </View>
    <View style={styles.listingInfo}>
      <Text style={styles.listingTitle} numberOfLines={1}>
        {listing.title}
      </Text>
      <Text style={styles.listingAddress} numberOfLines={1}>
        {listing.address}
      </Text>
      <View style={styles.listingStats}>
        <Text style={styles.rating}>⭐ {listing.avgRating}</Text>
        <Text style={styles.reviews}>({listing.reviewsCount}則評價)</Text>
        <Text style={styles.price}>NT${listing.rentMin}-{listing.rentMax}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  chartContainer: {
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
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  barLabel: {
    width: 80,
    fontSize: 12,
    color: '#666',
  },
  barContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    height: 20,
    backgroundColor: '#9BB7D4',
    borderRadius: 10,
    marginRight: 8,
  },
  barValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  statCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A4E6B',
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  statSubtitle: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
  popularItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9BB7D4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  listingInfo: {
    flex: 1,
  },
  listingTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  listingAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  listingStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#FF6B35',
    marginRight: 8,
  },
  reviews: {
    fontSize: 12,
    color: '#999',
    marginRight: 8,
  },
  price: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3A4E6B',
  },
});