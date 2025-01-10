import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { OrderSummary } from '@/components/payments/interface';

interface PaymentProps {
  order: OrderSummary;
  onSelectPayment: (method: 'cash' | 'card') => void;
}

export function Payment({ order, onSelectPayment }: PaymentProps) {
  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <LinearGradient colors={['#ffffff15', '#ffffff08']} style={styles.card}>
          <Text style={styles.title}>Payment Summary</Text>

          <View style={styles.totalContainer}>
            <Text style={styles.totalAmount}>
              ${order.total.toFixed(2)}
            </Text>
            <Text style={styles.totalLabel}>Total to pay</Text>
          </View>

          <View style={styles.methodsContainer}>
            <Animated.View entering={ZoomIn.delay(200)}>
              <Pressable
                style={styles.methodButton}
                onPress={() => onSelectPayment('cash')}
              >
                <LinearGradient
                  colors={['#ffffff20', '#ffffff10']}
                  style={styles.methodGradient}
                >
                  <Feather name="dollar-sign" size={28} color="#fff" />
                  <Text style={styles.methodText}>Cash</Text>
                </LinearGradient>
              </Pressable>
            </Animated.View>

            <Animated.View entering={ZoomIn.delay(300)}>
              <Pressable
                style={styles.methodButton}
                onPress={() => onSelectPayment('card')}
              >
                <LinearGradient
                  colors={['#ffffff20', '#ffffff10']}
                  style={styles.methodGradient}
                >
                  <Feather name="credit-card" size={28} color="#fff" />
                  <Text style={styles.methodText}>Card</Text>
                </LinearGradient>
              </Pressable>
            </Animated.View>
          </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  card: {
    borderRadius: 16,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  totalContainer: {
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff20',
    marginBottom: 20,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  totalLabel: {
    fontSize: 14,
    color: '#ffffff80',
    marginTop: 4,
  },
  methodsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  methodButton: {
    flex: 1,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
  },
  methodGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  methodText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
});