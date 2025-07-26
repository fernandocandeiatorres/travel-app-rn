import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { Colors, Spacing } from "../constants";
import {
  formatCurrency,
  formatDateRange,
  calculateTripDuration,
} from "../utils";

type ResultsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Results"
>;
type ResultsScreenRouteProp = RouteProp<RootStackParamList, "Results">;

interface Props {
  navigation: ResultsScreenNavigationProp;
  route: ResultsScreenRouteProp;
}

const ResultsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { itinerary } = route.params;
  const duration = calculateTripDuration(
    itinerary.startDate,
    itinerary.endDate
  );
  const dateRange = formatDateRange(itinerary.startDate, itinerary.endDate);

  const getBudgetIcon = (budget: string) => {
    switch (budget) {
      case "economic":
        return "💰";
      case "medium":
        return "💳";
      case "premium":
        return "🏆";
      default:
        return "💳";
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push("⭐");
    }
    if (hasHalfStar) {
      stars.push("⭐");
    }

    return stars.join("") + ` (${rating})`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.destination}>{itinerary.destination}</Text>
          <Text style={styles.dateRange}>{dateRange}</Text>
          <View style={styles.tripInfo}>
            <Text style={styles.duration}>{duration} dias</Text>
            <Text style={styles.budget}>
              {getBudgetIcon(itinerary.budget)} {itinerary.budget}
            </Text>
            <Text style={styles.totalCost}>
              Total: {formatCurrency(itinerary.totalCost)}
            </Text>
          </View>
        </View>

        {/* Hotels Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏨 Hospedagem</Text>
          {itinerary.hotels.map((hotel) => (
            <View key={hotel.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{hotel.name}</Text>
                <Text style={styles.price}>
                  {formatCurrency(hotel.price)}/noite
                </Text>
              </View>
              <Text style={styles.rating}>{renderStars(hotel.rating)}</Text>
              <Text style={styles.location}>📍 {hotel.location}</Text>
              <View style={styles.amenitiesContainer}>
                {hotel.amenities.map((amenity, index) => (
                  <View key={index} style={styles.amenityTag}>
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Daily Itinerary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Roteiro Diário</Text>
          {itinerary.dailyItinerary.map((day) => (
            <View key={day.day} style={styles.dayCard}>
              <Text style={styles.dayTitle}>
                Dia {day.day} - {new Date(day.date).toLocaleDateString("pt-BR")}
              </Text>

              {/* Activities */}
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>🎯 Atividades</Text>
                {day.activities.map((activity) => (
                  <View key={activity.id} style={styles.activityCard}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.activityName}>{activity.name}</Text>
                      <Text style={styles.price}>
                        {formatCurrency(activity.price)}
                      </Text>
                    </View>
                    <Text style={styles.activityType}>{activity.type}</Text>
                    <Text style={styles.rating}>
                      {renderStars(activity.rating)}
                    </Text>
                    <Text style={styles.location}>📍 {activity.location}</Text>
                    <Text style={styles.description}>
                      {activity.description}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Restaurants */}
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>🍽️ Restaurantes</Text>
                {day.restaurants.map((restaurant) => (
                  <View key={restaurant.id} style={styles.restaurantCard}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.restaurantName}>
                        {restaurant.name}
                      </Text>
                      <Text style={styles.priceRange}>
                        {restaurant.priceRange}
                      </Text>
                    </View>
                    <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
                    <Text style={styles.rating}>
                      {renderStars(restaurant.rating)}
                    </Text>
                    <Text style={styles.location}>
                      📍 {restaurant.location}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.primaryButtonText}>🏠 Voltar ao Início</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("TripForm")}
          >
            <Text style={styles.secondaryButtonText}>✈️ Nova Viagem</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    alignItems: "center",
  },
  destination: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.surface,
    marginBottom: Spacing.sm,
  },
  dateRange: {
    fontSize: 16,
    color: Colors.surface,
    marginBottom: Spacing.md,
  },
  tripInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  duration: {
    fontSize: 14,
    color: Colors.surface,
    fontWeight: "600",
  },
  budget: {
    fontSize: 14,
    color: Colors.surface,
    fontWeight: "600",
  },
  totalCost: {
    fontSize: 14,
    color: Colors.surface,
    fontWeight: "600",
  },
  section: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.md,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
  rating: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  location: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.xs,
  },
  amenityTag: {
    backgroundColor: Colors.primary + "20",
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 6,
  },
  amenityText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: "600",
  },
  dayCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.lg,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  subsection: {
    marginBottom: Spacing.lg,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  activityCard: {
    backgroundColor: Colors.background,
    padding: Spacing.sm,
    borderRadius: 8,
    marginBottom: Spacing.sm,
  },
  activityName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    flex: 1,
  },
  activityType: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  restaurantCard: {
    backgroundColor: Colors.background,
    padding: Spacing.sm,
    borderRadius: 8,
    marginBottom: Spacing.sm,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    flex: 1,
  },
  priceRange: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.secondary,
  },
  cuisine: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  actionsContainer: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
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
});

export default ResultsScreen;
