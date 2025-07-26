import { create } from "zustand";
import { User, TripItinerary } from "../types";
import { storeToken, removeStoredToken } from "./auth";

interface AppState {
  // Estado de autenticação
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Estado das viagens
  currentTrip: TripItinerary | null;
  savedTrips: TripItinerary[];

  // Ações de autenticação
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;

  // Ações de viagem
  setCurrentTrip: (trip: TripItinerary) => void;
  clearCurrentTrip: () => void;
  addSavedTrip: (trip: TripItinerary) => void;
  setSavedTrips: (trips: TripItinerary[]) => void;

  // Ação de login
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Estado inicial
  user: null,
  isAuthenticated: false,
  isLoading: false,
  currentTrip: null,
  savedTrips: [],

  // Ações de autenticação
  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },

  clearUser: () => {
    set({ user: null, isAuthenticated: false });
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  // Ações de viagem
  setCurrentTrip: (currentTrip: TripItinerary) => {
    set({ currentTrip });
  },

  clearCurrentTrip: () => {
    set({ currentTrip: null });
  },

  addSavedTrip: (trip: TripItinerary) => {
    const { savedTrips } = get();
    set({ savedTrips: [...savedTrips, trip] });
  },

  setSavedTrips: (savedTrips: TripItinerary[]) => {
    set({ savedTrips });
  },

  // Ação de login
  login: async (user: User) => {
    if (user.token) {
      await storeToken(user.token);
    }
    set({ user, isAuthenticated: true });
  },

  logout: async () => {
    await removeStoredToken();
    set({
      user: null,
      isAuthenticated: false,
      currentTrip: null,
      savedTrips: [],
    });
  },
}));
