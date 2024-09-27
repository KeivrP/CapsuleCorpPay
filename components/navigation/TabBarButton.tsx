import { Pressable, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { icons } from './icons'
import { TabBarButtonProps } from './Navigation-types';


const TabBarButton = (props: TabBarButtonProps) => {
    const {isFocused, label, routeName, color} = props;
    const scale = useSharedValue(0);  
    
    useEffect(()=>{
        scale.value = withSpring(
            typeof isFocused === 'boolean'? (isFocused? 1: 0): isFocused,
            {duration: 350}
        );
    },[scale, isFocused, routeName]);

    const animatedIconStyle = useAnimatedStyle(()=>{

        const scaleValue = interpolate(
            scale.value,
            [0, 1],
            [1, 1]
        );
        const top = interpolate(
            scale.value,
            [0, 1],
            [0, 3]
        );

        return {
            transform: [{scale: scaleValue}],
            top
        }
    })
    
  return (
    <Pressable {...props} style={styles.container}>
        <Animated.View style={[animatedIconStyle]}>
            {
                icons[routeName as keyof typeof icons]({
                    color
                })
                
            }
        </Animated.View>
        <Animated.Text style={[{ 
            color: color,
            fontFamily: 'Poppins-Regular',
            fontSize: 10,
            marginTop: 4,
        }]}>
            {label}
        </Animated.Text>
        
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1
    }
})

export default TabBarButton