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
  ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAppStore } from "../utils/store";
import { tripService } from "../services/api";
import { BudgetType, RootStackParamList, TripRequest } from "../types";
import { Colors, Spacing, BUDGET_OPTIONS } from "../constants";
import { format, addDays } from "date-fns";

type TripFormScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TripForm"
>;

interface Props {
  navigation: TripFormScreenNavigationProp;
}

const TripFormScreen: React.FC<Props> = ({ navigation }) => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState("1");
  const [selectedBudget, setSelectedBudget] = useState<BudgetType>("medium");
  const [isLoading, setIsLoading] = useState(false);

  const { setCurrentTrip, addSavedTrip } = useAppStore();

  const handleCreateTrip = async () => {
    // Validações
    if (!destination.trim()) {
      Alert.alert("Erro", "Por favor, insira o destino");
      return;
    }

    if (!startDate.trim()) {
      Alert.alert("Erro", "Por favor, insira a data de início");
      return;
    }

    if (!endDate.trim()) {
      Alert.alert("Erro", "Por favor, insira a data de fim");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      Alert.alert("Erro", "A data de fim deve ser posterior à data de início");
      return;
    }

    const travelersCount = parseInt(travelers);
    if (isNaN(travelersCount) || travelersCount < 1) {
      Alert.alert("Erro", "Número de viajantes deve ser pelo menos 1");
      return;
    }

    const tripRequest: TripRequest = {
      destination: destination.trim(),
      startDate,
      endDate,
      budget: selectedBudget,
      travelers: travelersCount,
    };

    setIsLoading(true);

    try {
      const response = await tripService.createItinerary(tripRequest);

      if (response.success && response.data) {
        setCurrentTrip(response.data);
        addSavedTrip(response.data);
        navigation.navigate("Results", { itinerary: response.data });
      } else {
        Alert.alert("Erro", response.message || "Erro ao criar roteiro");
      }
    } catch (error: any) {
      // Fallback para demo - criar roteiro fake
      Alert.alert(
        "Demo Mode",
        "Conectando com backend... Por enquanto, vamos mostrar um exemplo!",
        [
          {
            text: "OK",
            onPress: () => createDemoItinerary(tripRequest),
          },
        ]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const createDemoItinerary = (request: TripRequest) => {
    const demoItinerary = {
      id: `trip-${Date.now()}`,
      destination: request.destination,
      startDate: request.startDate,
      endDate: request.endDate,
      budget: request.budget,
      totalCost:
        request.budget === "economic"
          ? 1500
          : request.budget === "medium"
          ? 3000
          : 5000,
      hotels: [
        {
          id: "1",
          name: `Hotel Central ${request.destination}`,
          rating: 4.2,
          price:
            request.budget === "economic"
              ? 150
              : request.budget === "medium"
              ? 300
              : 500,
          image: "https://example.com/hotel.jpg",
          location: `Centro de ${request.destination}`,
          amenities: ["Wi-Fi", "Café da manhã", "Piscina"],
        },
      ],
      dailyItinerary: [
        {
          day: 1,
          date: request.startDate,
          activities: [
            {
              id: "1",
              name: `Tour pelo centro histórico de ${request.destination}`,
              type: "Cultural",
              rating: 4.5,
              price: 50,
              image: "https://example.com/tour.jpg",
              location: `Centro de ${request.destination}`,
              description: "Explore os principais pontos históricos da cidade",
            },
          ],
          restaurants: [
            {
              id: "1",
              name: `Restaurante típico de ${request.destination}`,
              cuisine: "Local",
              rating: 4.3,
              priceRange:
                request.budget === "economic"
                  ? "$"
                  : request.budget === "medium"
                  ? "$$"
                  : "$$$",
              image: "https://example.com/restaurant.jpg",
              location: `Centro de ${request.destination}`,
            },
          ],
        },
      ],
    };

    setCurrentTrip(demoItinerary);
    addSavedTrip(demoItinerary);
    navigation.navigate("Results", { itinerary: demoItinerary });
  };

  const setQuickDates = () => {
    const today = new Date();
    const tomorrow = addDays(today, 1);
    const dayAfter = addDays(today, 3);

    setStartDate(format(tomorrow, "yyyy-MM-dd"));
    setEndDate(format(dayAfter, "yyyy-MM-dd"));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Nova Viagem ✈️</Text>
              <Text style={styles.subtitle}>
                Vamos planejar sua próxima aventura
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Destino</Text>
                <TextInput
                  style={styles.input}
                  value={destination}
                  onChangeText={setDestination}
                  placeholder="Ex: Paris, Tokyo, Rio de Janeiro..."
                  editable={!isLoading}
                />
              </View>

              <View style={styles.dateContainer}>
                <View style={styles.dateInputContainer}>
                  <Text style={styles.inputLabel}>Data de início</Text>
                  <TextInput
                    style={styles.input}
                    value={startDate}
                    onChangeText={setStartDate}
                    placeholder="2024-01-15"
                    editable={!isLoading}
                  />
                </View>

                <View style={styles.dateInputContainer}>
                  <Text style={styles.inputLabel}>Data de fim</Text>
                  <TextInput
                    style={styles.input}
                    value={endDate}
                    onChangeText={setEndDate}
                    placeholder="2024-01-20"
                    editable={!isLoading}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.quickDateButton}
                onPress={setQuickDates}
              >
                <Text style={styles.quickDateText}>📅 Próximos 3 dias</Text>
              </TouchableOpacity>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Número de viajantes</Text>
                <TextInput
                  style={styles.input}
                  value={travelers}
                  onChangeText={setTravelers}
                  placeholder="1"
                  keyboardType="numeric"
                  editable={!isLoading}
                />
              </View>

              {/* Budget Selection */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Tipo de orçamento</Text>
                <View style={styles.budgetContainer}>
                  {BUDGET_OPTIONS.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.budgetOption,
                        selectedBudget === option.value &&
                          styles.budgetOptionSelected,
                      ]}
                      onPress={() =>
                        setSelectedBudget(option.value as BudgetType)
                      }
                      disabled={isLoading}
                    >
                      <Text
                        style={[
                          styles.budgetOptionText,
                          selectedBudget === option.value &&
                            styles.budgetOptionTextSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                      <Text
                        style={[
                          styles.budgetOptionDescription,
                          selectedBudget === option.value &&
                            styles.budgetOptionDescriptionSelected,
                        ]}
                      >
                        {option.description}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.createButton,
                  isLoading && styles.buttonDisabled,
                ]}
                onPress={handleCreateTrip}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={Colors.surface} />
                ) : (
                  <Text style={styles.createButtonText}>🎯 Criar Roteiro</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: 26,
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
    flex: 1,
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
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  dateInputContainer: {
    flex: 0.48,
  },
  quickDateButton: {
    backgroundColor: Colors.info,
    padding: Spacing.sm,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  quickDateText: {
    color: Colors.surface,
    fontSize: 14,
    fontWeight: "600",
  },
  budgetContainer: {
    gap: Spacing.sm,
  },
  budgetOption: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  budgetOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + "10",
  },
  budgetOptionText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  budgetOptionTextSelected: {
    color: Colors.primary,
  },
  budgetOptionDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  budgetOptionDescriptionSelected: {
    color: Colors.primary,
  },
  createButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: "center",
    marginTop: Spacing.xl,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  createButtonText: {
    color: Colors.surface,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

export default TripFormScreen;
