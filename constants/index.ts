export const Colors = {
  primary: "#2196F3",
  primaryDark: "#1976D2",
  secondary: "#FF9800",
  background: "#F5F5F5",
  surface: "#FFFFFF",
  text: "#212121",
  textSecondary: "#757575",
  error: "#F44336",
  success: "#4CAF50",
  warning: "#FF9800",
  info: "#2196F3",
  border: "#E0E0E0",
};

export const Fonts = {
  regular: "Roboto",
  medium: "Roboto-Medium",
  bold: "Roboto-Bold",
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

export const API_CONFIG = {
  BASE_URL: "https://your-backend-api.com/api", // Substitua pela URL do seu backend
  TIMEOUT: 10000,
};

export const BUDGET_OPTIONS = [
  { value: "economic", label: "Econômico", description: "Opções mais baratas" },
  {
    value: "medium",
    label: "Médio",
    description: "Equilíbrio entre preço e qualidade",
  },
  {
    value: "premium",
    label: "Premium",
    description: "Experiências de alta qualidade",
  },
] as const;
