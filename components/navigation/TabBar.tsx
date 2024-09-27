import { View, StyleSheet, LayoutChangeEvent } from 'react-native'
import React, { useEffect, useState } from 'react'
import TabBarButton from './TabBarButton';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { TabRoute } from './Navigation-types';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

  const buttonWidht = dimensions.width / state.routes.length;

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width
    })
  }

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }]
    }
  })

  useEffect(() => {
    tabPositionX.value = withSpring(state.index * buttonWidht, { duration: 1500 });
  }, [state.index, buttonWidht]);

  const primaryColor = '#626262';
  const greyColor = '#979797';
  return (
    <View onLayout={onTabbarLayout} style={styles.tabbar}>
      <Animated.View style={[animatedStyle, {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderRadius: 20,
        marginHorizontal: 8,
        height: dimensions.height - 10,
        width: buttonWidht - 15,
      }
      ]} />
      {state?.routes?.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const isFocused = state.index === index;       

        const onPress = () => {
          tabPositionX.value = withSpring(index * buttonWidht, { duration: 1500 });
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };


        return (
          <TabBarButton
            key={route.name}
            //style={styles.tabbarItem}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name as TabRoute}
            color={isFocused ? primaryColor : greyColor}
            label={label.toString()}
          />
        )


      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabbar: {
        position: 'absolute',
    bottom: heightPercentageToDP('4%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    backgroundColor: 'transparent',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,

  }
})

export default TabBar