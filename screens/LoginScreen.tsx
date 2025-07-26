import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAppStore } from "../utils/store";
import { authService } from "../services/api";
import { isValidEmail, isValidPassword } from "../utils";
import { RootStackParamList } from "../types";
import { Colors, Spacing } from "../constants";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAppStore();

  const handleLogin = async () => {
    // Validações
    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, insira seu email");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Erro", "Por favor, insira sua senha");
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login(email, password);

      if (response.success && response.data) {
        await login(response.data);
        // Navegação será automática via AppNavigator quando isAuthenticated mudar
      } else {
        Alert.alert("Erro", response.message || "Erro ao fazer login");
      }
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao conectar com o servidor");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  // Demo login (remover em produção)
  const handleDemoLogin = async () => {
    setIsLoading(true);

    // Simular login demo
    setTimeout(async () => {
      await login({
        id: "demo-user",
        email: "demo@example.com",
        name: "Usuário Demo",
        token: "demo-token-123",
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Travel Planner</Text>
            <Text style={styles.subtitle}>Planeje sua próxima aventura</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="seu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Senha</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Sua senha"
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.surface} />
              ) : (
                <Text style={styles.loginButtonText}>Entrar</Text>
              )}
            </TouchableOpacity>

            {/* Demo Button */}
            <TouchableOpacity
              style={[styles.demoButton, isLoading && styles.buttonDisabled]}
              onPress={handleDemoLogin}
              disabled={isLoading}
            >
              <Text style={styles.demoButtonText}>🚀 Entrar com Demo</Text>
            </TouchableOpacity>
          </View>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Não tem uma conta? </Text>
            <TouchableOpacity onPress={handleRegister} disabled={isLoading}>
              <Text style={styles.registerLink}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  form: {
    marginBottom: Spacing.xl,
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: 8,
    alignItems: "center",
    marginTop: Spacing.md,
  },
  loginButtonText: {
    color: Colors.surface,
    fontSize: 18,
    fontWeight: "bold",
  },
  demoButton: {
    backgroundColor: Colors.secondary,
    padding: Spacing.md,
    borderRadius: 8,
    alignItems: "center",
    marginTop: Spacing.md,
  },
  demoButtonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  registerLink: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "600",
  },
});

export default LoginScreen;
