import { Link, Stack } from 'expo-router';
import { StyleSheet, Image, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [bounceValue]);

  const bounce = bounceValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  return (
    <>
      <Stack.Screen options={{ title: '¡Oops!' }} />
      <ThemedView style={styles.container}>
        <Animated.View style={{ transform: [{ translateY: bounce }] }}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.image}
          />
        </Animated.View>
        <ThemedText type="title">Esta pantalla no existe.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">¡Ir a la pantalla principal!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
