import React from "react"
import { Redirect, Stack } from "expo-router"
import { useSession } from "@/context/AuthSession";
import { Loading } from "@/components/animated/Loading";

export default function RootLayout() {
    const { session, isLoading } = useSession()

    if (isLoading) {
        return <Loading />
    }

    if (session) {
        return <Redirect href="/(tabs)/" />;
    }
    return (
        <Stack>
            <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
            <Stack.Screen name="onBoardindScreen" options={{ headerShown: false }} />
            <Stack.Screen name="signUp/SignUpScreen" options={{ headerShown: false }} />
            <Stack.Screen name="signUp/SignUpCardScreen" options={{ headerShown: false }} />
            <Stack.Screen name="signUp/SignUpCreditSucces" options={{ headerShown: false }} />
            <Stack.Screen name="signUp/SignUpRefrelScreen" options={{ headerShown: false }} />
            <Stack.Screen name="signUp/signUpQrScreen" options={{ headerShown: false }} />
        </Stack>
    )
}