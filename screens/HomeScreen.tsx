import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAppStore } from "../utils/store";
import { RootStackParamList } from "../types";
import { Colors, Spacing, Fonts } from "../constants";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout, savedTrips } = useAppStore();

  const handleLogout = async () => {
    await logout();
  };

  const handleNewTrip = () => {
    navigation.navigate("TripForm");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            Olá, {user?.name || "Viajante"}! 👋
          </Text>
          <Text style={styles.subtitleText}>Para onde vamos hoje?</Text>
        </View>

        {/* Main Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleNewTrip}
          >
            <Text style={styles.primaryButtonText}>
              ✈️ Planejar Nova Viagem
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => {}}>
            <Text style={styles.secondaryButtonText}>
              📋 Minhas Viagens ({savedTrips.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recent Trips */}
        {savedTrips.length > 0 && (
          <View style={styles.recentTripsContainer}>
            <Text style={styles.sectionTitle}>Viagens Recentes</Text>
            {savedTrips.slice(0, 3).map((trip) => (
              <TouchableOpacity
                key={trip.id}
                style={styles.tripCard}
                onPress={() =>
                  navigation.navigate("Results", { itinerary: trip })
                }
              >
                <Text style={styles.tripDestination}>{trip.destination}</Text>
                <Text style={styles.tripDates}>
                  {trip.startDate} - {trip.endDate}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Empty State */}
        {savedTrips.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              🌍 Você ainda não tem viagens planejadas
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Que tal começar planejando sua próxima aventura?
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flexGrow: 1,
    padding: Spacing.md,
  },
  header: {
    marginBottom: Spacing.xl,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  subtitleText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  actionsContainer: {
    marginBottom: Spacing.xl,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: Spacing.md,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primaryButtonText: {
    color: Colors.surface,
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  recentTripsContainer: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  tripCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 8,
    marginBottom: Spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  tripDestination: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  tripDates: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  emptyState: {
    alignItems: "center",
    marginTop: Spacing.xxl,
  },
  emptyStateText: {
    fontSize: 18,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  logoutButton: {
    margin: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.error,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default HomeScreen;
