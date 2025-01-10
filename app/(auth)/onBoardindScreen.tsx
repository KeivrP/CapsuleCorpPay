import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

interface Slide {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

type NavigationProp = {
  navigate: (screen: string) => void;
};

const slides: Slide[] = [
  {
    id: '1',
    title: '¡Bienvenido a Domus!',
    description: 'Simplifica la gestión de tu comercio. Con Domus, asegura tu negocio y controla tus operaciones de forma fácil y segura.',
    icon: 'tablet',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    title: 'Conectate en segundos',
    description: 'Regístrata tu cuenta en pocos pasos y activa la seguridad con un PIN único para cada operador. Tus datos siempre estarán protegidos.',
    icon: 'user-plus',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    title: '¡Listo para empezar!',
    description: 'Explora todas las funciones de Domus y optimiza la gestión de tu comercio. ¡Comienza ahora!',
    icon: 'play-circle',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000'
  }
];

const onboardingScreen: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const flatListRef = useRef<FlatList<Slide>>(null);
  const navigation = useNavigation<NavigationProp>();

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={[styles.slide, { width }]}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Icon 
            name={item.icon}
            size={80}
            color="#FFFFFF"
          />
        </View>
      </View>

      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </View>
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentSlide(index);
  };

  const goToSlide = (index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
    setCurrentSlide(index);
  };

  const getItemLayout = (_: ArrayLike<Slide> | null | undefined, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={["#0f065a", "#B2B5DE", "#C8CCE8"]}
        style={styles.gradient}
      >
        <View style={styles.card}>
          <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        getItemLayout={getItemLayout}
          />

          <View style={styles.navigation}>
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <TouchableOpacity
          key={index.toPrecision(1)}
          onPress={() => goToSlide(index)}
          style={[
            styles.dot,
            currentSlide === index && styles.activeDot,
          ]}
            />
          ))}
        </View>

        {currentSlide === slides.length - 1 ? (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => goToSlide(currentSlide + 1)}
            style={styles.navButton}
          >
            <Text style={styles.navButtonText}>Siguiente</Text>
            <Icon name="chevron-right" size={24} color="#4B5563" />
          </TouchableOpacity>
        )}
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: height * 0.9,
  },
  slide: {
    height: '100%',
  },
  imageContainer: {
    height: '50%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  navigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    height: 140,
    backgroundColor: 'white',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    height: 32,
    alignItems: 'center',
    marginBottom: 16,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D1D5DB',
  },
  activeDot: {
    width: 32,
    backgroundColor: '#0f065a',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    height: 48,
    width: '100%',
  },
  navButtonText: {
    color: '#4B5563',
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#0f065a',
    height: 48,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default onboardingScreen;