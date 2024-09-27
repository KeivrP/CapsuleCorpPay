import { OnBoardingImg1 } from '@/assets/login/onBoardingImg1';
import { OnBoardingImg2 } from '@/assets/login/onBoardingImg2';
import { SectionProps, SectionsList } from '@/components/navigation/SectionList';
import { ThemedText } from '@/components/ThemedText';
import { disabledColor, primaryColor } from '@/constants/Colors';
import { Link } from 'expo-router';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { type FlatList } from 'react-native-gesture-handler';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const { width: windowWidth } = Dimensions.get('window');


const onBoardindScreen = () => {
  const flatListRef = useRef<FlatList | null>(null);
  const [positionX, setPositionX] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 2;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(Math.round(positionX / windowWidth));
    }, 50);
    return () => {
      clearTimeout(timer);
    };
  }, [positionX]);

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
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: currentPage + 1 });
      }
    }
  }

  function back() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: currentPage - 1 });
      }
    }
  }

  const items = useMemo<SectionProps[]>(
    () => [
      {
        description:
          'We are into automating Microfinance in World',

        img: OnBoardingImg1(),

      },
      {
        description:
          'CapsuleCorpPay is a Microfinance business  Software',
        img: OnBoardingImg2(),
      },

    ],
    []
  );


  const viewOnboarding = () => {
    if (currentPage === 0) {
      return (
        <View style={styles.container}>

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

      <SectionsList
        listRef={flatListRef}
        items={items}
        onScrollX={(x) => {
          setPositionX(x);
        }}
      />
      {viewOnboarding()}

    </>

  );
};

export default onBoardindScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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
