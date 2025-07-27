import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAppStore } from "../utils/store";
import { authService } from "../services/api";
import { useForm } from "../hooks/useForm";
import { RootStackParamList } from "../types";
import { Colors, Spacing } from "../constants";
import Input from "../components/Form/Input";
import Button from "../components/Button";
import LoadingSpinner from "../components/Loading/LoadingSpinner";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

interface LoginFormData {
  email: string;
  password: string;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useAppStore();

  const form = useForm<LoginFormData>({
    email: {
      initialValue: "",
      rules: {
        required: { message: "Email é obrigatório" },
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Email inválido",
        },
      },
    },
    password: {
      initialValue: "",
      rules: {
        required: { message: "Senha é obrigatória" },
        minLength: {
          value: 6,
          message: "Senha deve ter pelo menos 6 caracteres",
        },
      },
    },
  });

  const handleLogin = async (values: LoginFormData) => {
    try {
      const response = await authService.login(values.email, values.password);

      if (response.success && response.data) {
        await login(response.data);
      } else {
        Alert.alert("Erro", response.message || "Erro ao fazer login");
      }
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao conectar com o servidor");
    }
  };

  const handleDemoLogin = async () => {
    await login({
      id: "demo-user",
      email: "demo@example.com",
      name: "Usuário Demo",
      token: "demo-token-123",
    });
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
            <Input
              label="Email"
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon="📧"
              {...form.getFieldProps("email")}
            />

            <Input
              label="Senha"
              placeholder="Sua senha"
              secureTextEntry
              leftIcon="🔒"
              {...form.getFieldProps("password")}
            />

            <Button
              title="Entrar"
              onPress={() => form.handleSubmit(handleLogin)}
              loading={form.isSubmitting}
              fullWidth
              size="large"
            />

            <Button
              title="🚀 Entrar com Demo"
              variant="secondary"
              onPress={handleDemoLogin}
              disabled={form.isSubmitting}
              fullWidth
              size="large"
            />
          </View>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Não tem uma conta? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              disabled={form.isSubmitting}
            >
              <Text style={styles.registerLink}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Loading Overlay */}
        {form.isSubmitting && (
          <LoadingSpinner overlay message="Fazendo login..." />
        )}
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
    gap: Spacing.md,
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
