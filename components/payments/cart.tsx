import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { CartItem } from './interface';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onNext: () => void;
}

export function Cart({ items, onUpdateQuantity, onNext }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Animated.View entering={FadeIn} style={styles.wrapper}>
        <View style={styles.header}>
          <Feather name="shopping-cart" size={20}  />
          <Text style={styles.headerText}>Carrito</Text>
        </View>

        <ScrollView style={styles.scrollArea}>
          {items.map((item) => (
            <Animated.View 
              key={item.id} 
              entering={FadeInRight}
              style={styles.itemRow}
            >
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
              
              <View style={styles.quantityControls}>
                <Pressable
                  style={styles.quantityButton}
                  onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  <Feather name="minus" size={16}  />
                </Pressable>
                
                <Text style={styles.quantityText}>{item.quantity}</Text>
                
                <Pressable
                  style={styles.quantityButton}
                  onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Feather name="plus" size={16}  />
                </Pressable>
              </View>
            </Animated.View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
          <Pressable
            style={[styles.nextButton, !items.length && styles.disabledButton]}
            disabled={!items.length}
            onPress={onNext}
          >
            <Text style={styles.nextButtonText}>Continue</Text>
          </Pressable>
        </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  container: {
    padding: 16,
    backgroundColor: '#ffffff10',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    
  },
  scrollArea: {
    maxHeight: 200,
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff15',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    
  },
  itemPrice: {
    fontSize: 14,
    color: '#ffffff80',
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    backgroundColor: '#ffffff20',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    
    fontSize: 16,
    fontWeight: '500',
    minWidth: 24,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ffffff20',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  nextButtonText: {
    
    fontWeight: '600',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
});