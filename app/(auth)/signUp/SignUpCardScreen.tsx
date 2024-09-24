import { ThemedText } from '@/components/ThemedText';
import { primaryColor } from '@/constants/Colors';
import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import CreditCard from '../components/creditCardInput';

const SignUpCardScreen = () => {

    const route = useRouter();

    return (
        <>
            <View style={styles.container}>
                <View>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => route.back()}>
                            <FontAwesome6 name="angle-left" size={24} color={primaryColor} />
                        </TouchableOpacity>
                        <ThemedText type='headerText'>Sign Up Via Credit  </ThemedText>
                    </View>
                    <CreditCard />
                </View>


            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: heightPercentageToDP('4%'),
        flex: 1,
        padding: widthPercentageToDP(8),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 25,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        width: '100%',
        height: heightPercentageToDP(25),
        marginBottom: 10,
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 22,
        elevation: 10, // For Android
    },
    iconContainer: {
        backgroundColor: '#F0F0F0',
        width: 60,
        height: 60,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,

    },
    cardTitle: {
        fontSize: 18,
        marginLeft: 10,
    },
    cardDescription: {
        fontSize: 14,
    },
});

export default SignUpCardScreen;