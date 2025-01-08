import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ScratchCard from './components/scratchcard';

const windowInitial = Dimensions.get('window');


export default function ProfileScreen() {
  const [dimensions, setDimensions] = useState({ window: windowInitial });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ window });
    });
    return () => subscription?.remove();
  });

  return (
    <SafeAreaView>
      <GestureHandlerRootView>
        <View
          style={[
            styles.root,
            {
              width: dimensions.window.width,
              height: dimensions.window.height,
            },
          ]}>
          <ScratchCard />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
