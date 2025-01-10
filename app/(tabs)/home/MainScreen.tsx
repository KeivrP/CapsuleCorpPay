import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido a la pantalla principal</Text>
      <Button title="Ir a Detalles" onPress={() => navigation.navigate('Detail')} />
      <Button title="Ir a Perfil" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BFEFFF',
  },
  text: {
    fontSize: 20,
    color: '#0f065a',
  },
});

export default MainScreen;
