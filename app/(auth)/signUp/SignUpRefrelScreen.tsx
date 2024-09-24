import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome6, Ionicons } from '@expo/vector-icons'; // O cualquier otra librería de iconos que prefieras
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { ThemedText } from '@/components/ThemedText';
import { primaryColor } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { InstantSignup } from '@/components/svg/InstantSignUp';
import CreditSignUp from '../components/creditSignUpSheet';
import { BottomModalRef } from '@/components/BottomSheet';
import { ButtonBrand } from '@/components/button/ButtonBrand';
import { QRScanner } from '@/components/qr/ScanerQrSignUp';

const SignUpRefrel = () => {
    const modalRef = useRef<BottomModalRef>(null);
    const route = useRouter();

    const data = [
        {
            icon: <View style={styles.iconContainer}>
                <InstantSignup width={51} height={51} />
            </View>,
            title: 'Scan QR',
            description: 'Did someone help you signup for mobile banking? Scan their QR below',
            path: () => route.push('/(auth)/signUp/signUpQrScreen'),
        }];


    return (
        <>
        <View style={styles.container}>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => route.back()}>
                        <FontAwesome6 name="angle-left" size={24} color={primaryColor} />
                    </TouchableOpacity>
                    <ThemedText type='headerText'>Refrel Code </ThemedText>
                </View>

            </View>

            <View style={{ flex: 1, marginTop: heightPercentageToDP(6), gap: 35, alignItems: 'center' }}>
                {data.map((item, index) => (
                        <View key={index} style={[styles.card, styles.shadow]}>
                            {item.icon}
                            <View style={styles.cardHeader}>
                                <ThemedText type='signUp'>{item.title}</ThemedText>
                            </View>
                            <View style={{ alignItems: 'center', }}>
                                <ThemedText type='subtitle1' style={{ alignItems: 'center', textAlign: 'center', paddingHorizontal: 60 }} >
                                    {item.description}
                                </ThemedText>
                            </View>
                            <ButtonBrand text="Scan Now" backgroundColor={primaryColor} textColor='white' width={40} style={{borderRadius: 20, marginTop: 20}} onPress={() => item.path()}   />
                        </View>
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
        marginBottom: 10,
        alignContent: 'center',
        alignItems: 'center',
        padding: 30,
        width: '100%',
        minHeight: heightPercentageToDP(24),
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 22,
        elevation: 10, // For Android
    },
    iconContainer: {
        backgroundColor: 'transparent',

        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

});

export default SignUpRefrel;