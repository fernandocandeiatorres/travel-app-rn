import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Colors, Spacing } from "../../constants";

interface LoadingSpinnerProps {
  size?: "small" | "large";
  color?: string;
  message?: string;
  overlay?: boolean;
  variant?: "spinner" | "dots" | "pulse";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "large",
  color = Colors.primary,
  message,
  overlay = false,
  variant = "spinner",
}) => {
  const containerStyle = [styles.container, overlay && styles.overlay];

  const renderSpinner = () => {
    switch (variant) {
      case "spinner":
        return <ActivityIndicator size={size} color={color} />;
      case "dots":
        return (
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, { backgroundColor: color }]} />
            <View
              style={[styles.dot, styles.dotDelay1, { backgroundColor: color }]}
            />
            <View
              style={[styles.dot, styles.dotDelay2, { backgroundColor: color }]}
            />
          </View>
        );
      case "pulse":
        return <View style={[styles.pulse, { backgroundColor: color }]} />;
      default:
        return <ActivityIndicator size={size} color={color} />;
    }
  };

  return (
    <View style={containerStyle}>
      <View style={styles.content}>
        {renderSpinner()}
        {message && <Text style={[styles.message, { color }]}>{message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.lg,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    zIndex: 1000,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    marginTop: Spacing.md,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  dotDelay1: {
    // Add animation delay if needed
  },
  dotDelay2: {
    // Add animation delay if needed
  },
  pulse: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default LoadingSpinner;
