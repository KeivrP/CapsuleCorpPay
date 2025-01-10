import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { CartItem, Product } from './interface';
import { LinearGradient } from 'react-native-linear-gradient';
import styled from 'styled-components';

// ProductSearch Component
interface ProductSearchProps {
  readonly onSearch: (query: string) => void;
}

export function ProductSearch({ onSearch }: Readonly<ProductSearchProps>) {
  return (
    <View style={styles.searchContainer}>
      <Feather name="search" size={16} style={styles.searchIcon} />
      <TextInput
        placeholder="Buscar Productos..."
        style={styles.searchInput}
        onChangeText={onSearch}
      />
    </View>
  );
}

// ProductList Component
interface ProductListProps {
  readonly products: Product[];
  readonly onAddToCart: (product: Product) => void;
  readonly onRemoveFromCart: (product: Product) => void;
  readonly cartItems: CartItem[];
}

const ImageContainer = styled(View)`
  overflow: hidden;
  position: relative;
  border-radius: 8px;
`;

const ImageOverlay = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

export function ProductList({ products, onAddToCart, onRemoveFromCart, cartItems }: Readonly<ProductListProps>) {
  const getQuantity = (productId: string) => {
    const item = cartItems.find(item => item.id === productId);
    return item?.quantity ?? 0;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {products.map((product, index) => (
        <Animated.View
          key={product.id}
          entering={FadeInDown.delay(index * 100)}
          style={styles.productCard}
        >
          <ImageContainer>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <ImageOverlay
              colors={['rgba(0,0,0,0.2)', 'transparent', 'rgba(0,0,0,0.2)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </ImageContainer>
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPricePerUnit}>Lorem ipsum dolor sit amet consectetur adipisicing elit.  / kg</Text>
            <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actionContainer}>
            <Pressable
              disabled={getQuantity(product.id) === 0}
              style={({ pressed }) => [styles.actionButton, pressed && styles.buttonPressed]}
              onPress={() => onRemoveFromCart(product)}
            >
              <Text style={styles.actionButtonText}>-</Text>
            </Pressable>
            <Text style={styles.quantityText}>{getQuantity(product.id)}</Text>
            <Pressable
              style={({ pressed }) => [styles.actionButton, pressed && styles.buttonPressed]}
              onPress={() => onAddToCart(product)}
            >
              <Text style={styles.actionButtonText}>+</Text>
            </Pressable>
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff15',
    borderRadius: 8,
    marginBottom: 16,
  },
  searchIcon: {
    marginLeft: 12,
  },
  searchInput: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  container: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff10',
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  productCard: {
    width: '25%', // Para que haya dos columnas
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  productDetails: {
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  productPricePerUnit: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#0f065a',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonPressed: {
    opacity: 0.8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#0f065a',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 20,
    textAlign: 'center',
  },
});