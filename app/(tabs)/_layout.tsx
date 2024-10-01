import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import TabBar from '@/components/navigation/TabBar';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          title: 'Location',         
        }}
      />
      <Tabs.Screen
        name="scanQR"
        options={{
          title: 'ScanQR',         
        }}
      />
        <Tabs.Screen
          name="finance"
          options={{
            title: 'Finance',         
          }}
        />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',         
        }}
      />
 
    </Tabs>
  );
}
