import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { isMobile } from 'react-device-detect';
import { heightPercentageToDP } from 'react-native-responsive-screen';


const orders = [
    { id: 1, table: 5, status: 'En preparacion', items: ['Pasta Carbonara', 'Caesar Salad'], time: '10:30' },
    { id: 2, table: 3, status: 'Lista', items: ['Grilled Salmon', 'Wine'], time: '10:35' },
    { id: 3, table: 8, status: 'Nueva orden', items: ['Pizza Margherita', 'Tiramisu'], time: '10:40' },
];

const recommendedDishes = [
    {
        id: 1,
        name: 'Risotto de Trufa', // name translated to 'name' (name)
        price: 28.99,
        description: 'Arroz Arborio cremoso con trufa negra y parmesano',
        image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?q=80&w=2070?auto=format&fit=crop&q=80&w=400',
        tags: ['Especial del Chef', 'Vegetariano'], // tags translated to 'tags' (tags)
        allergens: ['Lácteos'], // allergens translated to 'allergens' (allergens)
    },
    {
        id: 2,
        name: 'Pulpo a la Plancha',
        price: 32.99,
        description: 'Estilo mediterráneo con aceite de oliva y hierbas',
        image: 'https://images.unsplash.com/photo-1526243070121-8040f7c9cc1c?q=80&w=1932?auto=format&fit=crop&q=80&w=400',
        tags: ['Tendencia', 'Mariscos'],
        allergens: ['Mariscos'],
    },
    {
        id: 3,
        name: 'Hamburguesa de Carne Wagyu',
        price: 26.99,
        description: 'Carne de res premium con cebollas caramelizadas y alioli de trufa',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400',
        tags: ['Más Popular', 'Especialidad'],
        allergens: ['Gluten', 'Lácteos', 'Huevos'],
    },
];

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48) / 2;

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
    const renderDish = ({ item }: { item: typeof recommendedDishes[0] }) => (
        <View style={[styles.dishCard, { width: COLUMN_WIDTH - 20 }]}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.dishImage}
                    defaultSource={require('../../assets/images/missing-image.png')}
                />
                <View style={styles.tagsContainer}>
                    {item.tags.map((tag, index) => (
                        <View key={index.toPrecision(1)} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.dishInfo}>
                <View style={styles.dishHeader}>
                    <Text style={styles.dishName}>{item.name}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
                <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                </Text>
                <View style={styles.allergensContainer}>
                    {item.allergens.map((allergen, index) => (
                        <View key={index.toPrecision()} style={styles.allergenTag}>
                            <Text style={styles.allergenText}>{allergen}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );

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
                            renderItem={renderDish}
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
                            {recommendedDishes.map((order) => (
                                renderDish({ item: order })
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
    notificationCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    notificationText: {
        fontSize: 14,
        color: '#4B5563',
        marginBottom: 4,
    },

    columnWrapper: {
        justifyContent: 'space-between',
    },
    flatListContent: {
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    dishCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        margin: 8, // Add margin to create gap between items
    },

    imageContainer: {
        position: 'relative',
        height: 120,
    },
    dishImage: {
        width: '100%',
        height: '100%',
    },
    tagsContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
    },
    tag: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 4,
        marginBottom: 4,
    },
    tagText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '500',
    },
    dishInfo: {
        padding: 12,
    },
    dishHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    dishName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        flex: 1,
        marginRight: 8,
    },
    price: {
        fontSize: 14,
        fontWeight: '600',
        color: '#059669',
    },
    description: {
        fontSize: 12,
        color: '#4B5563',
        marginBottom: 8,
    },
    allergensContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    allergenTag: {
        backgroundColor: '#FEE2E2',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    allergenText: {
        fontSize: 10,
        color: '#DC2626',
    },
});