import { ThemedText } from '@/components/ThemedText';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const LoansHome = () => {
    return (
        <View style={styles.notificationContainer}>
            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity style={styles.infoButton}>
                    <Ionicons name="information-circle-outline" size={24} color="gray" />
                </TouchableOpacity>
                <ThemedText type='subtitle3'>
                    Add your loans to unlock full features
                </ThemedText>
            </View>

            <TouchableOpacity style={styles.arrowButton}>
                <MaterialCommunityIcons name="arrow-right-bold-box-outline" size={24} color="#00214E" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    notificationContainer: {
        backgroundColor: '#ffff',
        padding: 12,
        elevation: 5,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoButton: {
        marginRight: 10,
    },
    notificationText: {
        flex: 1,
    },
    arrowButton: {
        marginLeft: 10,
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        alignItems: 'flex-end',
    },
});

export default LoansHome;