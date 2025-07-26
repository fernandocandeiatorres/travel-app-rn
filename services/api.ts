import axios, { AxiosResponse } from "axios";
import { API_CONFIG } from "../constants";
import { ApiResponse, User, TripRequest, TripItinerary } from "../types";
import { getStoredToken, removeStoredToken } from "../utils/auth";

// Configuração do axios
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token às requisições
api.interceptors.request.use(async (config) => {
  const token = await getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      await removeStoredToken();
      // Aqui você pode redirecionar para a tela de login
    }
    return Promise.reject(error);
  }
);

// Funções de autenticação
export const authService = {
  login: async (
    email: string,
    password: string
  ): Promise<ApiResponse<User>> => {
    try {
      const response: AxiosResponse<ApiResponse<User>> = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao fazer login");
    }
  },

  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<ApiResponse<User>> => {
    try {
      const response: AxiosResponse<ApiResponse<User>> = await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao criar conta");
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      // Não precisamos tratar erro do logout
    } finally {
      await removeStoredToken();
    }
  },
};

// Funções de viagem
export const tripService = {
  createItinerary: async (
    request: TripRequest
  ): Promise<ApiResponse<TripItinerary>> => {
    try {
      const response: AxiosResponse<ApiResponse<TripItinerary>> =
        await api.post("/trips/create", request);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao criar roteiro");
    }
  },

  getUserTrips: async (): Promise<ApiResponse<TripItinerary[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<TripItinerary[]>> =
        await api.get("/trips");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Erro ao buscar viagens"
      );
    }
  },

  getTripDetails: async (
    tripId: string
  ): Promise<ApiResponse<TripItinerary>> => {
    try {
      const response: AxiosResponse<ApiResponse<TripItinerary>> = await api.get(
        `/trips/${tripId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Erro ao buscar detalhes da viagem"
      );
    }
  },
};

export default api;
