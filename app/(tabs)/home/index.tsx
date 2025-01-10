import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const HomeMain = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Main Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('DetailsScreen')}
      />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('ProfileScreen')}
      />
    </View>
  );
};

const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
    </View>
  );
};

export default function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="HomeMain" component={HomeMain} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
