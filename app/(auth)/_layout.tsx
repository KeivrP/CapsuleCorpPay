import React from "react";
import { Stack, Slot } from "expo-router"; // Usamos Slot aquí
import { useSession } from "@/context/AuthSession";
import { Loading } from "@/components/animated/Loading";

export default function AuthLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Stack>
      {session ? (
        // Si el usuario está autenticado, navegamos a la pestaña principal
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <>
          {/* Si no está autenticado, mostramos pantallas de login y onboarding */}
          <Stack.Screen name="loginScreen" options={{ headerShown: false }} />
          <Stack.Screen name="onBoardingScreen" options={{ headerShown: false }} />
        </>
      )}
      
      {/* Aquí, el Slot se encargará de renderizar la ruta activa */}
      <Slot />
    </Stack>
  );
}
