import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { primaryColor } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Path, Svg } from 'react-native-svg';

export default function FinanceScreen() {
  const route = useRouter();

  const data = [
    {
      title: 'Regular Payment',
      amount: 200,
      borderColor: '#B3EBD9',
      color: '#B3EBD9',
      img: (<Svg width="23" height="23" viewBox="0 0 23 23" fill="none" >
        <Path d="M5.65625 12.2969H11.4893C11.6611 12.2969 11.8008 12.2396 11.9082 12.125C12.0228 12.0104 12.0801 11.8708 12.0801 11.7061V4.17578C12.0801 4.01107 12.0228 3.875 11.9082 3.76758C11.8008 3.65299 11.6611 3.5957 11.4893 3.5957C11.3317 3.5957 11.1956 3.65299 11.0811 3.76758C10.9665 3.875 10.9092 4.01107 10.9092 4.17578V11.126H5.65625C5.48438 11.126 5.34115 11.1833 5.22656 11.2979C5.11914 11.4124 5.06543 11.5485 5.06543 11.7061C5.06543 11.8708 5.11914 12.0104 5.22656 12.125C5.34115 12.2396 5.48438 12.2969 5.65625 12.2969ZM11.5 22.0186C12.9753 22.0186 14.361 21.7357 15.6572 21.1699C16.9606 20.6113 18.1064 19.8379 19.0947 18.8496C20.083 17.8542 20.86 16.7083 21.4258 15.4121C21.9915 14.1087 22.2744 12.7194 22.2744 11.2441C22.2744 9.76888 21.9915 8.38314 21.4258 7.08691C20.86 5.78353 20.083 4.6377 19.0947 3.64941C18.1064 2.65397 16.9606 1.87695 15.6572 1.31836C14.3538 0.752604 12.9645 0.469727 11.4893 0.469727C10.014 0.469727 8.62467 0.752604 7.32129 1.31836C6.02507 1.87695 4.88281 2.65397 3.89453 3.64941C2.90625 4.6377 2.12923 5.78353 1.56348 7.08691C1.00488 8.38314 0.725586 9.76888 0.725586 11.2441C0.725586 12.7194 1.00488 14.1087 1.56348 15.4121C2.12923 16.7083 2.90625 17.8542 3.89453 18.8496C4.88997 19.8379 6.03581 20.6113 7.33203 21.1699C8.63542 21.7357 10.0247 22.0186 11.5 22.0186ZM11.5 20.6328C10.1966 20.6328 8.97917 20.3893 7.84766 19.9023C6.71615 19.4154 5.7207 18.7422 4.86133 17.8828C4.00195 17.0234 3.32878 16.028 2.8418 14.8965C2.36198 13.7578 2.12207 12.5404 2.12207 11.2441C2.12207 9.94792 2.36198 8.73405 2.8418 7.60254C3.32878 6.46387 3.99837 5.46484 4.85059 4.60547C5.70996 3.73893 6.7054 3.06576 7.83691 2.58594C8.97559 2.09896 10.193 1.85547 11.4893 1.85547C12.7926 1.85547 14.0101 2.09896 15.1416 2.58594C16.2731 3.06576 17.2686 3.73893 18.1279 4.60547C18.9945 5.46484 19.6712 6.46387 20.1582 7.60254C20.6452 8.73405 20.8887 9.94792 20.8887 11.2441C20.8887 12.5404 20.6452 13.7578 20.1582 14.8965C19.6784 16.028 19.0088 17.0234 18.1494 17.8828C17.29 18.7422 16.291 19.4154 15.1523 19.9023C14.0137 20.3893 12.7962 20.6328 11.5 20.6328Z" fill="#0ABB85" />
      </Svg>

      ),
      onPress: () => route.navigate('/(tabs)/finance/components/paymentScreen')
    },
    {
      title: 'Round-ups',
      amount: 200,
      borderColor: 'rgb(161, 129, 249)',
      color: '#EEE8FF',
      img: (
        <Svg width="22" height="25" viewBox="0 0 22 25" fill="none">
          <Path d="M0.225586 13.2549C0.225586 19.1523 5.10254 24.0293 11 24.0293C16.8975 24.0293 21.7744 19.1523 21.7744 13.2549C21.7744 9.55957 19.8516 6.27246 16.9619 4.33887C16.5967 4.05957 16.1562 4.15625 15.9521 4.48926C15.748 4.83301 15.8555 5.21973 16.1885 5.4668C18.7129 7.13184 20.3779 9.98926 20.3887 13.2549C20.3887 18.4541 16.1992 22.6436 11 22.6436C5.80078 22.6436 1.62207 18.4541 1.62207 13.2549C1.62207 8.73242 4.79102 4.9834 9.02344 4.0918V5.85352C9.02344 6.47656 9.45312 6.65918 9.95801 6.30469L13.2988 3.96289C13.7178 3.66211 13.7285 3.24316 13.2988 2.94238L9.96875 0.600586C9.45312 0.246094 9.02344 0.417969 9.02344 1.05176V2.66309C4.0498 3.59766 0.225586 8.02344 0.225586 13.2549ZM6.12305 13.2441C6.12305 13.6309 6.41309 13.9209 6.83203 13.9209H10.3125V17.4121C10.3125 17.8203 10.5918 18.1104 10.9893 18.1104C11.3975 18.1104 11.6982 17.8203 11.6982 17.4121V13.9209H15.1787C15.5869 13.9209 15.877 13.6309 15.877 13.2441C15.877 12.8252 15.5977 12.5352 15.1787 12.5352H11.6982V9.05469C11.6982 8.63574 11.3975 8.3457 10.9893 8.3457C10.5918 8.3457 10.3125 8.64648 10.3125 9.05469V12.5352H6.83203C6.40234 12.5352 6.12305 12.8252 6.12305 13.2441Z" fill="#A181F9" />
        </Svg>
      )
    },
    {
      title: 'Additional payments',
      amount: 200,
      borderColor: '#F3B21F',
      color: '#FFECC2',
      img: (
        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
          <Path d="M0.298828 9.24414C0.298828 9.44466 0.370443 9.61654 0.513672 9.75977C0.656901 9.89583 0.825195 9.96387 1.01855 9.96387H8.28027V17.2256C8.28027 17.4189 8.34831 17.5872 8.48438 17.7305C8.6276 17.8737 8.79948 17.9453 9 17.9453C9.20052 17.9453 9.3724 17.8737 9.51562 17.7305C9.65885 17.5872 9.73047 17.4189 9.73047 17.2256V9.96387H16.9707C17.1712 9.96387 17.3431 9.89583 17.4863 9.75977C17.6296 9.61654 17.7012 9.44466 17.7012 9.24414C17.7012 9.04362 17.6296 8.87174 17.4863 8.72852C17.3431 8.58529 17.1712 8.51367 16.9707 8.51367H9.73047V1.2627C9.73047 1.06934 9.65885 0.901042 9.51562 0.757812C9.3724 0.614583 9.20052 0.542969 9 0.542969C8.79948 0.542969 8.6276 0.614583 8.48438 0.757812C8.34831 0.901042 8.28027 1.06934 8.28027 1.2627V8.51367H1.01855C0.825195 8.51367 0.656901 8.58529 0.513672 8.72852C0.370443 8.87174 0.298828 9.04362 0.298828 9.24414Z" fill="#F3B21F" />
        </Svg>

      )
    },
  ]

  const setUpPayment = ({ title, amount, borderColor, color, img, onPress }: { title: string, amount: number, borderColor: string, color: string, img: any, onPress?: () => void }) => {
    return (
      <View style={[styles.connectedAccount, { borderColor: borderColor, borderWidth: 1, minHeight: heightPercentageToDP('9%'), marginBottom: heightPercentageToDP('8%') }]}>
        <TouchableOpacity style={styles.paymentOption} onPress={onPress}>
          <View style={[styles.logoContainer, { backgroundColor: color, borderRadius: 8, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]}>
            {img}
          </View>
          <View style={styles.paymentInfo}>
            <ThemedText type='textPayment'>{title}</ThemedText>
            <ThemedText style={styles.paymentAmount}>${amount}</ThemedText>
          </View>
          <MaterialIcons name="chevron-right" size={24} />
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
        <ThemedText type='headerText'>Finance </ThemedText>
      </View>

      <View style={styles.container}>
        <ThemedText type='subtitle' style={{ fontWeight: 'regular', padding: 10, paddingVertical: 20 }}>Connected Account</ThemedText>
        {/* Cuenta conectada */}
        <View style={styles.connectedAccount}>
          <TouchableOpacity style={styles.accountItem}>
            <View style={styles.logoContainer}>
              <Image source={require('../../../components/img/mercantil.png')} style={{ width: 45, height: 45, }} />
            </View>
            <View style={styles.accountInfo}>
              <Text style={styles.accountName}>Mercantil</Text>
              <MaterialIcons name="chevron-right" size={28} color={primaryColor} />
            </View>
          </TouchableOpacity>
        </View>
        <ThemedText type='subtitle' style={{ fontWeight: 'regular', padding: 10, paddingVertical: heightPercentageToDP('3%') }}>Set up a payment</ThemedText>

        {/* Opciones de pago */}
        {data.map((item, index) => (
          <View key={index}>
            {setUpPayment(item)}
          </View>
        ))}


        {/* Navegación inferior */}

      </View>
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