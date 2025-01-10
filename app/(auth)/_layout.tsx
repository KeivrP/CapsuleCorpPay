import React from "react";
import { useSession } from "@/context/AuthSession";
import { Loading } from "@/components/animated/Loading";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "../(tabs)/home";
import LoginScreen from "./LoginScreen";
import OnboardingScreen from "./onBoardindScreen";


const Stack = createNativeStackNavigator();


export default function AuthLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer independent={true}>

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {session ? (
        // Si el usuario está autenticado, navegamos a la pestaña principal
        <Stack.Screen name="(tabs)" component={HomeScreen} />
      ) : (
        <>
          {/* Si no está autenticado, mostramos pantallas de login y onboarding */}
          <Stack.Screen name="onBoardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="loginScreen" component={LoginScreen} />
        </>
      )}
      
      {/* Aquí, el Slot se encargará de renderizar la ruta activa */}
    </Stack.Navigator>
    </NavigationContainer>

  );
}
