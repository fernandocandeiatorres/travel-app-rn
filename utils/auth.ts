import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";

export const storeToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (error) {
    console.error("Erro ao armazenar token:", error);
  }
};

export const getStoredToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error("Erro ao recuperar token:", error);
    return null;
  }
};

export const removeStoredToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error("Erro ao remover token:", error);
  }
};
