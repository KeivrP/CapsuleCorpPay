import { OnBoardingImg1 } from '@/assets/login/onBoardingImg1';
import { OnBoardingImg2 } from '@/assets/login/onBoardingImg2';
import { ThemedText } from '@/components/ThemedText';
import { disabledColor, primaryColor } from '@/constants/Colors';
import { Link } from 'expo-router';

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';


const onBoardindScreen1 = () => {

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 2;

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < totalPages; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            currentPage === i && styles.activeDot,
          ]}
        />
      );
    }
    return dots;
  };

  function next() {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  function back() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  const viewOnboarding = () => {
    if (currentPage === 0) {
      return (
        <View style={styles.container}>
          {OnBoardingImg1()}
          <ThemedText type='title' style={styles.text} >We are into automating Microfinance in World</ThemedText>
          <View style={styles.dotsContainer}>
            {renderDots()}
          </View>
          <View style={styles.button}>
            <TouchableOpacity disabled onPress={() => console.log('OnBoardingScreen2')}>
              <ThemedText style={{ color: disabledColor }}>Skip</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => next()}>
              <ThemedText>Next</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    if (currentPage === 1) {
      return (
        <View style={styles.container}>
          <View style={styles.image}>
            {OnBoardingImg2()}
          </View>
          <ThemedText type='title' style={styles.text} >CapsuleCorpPay is a Microfinance business  Software
          </ThemedText>
          <View style={styles.dotsContainer}>
            {renderDots()}
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => back()}>
              <ThemedText >Back</ThemedText>
            </TouchableOpacity>
            <Link push href="/(auth)/LoginScreen">
              <ThemedText >Next</ThemedText>
            </Link>
          </View>
        </View>
      )
    }
  }

  return (
    <>
      {viewOnboarding()}
    </>

  );
};

export default onBoardindScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {

  },
  text: {
    textAlign: 'center',
    width: '90%',
    paddingVertical: 92,
    fontFamily: 'Poppins-Bold',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute', // Position it at the bottom
    bottom: heightPercentageToDP(25), // Adjust as needed
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: primaryColor,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    position: 'absolute', // Position it at the bottom
    bottom: heightPercentageToDP(10), // Adjust as needed
  }
});
