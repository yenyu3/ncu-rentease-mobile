import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import MissionList from '../components/MissionList';
import { StatCard, PopularListingItem } from '../components/StatisticsCharts';
import { getPopularListings, getUserBehaviorStats } from '../utils/statisticsUtils';
import useStore from '../store/useStore';

const Profile = () => {
  const { currentUser, getBadgeInfo, musicPlatform, setMusicPlatform } = useStore();
  
  // 獲取統計數據
  const popularListings = getPopularListings().slice(0, 5); // 只顯示前5名
  const userStats = getUserBehaviorStats();
  
  // 獲取徽章資訊
  const getUserBadges = () => {
    return currentUser.badges.map(badgeName => getBadgeInfo(badgeName));
  };
  
  const userBadges = getUserBadges();

  // 計算進度條
  const currentLevelPoints = (currentUser.level - 1) * 100;
  const nextLevelPoints = currentUser.level * 100;
  const progressPercentage = ((currentUser.points - currentLevelPoints) / 100) * 100;

  const pointsToNextLevel = nextLevelPoints - currentUser.points;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <Feather name="user" size={24} color="white" />
            <Text style={styles.headerTitle}>我的檔案</Text>
          </View>
          <Text style={styles.headerSubtitle}>查看你的租屋成就</Text>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 使用者資訊卡片 */}
        <View style={styles.userCard}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{currentUser.nickname.charAt(0)}</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{currentUser.nickname}</Text>
              <Text style={styles.userMeta}>{currentUser.department} {currentUser.grade}</Text>
            </View>
          </View>

          {/* 等級和點數 */}
          <View style={styles.levelSection}>
            <View style={styles.levelHeader}>
              <Text style={styles.levelText}>等級 {currentUser.level}</Text>
              <Text style={styles.pointsText}>
                {currentUser.points} / {nextLevelPoints} 點數
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${Math.min(progressPercentage, 100)}%` }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              還需要 {pointsToNextLevel} 點數升級
            </Text>
          </View>

          {/* 統計資訊 */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{currentUser.points}</Text>
              <Text style={styles.statLabel}>總點數</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{currentUser.level}</Text>
              <Text style={styles.statLabel}>等級</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{currentUser.badges.length}</Text>
              <Text style={styles.statLabel}>徽章</Text>
            </View>
          </View>
        </View>

        {/* 音樂平台設定 */}
        <View style={styles.musicPlatformCard}>
          <View style={styles.sectionHeader}>
            <Feather name="music" size={20} color="#3A4E6B" />
            <Text style={styles.sectionTitle}>音樂平台偏好</Text>
          </View>
          
          <Text style={styles.platformDescription}>
            選擇你喜歡的音樂平台，歌曲推薦將會使用對應的連結
          </Text>
          
          <View style={styles.platformOptions}>
            <TouchableOpacity
              style={[
                styles.platformOption,
                musicPlatform === 'spotify' && styles.selectedPlatform
              ]}
              onPress={() => setMusicPlatform('spotify')}
            >
              <View style={styles.platformContent}>
                <View style={[
                  styles.platformIcon,
                  { backgroundColor: musicPlatform === 'spotify' ? '#1DB954' : '#E5E7EB' }
                ]}>
                  <Feather 
                    name="music" 
                    size={20} 
                    color={musicPlatform === 'spotify' ? 'white' : '#6B7280'} 
                  />
                </View>
                <View style={styles.platformInfo}>
                  <Text style={[
                    styles.platformName,
                    musicPlatform === 'spotify' && styles.selectedPlatformText
                  ]}>Spotify</Text>
                  <Text style={styles.platformSubtitle}>全球最大的音樂串流平台</Text>
                </View>
              </View>
              {musicPlatform === 'spotify' && (
                <Feather name="check-circle" size={20} color="#1DB954" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.platformOption,
                musicPlatform === 'youtube' && styles.selectedPlatform
              ]}
              onPress={() => setMusicPlatform('youtube')}
            >
              <View style={styles.platformContent}>
                <View style={[
                  styles.platformIcon,
                  { backgroundColor: musicPlatform === 'youtube' ? '#FF0000' : '#E5E7EB' }
                ]}>
                  <Feather 
                    name="play" 
                    size={20} 
                    color={musicPlatform === 'youtube' ? 'white' : '#6B7280'} 
                  />
                </View>
                <View style={styles.platformInfo}>
                  <Text style={[
                    styles.platformName,
                    musicPlatform === 'youtube' && styles.selectedPlatformText
                  ]}>YouTube Music</Text>
                  <Text style={styles.platformSubtitle}>Google 的音樂串流服務</Text>
                </View>
              </View>
              {musicPlatform === 'youtube' && (
                <Feather name="check-circle" size={20} color="#FF0000" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* 用戶行為統計 */}
        <View style={styles.statisticsCard}>
          <View style={styles.sectionHeader}>
            <Feather name="activity" size={20} color="#3A4E6B" />
            <Text style={styles.sectionTitle}>用戶行為統計</Text>
          </View>
          
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
          
          <View style={styles.keywordsSection}>
            <Text style={styles.keywordsTitle}>🔍 熱門搜尋關鍵字</Text>
            {userStats.topSearchKeywords.slice(0, 3).map((item, index) => (
              <View key={index} style={styles.keywordItem}>
                <Text style={styles.keywordText}>{item.keyword}</Text>
                <Text style={styles.keywordCount}>{item.count}次</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 熱門房源排行 */}
        <View style={styles.statisticsCard}>
          <View style={styles.sectionHeader}>
            <Feather name="trending-up" size={20} color="#3A4E6B" />
            <Text style={styles.sectionTitle}>🔥 熱門房源 TOP 5</Text>
          </View>
          
          {popularListings.map((listing, index) => (
            <PopularListingItem 
              key={listing.id} 
              listing={listing} 
              rank={index + 1} 
            />
          ))}
        </View>

        {/* 徽章展示 */}
        <View style={styles.badgesCard}>
          <View style={styles.sectionHeader}>
            <Feather name="award" size={20} color="#3A4E6B" />
            <Text style={styles.sectionTitle}>我的徽章 ({currentUser.badges.length})</Text>
          </View>
          
          {currentUser.badges.length === 0 ? (
            <View style={styles.emptyBadges}>
              <Feather name="award" size={48} color="#D1D5DB" />
              <Text style={styles.emptyBadgesTitle}>還沒有獲得任何徽章</Text>
              <Text style={styles.emptyBadgesSubtitle}>完成任務來獲得你的第一個徽章吧！</Text>
            </View>
          ) : (
            <View style={styles.badgesGrid}>
              {userBadges.map((badge, index) => (
                <View key={index} style={styles.badgeItem}>
                  <Text style={styles.badgeIcon}>{badge.icon}</Text>
                  <Text style={styles.badgeName}>{badge.name}</Text>
                  <Text style={styles.badgeDescription}>{badge.description}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* 任務系統 */}
        <View style={styles.missionCard}>
          <MissionList />
        </View>

        {/* 點數獲取方式 */}
        <View style={styles.pointsCard}>
          <View style={styles.sectionHeader}>
            <Feather name="target" size={20} color="#3A4E6B" />
            <Text style={styles.sectionTitle}>點數獲取方式</Text>
          </View>
          
          <View style={styles.pointsList}>
            <View style={styles.pointItem}>
              <Text style={styles.pointAction}>撰寫房源評價</Text>
              <Text style={styles.pointValue}>+15 點</Text>
            </View>
            <View style={styles.pointItem}>
              <Text style={styles.pointAction}>上傳房源照片</Text>
              <Text style={styles.pointValue}>+15 點</Text>
            </View>
            <View style={styles.pointItem}>
              <Text style={styles.pointAction}>回報房源已出租</Text>
              <Text style={styles.pointValue}>+10 點</Text>
            </View>
            <View style={styles.pointItem}>
              <Text style={styles.pointAction}>新增轉租貼文</Text>
              <Text style={styles.pointValue}>+15 點</Text>
            </View>
            <View style={styles.pointItem}>
              <Text style={styles.pointAction}>每日登入</Text>
              <Text style={styles.pointValue}>+5 點</Text>
            </View>
          </View>
          
          <View style={styles.levelRule}>
            <Text style={styles.levelRuleTitle}>等級規則</Text>
            <Text style={styles.levelRuleText}>
              每 100 點數升一級，等級越高解鎖更多功能和特殊徽章！
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#9BB7D4',
    padding: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 100,
  },
  userCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    backgroundColor: '#9BB7D4',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  userDetails: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3A4E6B',
  },
  userMeta: {
    fontSize: 16,
    color: '#6B7280',
  },
  levelSection: {
    marginBottom: 16,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  pointsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#9BB7D4',
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9BB7D4',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  badgesCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3A4E6B',
    marginLeft: 8,
  },
  emptyBadges: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyBadgesTitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
  emptyBadgesSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 4,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeItem: {
    backgroundColor: 'rgba(155, 183, 212, 0.1)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: '47%',
  },
  badgeIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3A4E6B',
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  pointsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pointsList: {
    marginBottom: 16,
  },
  pointItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  pointAction: {
    fontSize: 14,
    color: '#374151',
  },
  pointValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9BB7D4',
  },
  levelRule: {
    backgroundColor: 'rgba(228, 223, 216, 0.3)',
    borderRadius: 8,
    padding: 12,
  },
  levelRuleTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3A4E6B',
    marginBottom: 8,
  },
  levelRuleText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  missionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  musicPlatformCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  platformDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  platformOptions: {
    gap: 12,
  },
  platformOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  selectedPlatform: {
    borderColor: '#9BB7D4',
    backgroundColor: 'rgba(155, 183, 212, 0.05)',
  },
  platformContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  platformIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  platformInfo: {
    flex: 1,
  },
  platformName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  selectedPlatformText: {
    color: '#3A4E6B',
  },
  platformSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  statisticsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  keywordsSection: {
    marginTop: 8,
  },
  keywordsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3A4E6B',
    marginBottom: 12,
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
});

export default Profile;