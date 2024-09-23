import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'transparent', dark: 'transparent' }}
      headerImage={

          <ThemedView style={styles.container}>
  
            <ThemedView style={styles.textContainer}>
              <ThemedText style={styles.greeting}>Hello</ThemedText>
              <ThemedText style={styles.name}>Ibrahim</ThemedText>
            </ThemedView>
            {/* Aquí puedes agregar el icono de búsqueda si lo necesitas */}
          </ThemedView>

      }>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 100,
    width: 185,

  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Para hacer la imagen circular
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
  },
  greeting: {
    fontSize: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
