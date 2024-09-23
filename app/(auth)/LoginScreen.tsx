
import { GestureIcon } from '@/components/animated/GestureIcon';
import { BottomModalRef } from '@/components/BottomSheet';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import MoreScreen from './components/moreScreen';

const Login = () => {
  const modalRef = useRef<BottomModalRef>(null);

  return (
    <>
      <View style={styles.container}>
        <GestureIcon />
        <View style={styles.button}>
          <TouchableOpacity onPress={() => modalRef.current?.open()}>
            <ThemedText type='signUp' >More</ThemedText>
          </TouchableOpacity>
          <Link push href="/(auth)/SignUpScreen">
            <ThemedText type='signUp' >Sign Up</ThemedText>
          </Link>
        </View>
      </View>
      <MoreScreen modalRef={modalRef} />
    </>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bodyContainer: {
    flexDirection: 'column',
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 18,
    width: '98%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
  },
  headerText: {
    color: '#000',
    fontSize: 30,
    marginBottom: 16
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    position: 'absolute', // Position it at the bottom
    bottom: heightPercentageToDP(10), // Adjust as needed

  }

});
