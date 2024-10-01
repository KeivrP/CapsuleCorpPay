import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { primaryColor } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Path, Svg } from 'react-native-svg';
import SearchBar from '@/components/input/inputSearchDeafult';
import PaymentNFCSheet from './paymentNFC';
import { BottomModalRef } from '@/components/BottomSheet';

export default function PaymentScreen() {
  const route = useRouter();
  const modalRef = useRef<BottomModalRef>(null);


  const data = [
    {
      title: 'Zinli',
      borderColor: '#B3EBD9',
      color: 'transparent',
      img: <Image source={require('../../../../components/img/zinli.png')} style={{ width: 59, height: 30, }} />,
    },
    {
      title: 'Paypal',
      borderColor: 'rgb(161, 129, 249)',
      color: 'transparent',
      img: <Image source={require('../../../../components/img/paypal.png')} style={{ width: 45, height: 45, }} />,
    },
    {
      title: 'Deposits USD',
      borderColor: '#F3B21F',
      color: 'transparent',
      img: <Image source={require('../../../../components/img/deposit.png')} style={{ width: 45, height: 45, }} />,   
    },
    {
      title: 'Payment NFC',
      borderColor: '#B56d',
      color: 'transparent',
      img: <Image source={require('../../../../components/img/nfc.png')} style={{ width: 45, height: 45, }} />,
      onPress: () => modalRef.current?.open(),
    },
  ]

  const setUpPayment = ({ title, borderColor, color, img, onPress }: { title: string, borderColor: string, color: string, img: any, onPress?: () => void }) => {
    return (
      <View style={[styles.connectedAccount, { borderColor: borderColor, borderWidth: 1, minHeight: heightPercentageToDP('9%'), marginBottom: heightPercentageToDP('8%') }]}>
        <TouchableOpacity style={styles.paymentOption} onPress={onPress}>
          <View style={[styles.logoContainer, { backgroundColor: color, borderRadius: 8, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]}>
            {img}
          </View>
          <View style={styles.paymentInfo}>
            <ThemedText type='textPayment'>{title}</ThemedText>
          </View>
        </TouchableOpacity>
      </View>

    )

  }

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 25 }}>

      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => route.back()}>
          <FontAwesome6 name="angle-left" size={24} color={primaryColor} />
        </TouchableOpacity>
        <ThemedText type='headerText'>Payment </ThemedText>
      </View>

      <View style={styles.container}>
        <ThemedText type='subtitle' style={{ fontWeight: 'regular', paddingHorizontal: 10, paddingBottom: 0, paddingTop: heightPercentageToDP('5%') }}>Connect with Bank Account</ThemedText>
        <ThemedText type='subtitle3' style={{ fontWeight: 'regular',  paddingHorizontal: 10, paddingBottom: 0, color: 'gray' }}>Search or select recipents bank</ThemedText>
        <SearchBar/>
       
        <ThemedText type='subtitle' style={{ fontWeight: 'regular', padding: 10, paddingVertical: heightPercentageToDP('3%'), color: 'gray' }}>All Banks</ThemedText>

        {/* Opciones de pago */}
        {data.map((item, index) => (
          <View key={index}>
            {setUpPayment(item)}
          </View>
        ))}


        {/* Navegación inferior */}

      </View>
      <PaymentNFCSheet modalRef={modalRef} />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
    paddingHorizontal: 10,
  },
  connectedAccount: {
    flex: 1,
    paddingHorizontal: heightPercentageToDP('2%'),
    paddingVertical: heightPercentageToDP('1.4%'),
    maxHeight: heightPercentageToDP('9%'),
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 10, // Android-specific elevation
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    width: 58,
    height: 58,
    marginRight: 16,
    borderRadius: 8,
    justifyContent: 'center', alignContent: 'center', alignItems: 'center',
    backgroundColor: '#2B7AE3',
    // Aquí puedes agregar estilos para el contenedor del logo
  },
  accountInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentOptions: {
    flex: 1,
    paddingHorizontal: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentInfo: {
    flex: 1,
    marginLeft: 16,
  },
  bottomNav: {
    // ... otros estilos
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  accountName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentAmount: {
    fontSize: 17,
    color: '#888',
    fontWeight: 'light',
    fontFamily: 'Poppins-Regular',
  },
  // ... otros estilos
});