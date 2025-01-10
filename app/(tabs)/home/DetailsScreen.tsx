import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalles</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEBCD',
  },
  text: {
    fontSize: 20,
    color: '#0f065a',
  },
});

export default DetailScreen;
