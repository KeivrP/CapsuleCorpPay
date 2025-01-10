import React from "react";
import { StyleSheet, StatusBar } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";

export default function LayoutHome() {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <LinearGradient
                colors={["#0f065a", "#B2B5DE", "#C8CCE8"]}
                style={styles.gradient}
            >
                <Slot />
            </LinearGradient>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
});