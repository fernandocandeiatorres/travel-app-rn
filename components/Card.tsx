import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Colors, Spacing, BorderRadius } from "../constants";

interface CardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined";
  padding?: number;
  margin?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  padding = Spacing.md,
  margin = 0,
  style,
  onPress,
  ...props
}) => {
  const cardStyles = [
    styles.base,
    styles[variant],
    {
      padding,
      margin,
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyles} onPress={onPress} {...props}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
  },
  default: {
    backgroundColor: Colors.surface,
  },
  elevated: {
    backgroundColor: Colors.surface,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  outlined: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});

export default Card;
