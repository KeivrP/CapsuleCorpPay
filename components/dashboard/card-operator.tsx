import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PropsTarjetaPersonal {
  empleado: {
    nombre: string;
    mesas: number;
    tiempoPromedio: string;
    ventas: number;
    calificacion: number;
    estado: 'activo' | 'descanso';
  }
}

export const TarjetaPersonal = ({ empleado }: PropsTarjetaPersonal) => (
  <View style={estilos.contenedor}>
    <View style={estilos.encabezado}>
      <Text style={estilos.nombre}>{empleado.nombre}</Text>
      <View style={[estilos.insigniaEstado, 
        { backgroundColor: empleado.estado === 'activo' ? '#D1FAE5' : '#FEF3C7' }]}>
        <Text style={[estilos.textoEstado, 
          { color: empleado.estado === 'activo' ? '#065F46' : '#92400E' }]}>
          {empleado.estado}
        </Text>
      </View>
    </View>
    <View style={estilos.estadisticas}>
      <Text>Mesas: {empleado.mesas}</Text>
      <Text>Tiempo: {empleado.tiempoPromedio}</Text>
      <Text>★ {empleado.calificacion}</Text>
      <Text>${empleado.ventas}</Text>
    </View>
  </View>
);

const estilos = StyleSheet.create({
  contenedor: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 12,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nombre: {
    fontSize: 16,
    fontWeight: '500',
  },
  insigniaEstado: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  textoEstado: {
    fontSize: 12,
    fontWeight: '500',
  },
  estadisticas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}); 