import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { TarjetaPlato } from '../dashboard/card-dinner';
import { orders, recommendedDishes } from '@/lib/dashboard';

const getStatusColor = (status: string) => {
    switch (status) {
        case 'En preparacion':
            return '#F59E0B';
        case 'Lista':
            return '#10B981';
        case 'Nueva orden':
            return '#3B82F6';
        default:
            return '#6B7280';
    }
};

export default function WaiterDashboard() {
    const isMobile = widthPercentageToDP('100%') < 1024;
    return (
        <View style={styles.container}>
            {isMobile ? (
                <>
                    <View style={styles.section}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Ordenes Activas</Text>
                            <Icon name="clock-outline" size={24} color="#6B7280" />
                        </View>
                        {orders.map((order) => (
                            <View
                                key={order.id}
                                style={[styles.orderCard, { borderLeftColor: getStatusColor(order.status) }]}
                            >
                                <View style={styles.orderHeader}>
                                    <Text style={styles.tableText}>Mesa {order.table}</Text>
                                    <Text style={styles.timeText}>{order.time}</Text>
                                </View>
                                <Text style={styles.itemsText}>{order.items.join(', ')}</Text>
                                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(order.status)}20` }]}>
                                    <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.section}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Especiales del dia</Text>
                            <Icon name="star" size={24} color="#EAB308" />
                        </View>
                        <FlatList
                            data={recommendedDishes}
                            renderItem={TarjetaPlato}
                            keyExtractor={item => item.id.toString()}
                            numColumns={2}
                            columnWrapperStyle={styles.columnWrapper}
                            contentContainerStyle={styles.flatListContent}
                            scrollEnabled={false}
                        />
                    </View>
                </>
            ) : (
                <View style={{ flexDirection: 'row', gap: 1 }}>
                    <View style={[styles.section, { width: '52%' }]}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Especiales del dia</Text>
                            <Icon name="star" size={24} color="#EAB308" />
                        </View>
                        <ScrollView style={{ flex: 1, maxHeight: heightPercentageToDP(40) }}>
                            {recommendedDishes.map((dish) => (
                                <View key={dish.id}>
                                    <TarjetaPlato item={dish} />
                                </View>
                            ))}
                        </ScrollView>

                    </View>

                    <View style={[styles.section, { width: '48%' }]}>

                        <View style={styles.header}>
                            <Text style={styles.title}>Ordenes Activas</Text>
                            <Icon name="clock-outline" size={24} color="#6B7280" />
                        </View>

                        <ScrollView style={{ flex: 1, maxHeight: heightPercentageToDP(40) }}>
                            {orders.map((order) => (
                                <View
                                    key={order.id}
                                    style={[styles.orderCard, { borderLeftColor: getStatusColor(order.status) }]}
                                >
                                    <View style={styles.orderHeader}>
                                        <Text style={styles.tableText}>Mesa {order.table}</Text>
                                        <Text style={styles.timeText}>{order.time}</Text>
                                    </View>
                                    <Text style={styles.itemsText}>{order.items.join(', ')}</Text>
                                    <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(order.status)}20` }]}>
                                        <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                </View>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        padding: 10,
    },
    section: {
        marginBottom: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    orderCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tableText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
    },
    timeText: {
        fontSize: 12,
        color: '#6B7280',
    },
    itemsText: {
        fontSize: 14,
        color: '#4B5563',
        marginTop: 4,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        marginTop: 8,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    },

    columnWrapper: {
        justifyContent: 'space-between',
    },
    flatListContent: {
        shadowOpacity: 0.1,
        shadowRadius: 2,

    },

});