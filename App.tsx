import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import AppNavigator from "./navigation/AppNavigator";
import { Colors } from "./constants";

const theme = {
  colors: {
    primary: Colors.primary,
    accent: Colors.secondary,
    background: Colors.background,
    surface: Colors.surface,
    text: Colors.text,
    disabled: Colors.textSecondary,
    placeholder: Colors.textSecondary,
    backdrop: "rgba(0, 0, 0, 0.5)",
    onSurface: Colors.text,
    notification: Colors.info,
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="light" backgroundColor={Colors.primary} />
      <AppNavigator />
    </PaperProvider>
  );
}
