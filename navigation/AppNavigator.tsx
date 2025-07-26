import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAppStore } from "../utils/store";
import { getStoredToken } from "../utils/auth";

// Importação das telas (serão criadas em seguida)
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TripFormScreen from "../screens/TripFormScreen";
import ResultsScreen from "../screens/ResultsScreen";

import { RootStackParamList } from "../types";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { isAuthenticated, setUser, setLoading } = useAppStore();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const token = await getStoredToken();
      if (token) {
        // Aqui você pode validar o token com o backend
        // Por enquanto, vamos apenas definir como autenticado
        setUser({ id: "1", email: "user@example.com", name: "Usuário", token });
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "Home" : "Login"}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2196F3",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {isAuthenticated ? (
          // Telas autenticadas
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Travel Planner" }}
            />
            <Stack.Screen
              name="TripForm"
              component={TripFormScreen}
              options={{ title: "Nova Viagem" }}
            />
            <Stack.Screen
              name="Results"
              component={ResultsScreen}
              options={{ title: "Seu Roteiro" }}
            />
          </>
        ) : (
          // Telas de autenticação
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Criar Conta" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
