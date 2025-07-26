import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
} from "react-native";
import { Colors, Spacing, BorderRadius } from "../constants";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  fullWidth?: boolean;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "medium",
  loading = false,
  fullWidth = false,
  icon,
  style,
  disabled,
  ...props
}) => {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.baseText,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
  ];

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity style={buttonStyles} disabled={isDisabled} {...props}>
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? Colors.surface : Colors.primary}
          size="small"
        />
      ) : (
        <Text style={textStyles}>
          {icon && `${icon} `}
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  text: {
    backgroundColor: "transparent",
  },
  small: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  medium: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  large: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    opacity: 0.6,
  },
  baseText: {
    fontWeight: "600",
    textAlign: "center",
  },
  primaryText: {
    color: Colors.surface,
  },
  secondaryText: {
    color: Colors.surface,
  },
  outlineText: {
    color: Colors.primary,
  },
  textText: {
    color: Colors.primary,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    opacity: 0.6,
  },
});

export default Button;
