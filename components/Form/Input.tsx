import React, { forwardRef } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";
import { Colors, Spacing, BorderRadius } from "../../constants";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  variant?: "default" | "outlined" | "filled";
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      leftIcon,
      rightIcon,
      variant = "default",
      style,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;

    return (
      <View style={styles.container}>
        {label && (
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        )}

        <View
          style={[
            styles.inputContainer,
            styles[variant],
            hasError && styles.inputError,
          ]}
        >
          {leftIcon && <Text style={styles.icon}>{leftIcon}</Text>}

          <TextInput
            ref={ref}
            style={[styles.input, style]}
            placeholderTextColor={Colors.textSecondary}
            {...props}
          />

          {rightIcon && <Text style={styles.icon}>{rightIcon}</Text>}
        </View>

        {(error || helperText) && (
          <Text style={[styles.helperText, hasError && styles.errorText]}>
            {error || helperText}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  required: {
    color: Colors.error,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
  },
  default: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  outlined: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  filled: {
    backgroundColor: Colors.background,
    borderWidth: 0,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: 16,
    color: Colors.text,
  },
  inputError: {
    borderColor: Colors.error,
  },
  icon: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginHorizontal: Spacing.xs,
  },
  helperText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  errorText: {
    color: Colors.error,
  },
});

export default Input;
