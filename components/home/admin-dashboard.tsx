import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const salesData = [
  { value: 2400, label: 'Mon' },
  { value: 1398, label: 'Tue' },
  { value: 3800, label: 'Wed' },
  { value: 3908, label: 'Thu' },
  { value: 4800, label: 'Fri' },
  { value: 3800, label: 'Sat' },
  { value: 4300, label: 'Sun' },
];

const topDishes = [
  { 
    name: 'Pasta Carbonara', 
    orders: 45, 
    revenue: 1350,
    trend: 'up'
  },
  { 
    name: 'Grilled Salmon', 
    orders: 38, 
    revenue: 1520,
    trend: 'up'
  },
  { 
    name: 'Pizza Margherita', 
    orders: 32, 
    revenue: 800,
    trend: 'down'
  },
];

const staffPerformance = [
  { 
    name: 'John Doe',
    tables: 12,
    avgTime: '15min',
    sales: 1250,
    rating: 4.8,
    status: 'active'
  },
  { 
    name: 'Jane Smith',
    tables: 15,
    avgTime: '12min',
    sales: 1480,
    rating: 4.9,
    status: 'active'
  },
  { 
    name: 'Mike Johnson',
    tables: 10,
    avgTime: '18min',
    sales: 980,
    rating: 4.7,
    status: 'break'
  },
];

const StatCard = ({ title, value, change, icon }) => (
  <View style={styles.statCard}>
    <View>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statChange}>{change}</Text>
    </View>
    <View style={styles.iconContainer}>
      <MaterialCommunityIcons name={icon} size={24} color="white" />
    </View>
  </View>
);

const DishItem = ({ dish }) => (
  <View style={styles.dishItem}>
    <View style={styles.dishInfo}>
      <Text style={styles.dishName}>{dish.name}</Text>
      <Text style={styles.dishRevenue}>${dish.revenue}</Text>
    </View>
    <View style={styles.dishStats}>
      <Text style={styles.dishOrders}>{dish.orders} orders</Text>
      <Text style={[styles.trendIcon, { color: dish.trend === 'up' ? '#10B981' : '#EF4444' }]}>
        {dish.trend === 'up' ? '↑' : '↓'}
      </Text>
    </View>
  </View>
);

const StaffItem = ({ staff }) => (
  <View style={styles.staffItem}>
    <View style={styles.staffHeader}>
      <Text style={styles.staffName}>{staff.name}</Text>
      <View style={[styles.statusBadge, 
        { backgroundColor: staff.status === 'active' ? '#D1FAE5' : '#FEF3C7' }]}>
        <Text style={[styles.statusText, 
          { color: staff.status === 'active' ? '#065F46' : '#92400E' }]}>
          {staff.status}
        </Text>
      </View>
    </View>
    <View style={styles.staffStats}>
      <Text>Tables: {staff.tables}</Text>
      <Text>Time: {staff.avgTime}</Text>
      <Text>★ {staff.rating}</Text>
      <Text>${staff.sales}</Text>
    </View>
  </View>
);

export default function RestaurantDashboard() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsGrid}>
        <StatCard 
          title="Daily Revenue" 
          value="$4,890" 
          change="+12.5%" 
          icon="currency-usd" 
        />
        <StatCard 
          title="Total Orders" 
          value="156" 
          change="+8.2%" 
          icon="trending-up" 
        />
        <StatCard 
          title="Average Order" 
          value="$31.34" 
          change="+5.1%" 
          icon="chart-bar" 
        />
        <StatCard 
          title="Active Tables" 
          value="24" 
          change="+3.7%" 
          icon="account-group" 
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Weekly Sales</Text>
        <BarChart
          data={salesData}
          width={Dimensions.get('window').width - 40}
          height={200}
          barWidth={30}
          spacing={20}
          barBorderRadius={4}
          frontColor="#4F46E5"
          gradientColor="#6366F1"
          yAxisThickness={0}
          xAxisThickness={1}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Performing Dishes</Text>
        {topDishes.map(dish => (
          <DishItem key={dish.name} dish={dish} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Staff Performance</Text>
        {staffPerformance.map(staff => (
          <StaffItem key={staff.name} staff={staff} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  statTitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  statChange: {
    fontSize: 14,
    color: '#10B981',
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#4F46E5',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dishItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 12,
  },
  dishInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '500',
  },
  dishRevenue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
  dishStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dishOrders: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
  trendIcon: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  staffItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 12,
  },
  staffHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  staffName: {
    fontSize: 16,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  staffStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});