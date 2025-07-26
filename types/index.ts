export interface User {
  id: string;
  email: string;
  name: string;
  token?: string;
}

export interface TripRequest {
  destination: string;
  startDate: string;
  endDate: string;
  budget: BudgetType;
  travelers: number;
}

export type BudgetType = "economic" | "medium" | "premium";

export interface Hotel {
  id: string;
  name: string;
  rating: number;
  price: number;
  image: string;
  location: string;
  amenities: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  image: string;
  location: string;
}

export interface Attraction {
  id: string;
  name: string;
  type: string;
  rating: number;
  price: number;
  image: string;
  location: string;
  description: string;
}

export interface DayItinerary {
  day: number;
  date: string;
  activities: Attraction[];
  restaurants: Restaurant[];
}

export interface TripItinerary {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: BudgetType;
  hotels: Hotel[];
  dailyItinerary: DayItinerary[];
  totalCost: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  TripForm: undefined;
  Results: { itinerary: TripItinerary };
  TripDetails: { tripId: string };
};
