import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { SlideInUp } from 'react-native-reanimated';
import { ProductList, ProductSearch } from '@/components/payments/product-cart';
import { Product, CartItem } from '@/components/payments/interface';
import { ProductData } from '@/lib/payments';
import { Cart } from '@/components/payments/cart';

export default function OrderScreen() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleAddToCart = (product: Product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const handleRemoveFromCart = (product: Product) => {
        setCartItems(prev => 
            prev.map(item => 
                item.id === product.id 
                    ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    console.log(cartItems);

    const filteredProducts = ProductData.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <View style={styles.content}>
                <ProductSearch onSearch={setSearchQuery} />
                    <ProductList
                        products={filteredProducts}
                        onAddToCart={handleAddToCart}
                        onRemoveFromCart={handleRemoveFromCart}
                        cartItems={cartItems}
                    />
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        padding: 20,
        paddingTop: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
        maxHeight: '80%',
    },
    cartContainer: {

        maxHeight: '60%',
    }
});