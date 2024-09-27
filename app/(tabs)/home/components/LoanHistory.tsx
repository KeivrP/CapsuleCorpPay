import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import Svg, { Path } from 'react-native-svg';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const LoanHistoryCard = () => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Svg width="26" height="21" viewBox="0 0 26 21" fill="none" >
                    <Path d="M21.7344 20.7115C22.1162 21.0962 22.7337 21.0962 23.0791 20.7116L25.6791 18.0857C25.8984 17.901 26 17.6503 26 17.3893C26 17.1279 25.8984 16.8759 25.6791 16.7282L23.0791 14.1019C22.7337 13.6833 22.1162 13.6833 21.7344 14.1019C21.3566 14.4507 21.3566 15.0745 21.7344 15.4602L22.6728 16.4409H15.6C15.0597 16.4409 14.625 16.8472 14.625 17.3893C14.625 17.933 15.0597 18.3741 15.6 18.3741L22.6728 18.4107L21.7344 19.3188C21.3566 19.7033 21.3566 20.327 21.7344 20.7115ZM4.22906 5.56649L3.32881 4.58574L10.3634 4.62267C10.9403 4.62267 11.3384 4.14665 11.3384 3.63781C11.3384 3.05921 10.9403 2.65296 10.3634 2.65296L3.32922 2.61602L4.22906 1.6722C4.64344 1.28647 4.64344 0.662725 4.22906 0.313923C3.88375 -0.104641 3.26625 -0.104641 2.88559 0.313923L0.285553 2.94021C0.1027 3.08793 -4.0613e-05 3.33825 1.20432e-08 3.63781C1.20432e-08 3.86351 0.102741 4.11383 0.285594 4.29849L2.88559 6.92477C3.26625 7.3064 3.88375 7.3064 4.22906 6.92477C4.64344 6.53903 4.64344 5.91529 4.22906 5.56649ZM3.86344 18.3737H13.7272C13.5728 18.0791 13.4875 17.7442 13.4875 17.4258C13.4875 16.2111 14.4341 15.2919 15.6 15.2919H19.5447C19.6787 14.5369 20.1053 13.9214 20.6944 13.5356C20.7634 13.4371 20.8447 13.3427 20.93 13.2525C21.7547 12.4194 23.0953 12.4194 23.92 13.2525L24.7 14.0445V5.24231C24.7 3.79375 23.5341 2.61602 22.1 2.61602H12.2728C12.4272 2.91148 12.4759 3.24387 12.4759 3.63781C12.4759 4.7786 11.5659 5.77167 10.3634 5.77167L6.45531 5.73474C6.31719 6.45286 5.89469 7.06839 5.30562 7.45413C5.23656 7.55262 5.15531 7.647 5.07 7.73728C4.24531 8.5703 2.90631 8.5703 2.08122 7.73728L1.26344 6.94529V15.7474C1.26344 17.1981 2.46391 18.3737 3.86344 18.3737ZM3.86344 13.1212C5.33406 13.1212 6.46344 14.2989 6.46344 15.7474H3.86344V13.1212ZM22.1 5.24231V7.86859C20.6659 7.86859 19.5 6.69087 19.5 5.24231H22.1ZM12.9634 6.55545C15.1531 6.55545 16.9 8.31998 16.9 10.4949C16.9 12.7067 15.1531 14.4343 12.9634 14.4343C10.8103 14.4343 9.06344 12.7067 9.06344 10.4949C9.06344 8.31998 10.8103 6.55545 12.9634 6.55545Z" fill="#0ABB85" />
                </Svg>
                <View style={styles.addIconContainer}>
                    <MaterialIcons name="add" size={24} color="white" />
                </View>
            </View>
            <View style={styles.body}>
                <ThemedText type='subtitle3' style={{ fontWeight: 'bold' }}>Loan History</ThemedText>

                <View style={styles.amountContainer}>
                    <ThemedText type='subtitle3' style={{ fontWeight: 'bold' }}>55,000</ThemedText>
                    <View style={styles.statusContainer}>
                        <ThemedText style={[styles.status, styles.rejected]}>Rejected</ThemedText>
                    </View>
                </View>
                <View style={styles.amountContainer}>
                    <ThemedText type='subtitle3' style={{ fontWeight: 'bold' }}>36,600</ThemedText>
                    <View style={styles.statusContainer}>
                        <ThemedText style={[styles.status, styles.clear]}>Clear</ThemedText>
                    </View>
                </View>
                <View style={styles.amountContainer}>
                    <ThemedText type='subtitle3' style={{ fontWeight: 'bold' }}>85,000</ThemedText>
                    <View style={styles.statusContainer}>
                        <ThemedText style={[styles.status, styles.disburse]}>Disburse</ThemedText>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 24,
        paddingVertical: 30,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: '100%',
        height: heightPercentageToDP(30),
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addIconContainer: {
        backgroundColor: 'lightgray',
        padding: 8,
        borderRadius: 14,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    body: {
        marginTop: 16,
    },
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    amount: {
        fontSize: 14,
    },
    statusContainer: {
        padding: 4,
        borderRadius: 4,
    },
    status: {

        fontSize: 11,
        fontWeight: 'bold',
    },
    rejected: {
        borderRadius: 16,
        paddingHorizontal: 8,
        backgroundColor: '#FFDFDF',
        color: '#B02929',
    },
    clear: {
        borderRadius: 16,
        paddingHorizontal: 8,
        backgroundColor: '#EBFAF5',
        color: '#0ABB85',
    },
    disburse: {
        borderRadius: 16,
        paddingHorizontal: 8,
        backgroundColor: '#0ABB85',
        color: 'white',
    },
});

export default LoanHistoryCard;