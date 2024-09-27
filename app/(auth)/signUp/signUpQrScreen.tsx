import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { FontAwesome6, Ionicons } from '@expo/vector-icons'; // Para el icono de la cámara
import { useFocusEffect, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { primaryColor } from '@/constants/Colors';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { UploadQr } from '@/components/svg/UploadQr';
import { QRScanner } from '@/components/qr/ScanerQrSignUp';
import { useSession } from '@/context/AuthSession';

const QRScannerScreen = () => {
    const [isVisble, setIsVisible] = useState(false);
    const [data, setData] = useState<string>('');

    const route = useRouter();


    useFocusEffect(
        useCallback(() => {
            if (data) {
                setIsVisible(false);
                route.navigate(`/(auth)/signUp/SignUpCreditSucces?token=${data}`);
            }
            else {
                setIsVisible(true);
            }
        }, [data])
    );



    return (
        <>
            <View style={styles.container}>
                <View>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => route.back()}>
                            <FontAwesome6 name="angle-left" size={24} color={primaryColor} />
                        </TouchableOpacity>
                        <ThemedText type='headerText'></ThemedText>
                    </View>

                </View>

                <QRScanner onScan={(e) => setData(e)} isVisble={isVisble} />
            </View>


            <View style={styles.footer}>
                <ThemedText type='defaultSemiBold' style={{ textAlign: 'center' }}>
                    Scan QR
                </ThemedText>
                <TouchableOpacity style={[styles.buttonUpload, { alignSelf: 'flex-start' }]}>
                    <UploadQr />
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#fff', // Puedes cambiar el color de fondo
        padding: 30,
        height: heightPercentageToDP(20),
        alignItems: 'center',
        elevation: 5,
    },
    buttonUpload: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'flex-end',
        elevation: 5,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    scanButton: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        marginTop: 10,
    },
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

export default QRScannerScreen;