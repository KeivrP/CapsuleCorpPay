import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface PropsTarjetaEstadistica {
  titulo: string;
  valor: string;
  cambio: string;
  icono: keyof typeof MaterialCommunityIcons.glyphMap;
}

export const TarjetaEstadistica = ({ titulo, valor, cambio, icono }: PropsTarjetaEstadistica) => {

  return (
    <View style={[styles.tarjeta]}>
      <View>
        <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.valor}>{valor}</Text>
      <Text style={styles.cambio}>{cambio}</Text>
    </View>
    <View style={styles.contenedorIcono}>
      <MaterialCommunityIcons name={icono} size={24} color="white" />
    </View>
  </View>

);
}
const styles = StyleSheet.create({
  tarjeta: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  titulo: {
    fontSize: 14,
    color: '#6B7280',
  },
  valor: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  cambio: {
    fontSize: 14,
    color: '#10B981',
  },
  contenedorIcono: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#4F46E5',
  },
}); 