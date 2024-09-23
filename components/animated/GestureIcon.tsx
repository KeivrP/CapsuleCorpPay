import {
    Gesture,
    GestureDetector,
} from 'react-native-gesture-handler';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
    withTiming,
    useSharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import SignUpArrow from '../svg/SignUpArrow';
import { ThemedText } from '../ThemedText';

const { height } = Dimensions.get('screen');

function clamp(val: number, min: number, max: number) {
    return Math.min(Math.max(val, min), max);
}

export const GestureIcon = () => {
    const translateY = useSharedValue(0);
    const startTranslateY = useSharedValue(0);

    const pan = Gesture.Pan()
        .onBegin((event) => {
            startTranslateY.value = event.y;
        })
        .onUpdate((event) => {
            translateY.value = clamp(
                translateY.value + event.y - startTranslateY.value,
                height / -3 + 100,
                height / 3 - 300
            );
        })
        .onEnd((event) => {
            if (event.y > 80) {
                translateY.value = withTiming(0, { duration: 100 });
            } else {
                translateY.value = withTiming(height / -3 + 100, { duration: 100 });
            }
        })
        .runOnJS(true);

    const boxAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <>

            <GestureDetector gesture={pan}>
                <Animated.View style={[boxAnimatedStyles]}>
                    <SignUpArrow />
                </Animated.View>
            </GestureDetector>
            <ThemedText type="signUp" > Swipe up to login </ThemedText>
        </>
    );
};
