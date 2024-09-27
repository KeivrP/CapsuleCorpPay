/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { createContext, useContext, useEffect, ReactNode } from "react";
import { useRouter, useSegments } from "expo-router";
import { useStorageState } from "./useStorageState";

// Creamos un contexto de autenticación que contendrá las funciones y datos relacionados con la autenticación
export const AuthContext = createContext<{
  signOut: () => void;
  signIn: (token: string) => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signOut: () => null,
  signIn: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

// Este hook se utiliza para proteger rutas según el estado de la sesión del usuario
function useProtectedRoute(session: string | null) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    if (!session && !inAuthGroup) {
      // Si no hay sesión y no estamos en el grupo de autenticación, redirigimos a la página de autenticación
      router.replace("/(auth)/onBoardindScreen");
    } else if (session && inAuthGroup) {
      // Si hay sesión y estamos en el grupo de autenticación, redirigimos a la página principal
      router.replace("/(tabs)/home");
      console.log("hola");
    }
  }, [session, segments]);
}

// Este componente provee el contexto de autenticación a sus componentes hijos
export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("Tokene");
  
  console.log(session, 'session');

  useProtectedRoute(session);

  return (
    <AuthContext.Provider
      value={{


        // Función manejar la session
        signOut: () => {
          setSession(null);
        },
        signIn: (token: string) => {
          setSession(token);
        },
        session,
        isLoading,


      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
