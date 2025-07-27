import { useState, useCallback } from "react";

export interface ValidationRule {
  required?: { message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  custom?: { validate: (value: any) => boolean; message: string };
}

export interface FieldConfig {
  initialValue?: any;
  rules?: ValidationRule;
}

export interface FormConfig {
  [key: string]: FieldConfig;
}

export interface FormState {
  values: { [key: string]: any };
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
  isValid: boolean;
  isSubmitting: boolean;
}

export const useForm = <T extends Record<string, any>>(config: FormConfig) => {
  const [state, setState] = useState<FormState>(() => {
    const initialValues: { [key: string]: any } = {};

    Object.keys(config).forEach((key) => {
      initialValues[key] = config[key].initialValue || "";
    });

    return {
      values: initialValues,
      errors: {},
      touched: {},
      isValid: false,
      isSubmitting: false,
    };
  });

  const validateField = useCallback(
    (name: string, value: any): string => {
      const rules = config[name]?.rules;
      if (!rules) return "";

      // Required validation
      if (rules.required && (!value || value.toString().trim() === "")) {
        return rules.required.message;
      }

      // Skip other validations if field is empty and not required
      if (!value || value.toString().trim() === "") {
        return "";
      }

      // Min length validation
      if (rules.minLength && value.toString().length < rules.minLength.value) {
        return rules.minLength.message;
      }

      // Max length validation
      if (rules.maxLength && value.toString().length > rules.maxLength.value) {
        return rules.maxLength.message;
      }

      // Pattern validation
      if (rules.pattern && !rules.pattern.value.test(value.toString())) {
        return rules.pattern.message;
      }

      // Custom validation
      if (rules.custom && !rules.custom.validate(value)) {
        return rules.custom.message;
      }

      return "";
    },
    [config]
  );

  const setValue = useCallback(
    (name: string, value: any) => {
      setState((prev) => ({
        ...prev,
        values: { ...prev.values, [name]: value },
        errors: { ...prev.errors, [name]: validateField(name, value) },
      }));
    },
    [validateField]
  );

  const setFieldTouched = useCallback(
    (name: string, touched: boolean = true) => {
      setState((prev) => ({
        ...prev,
        touched: { ...prev.touched, [name]: touched },
      }));
    },
    []
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: { [key: string]: string } = {};
    let formIsValid = true;

    Object.keys(config).forEach((name) => {
      const error = validateField(name, state.values[name]);
      if (error) {
        newErrors[name] = error;
        formIsValid = false;
      }
    });

    setState((prev) => ({
      ...prev,
      errors: newErrors,
      isValid: formIsValid,
      touched: Object.keys(config).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      ),
    }));

    return formIsValid;
  }, [config, state.values, validateField]);

  const reset = useCallback(() => {
    const initialValues: { [key: string]: any } = {};

    Object.keys(config).forEach((key) => {
      initialValues[key] = config[key].initialValue || "";
    });

    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isValid: false,
      isSubmitting: false,
    });
  }, [config]);

  const handleSubmit = useCallback(
    async (onSubmit: (values: T) => Promise<void> | void) => {
      if (!validateForm()) return;

      setState((prev) => ({ ...prev, isSubmitting: true }));

      try {
        await onSubmit(state.values as T);
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setState((prev) => ({ ...prev, isSubmitting: false }));
      }
    },
    [validateForm, state.values]
  );

  const getFieldProps = useCallback(
    (name: string) => ({
      value: state.values[name],
      error: state.touched[name] ? state.errors[name] : undefined,
      onChangeText: (value: string) => setValue(name, value),
      onBlur: () => setFieldTouched(name, true),
    }),
    [state.values, state.errors, state.touched, setValue, setFieldTouched]
  );

  return {
    values: state.values as T,
    errors: state.errors,
    touched: state.touched,
    isValid: state.isValid,
    isSubmitting: state.isSubmitting,
    setValue,
    setFieldTouched,
    validateForm,
    reset,
    handleSubmit,
    getFieldProps,
  };
};
