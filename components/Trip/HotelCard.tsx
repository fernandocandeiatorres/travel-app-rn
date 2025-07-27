import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing, BorderRadius } from "../../constants";
import { formatCurrency } from "../../utils";
import { Hotel } from "../../types";
import Card from "../Card";

interface HotelCardProps {
  hotel: Hotel;
  onPress?: () => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onPress }) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = "";

    for (let i = 0; i < fullStars; i++) {
      stars += "⭐";
    }
    if (hasHalfStar) {
      stars += "⭐";
    }

    return `${stars} (${rating})`;
  };

  return (
    <Card variant="elevated" onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name} numberOfLines={2}>
          {hotel.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatCurrency(hotel.price)}</Text>
          <Text style={styles.priceLabel}>/noite</Text>
        </View>
      </View>

      <Text style={styles.rating}>{renderStars(hotel.rating)}</Text>
      <Text style={styles.location}>📍 {hotel.location}</Text>

      <View style={styles.amenitiesContainer}>
        {hotel.amenities.slice(0, 3).map((amenity, index) => (
          <View key={index} style={styles.amenityTag}>
            <Text style={styles.amenityText}>{amenity}</Text>
          </View>
        ))}
        {hotel.amenities.length > 3 && (
          <View style={styles.amenityTag}>
            <Text style={styles.amenityText}>
              +{hotel.amenities.length - 3}
            </Text>
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.sm,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    flex: 1,
    marginRight: Spacing.sm,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
  priceLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
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
    borderRadius: BorderRadius.sm,
  },
  amenityText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: "600",
  },
});

export default HotelCard;
