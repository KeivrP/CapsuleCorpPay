import { Image, StyleSheet, Platform, View, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSession } from '@/context/AuthSession';

export default function FinanceScreen() {

  const { signOut } = useSession();
  return (

    <View style={styles.container}>
      <TouchableOpacity onPress={() => signOut()}>
        <HelloWave />
      </TouchableOpacity>
    </View>
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
    flex: 1,
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
