import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome6, Ionicons } from '@expo/vector-icons'; // O cualquier otra librería de iconos que prefieras
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { ThemedText } from '@/components/ThemedText';
import { primaryColor } from '@/constants/Colors';
import { CreditSignup } from '@/components/svg/CreditSignup';
import { useRouter } from 'expo-router';
import { InstantSignup } from '@/components/svg/InstantSignUp';
import CreditSignUp from '../components/creditSignUpSheet';
import { BottomModalRef } from '@/components/BottomSheet';

const SignUpScreen = () => {
    const modalRef = useRef<BottomModalRef>(null);
    const route = useRouter();

    const data = [{
        icon:
            <View style={styles.iconContainer}>
                <CreditSignup />
            </View>,
        title: 'Sign Up Via Credit',
        description: 'Describe your sign up process here. For example, sign up right now and signup bonus lorem ipsum text for example.',
        path: () => modalRef.current?.open(),
    }, {
        icon: <View style={styles.iconContainer}>
            <InstantSignup />
        </View>,
        title: 'Instant Sign Up',
        description: 'Describe your sign up process here. For example, sign up right now and signup bonus lorem ipsum text for example.',
        path: () => route.push('/(auth)/signUp/SignUpRefrelScreen'),
    }];


    return (
        <>
            <View style={styles.container}>
                <View>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => route.back()}>
                            <FontAwesome6 name="angle-left" size={24} color={primaryColor} />
                        </TouchableOpacity>
                        <ThemedText type='headerText'>Sign Up </ThemedText>
                    </View>
                    <ThemedText type='subtitle1' style={{ width: '80%', marginTop: heightPercentageToDP(-2), marginLeft: widthPercentageToDP(9) }}>
                        Sign up for sade, secure and instant banikng
                        with CapsuleCorpPay
                    </ThemedText>
                </View>

                <View style={{ flex: 1, marginTop: heightPercentageToDP(6), gap: 35 }}>
                    {data.map((item, index) => (
                        <TouchableOpacity key={index} onPress={item.path}>
                            <View key={index} style={[styles.card, styles.shadow]}>
                                {item.icon}
                                <View style={styles.cardHeader}>
                                    <ThemedText type='signUp'>{item.title}</ThemedText>
                                </View>
                                <ThemedText type='subtitle1' >
                                    {item.description}
                                </ThemedText>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <CreditSignUp modalRef={modalRef} />
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

export default SignUpScreen;