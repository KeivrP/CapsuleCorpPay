import React from 'react';
import {
  Alert,
  Animated,
  LogBox,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from './home';

LogBox.ignoreAllLogs();

const Screen1 = () => {
  return <View style={styles.screen1} />;
};

const Screen2 = () => {
  return <View style={styles.screen2} />;
};

export default function LayoutApp() {
  const _renderIcon = (routeName: string, selectedTab: string) => {
    let icon = '';

    switch (routeName) {
      case 'title1':
        icon = 'settings-outline';
        break;
      case 'title2':
        icon = 'home-outline';
        break;
      case 'title3':
        icon = 'settings-outline';
        break;
      case 'title5':
        icon = 'home-outline';
        break;
    }

    return (
      <Ionicons
        name={icon as keyof typeof Ionicons.glyphMap}
        size={25}
        color={routeName === selectedTab ? 'black' : 'gray'}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }: { routeName: string, selectedTab: string, navigate: (routeName: string) => void }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <NavigationContainer independent={true}>
      <CurvedBottomBarExpo.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={55}
      circleWidth={50}
      bgColor="white"
      initialRouteName="title3"
      borderTopLeftRight
      screenOptions={{ headerShown: false }}
      renderCircle={() => (
        <Animated.View style={styles.btnCircleUp}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Click Action')}
        >
          <Ionicons name={'apps-sharp'} color="gray" size={25} />
        </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
      >
      <CurvedBottomBarExpo.Screen
        name="title3"
        position="LEFT"
        component={() => <HomeScreen />}
      />
      
      <CurvedBottomBarExpo.Screen
        name="title1"
        position="LEFT"
        component={() => <Screen1 />}
      />
      <CurvedBottomBarExpo.Screen
        name="title5"
        component={() => <Screen2 />}
        position="RIGHT"
      />
      </CurvedBottomBarExpo.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f065a',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
});