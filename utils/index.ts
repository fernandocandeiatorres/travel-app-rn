import { format, differenceInDays, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

// Formatação de datas
export const formatDate = (
  date: string | Date,
  pattern: string = "dd/MM/yyyy"
): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, pattern, { locale: ptBR });
};

export const formatDateRange = (startDate: string, endDate: string): string => {
  const start = formatDate(startDate, "dd/MM");
  const end = formatDate(endDate, "dd/MM/yyyy");
  return `${start} - ${end}`;
};

export const calculateTripDuration = (
  startDate: string,
  endDate: string
): number => {
  return differenceInDays(parseISO(endDate), parseISO(startDate)) + 1;
};

// Formatação de valores
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// Validações
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // Mínimo 6 caracteres
  return password.length >= 6;
};

// Helpers gerais
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
