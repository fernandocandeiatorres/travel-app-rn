import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing } from "../../constants";
import {
  formatCurrency,
  formatDateRange,
  calculateTripDuration,
} from "../../utils";
import { TripItinerary } from "../../types";

interface TripHeaderProps {
  itinerary: TripItinerary;
}

const TripHeader: React.FC<TripHeaderProps> = ({ itinerary }) => {
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

  return (
    <View style={styles.header}>
      <Text style={styles.destination}>{itinerary.destination}</Text>
      <Text style={styles.dateRange}>{dateRange}</Text>
      <View style={styles.tripInfo}>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{duration}</Text>
          <Text style={styles.infoLabel}>dias</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>
            {getBudgetIcon(itinerary.budget)}
          </Text>
          <Text style={styles.infoLabel}>{itinerary.budget}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>
            {formatCurrency(itinerary.totalCost)}
          </Text>
          <Text style={styles.infoLabel}>total</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  infoItem: {
    alignItems: "center",
  },
  infoValue: {
    fontSize: 16,
    color: Colors.surface,
    fontWeight: "bold",
    marginBottom: Spacing.xs,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.surface,
    opacity: 0.9,
  },
});

export default TripHeader;
