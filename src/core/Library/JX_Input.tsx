import React, { useState, useRef } from "react";

export type InputType =
  | "text"
  | "number"
  | "password"
  | "hidden"
  | "date"
  | "file"
  | "color"
  | "image"
  | "week"
  | "month"
  | "time"
  | "url"
  | "email"
  | "tel";

export type LayoutType = "row" | "column" | "outlined";

export type ValidatorFn = { [key: string]: boolean } | null;

export type ValidationsType = {
  validator: (val: any) => ValidatorFn;
  message?: string;
};

export type JxInputProps = {
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  type: InputType;
  debounceTime?: number;
  hidden?: boolean;
  label?: string;
  id?: string;
  layout?: LayoutType;
  value?: string;
  validations?: ValidationsType[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTouched?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Fixed to match App.tsx
  onInvalidtionError?: (error: string) => void;
};

/**
 * Custom Input from JX Library
 * @param placeholder - Placeholder text (default: 'Enter text...')
 * @param className - Custom className for input
 * @param disabled - Disable input field
 * @param required - Mark input as required
 * @param type - Input type (e.g., 'text', 'date', 'number')
 * @param debounceTime - Debounce time for onChange (in ms)
 * @param hidden - Hide input
 * @param label - Label text for the input
 * @param id - ID for associating label with input
 * @param layout - Layout direction: 'row', 'column', or 'outlined' (default: 'column')
 * @param value - Current value of the input for validation
 * @param validations - Array of validation rules
 * @param onChange - Callback for input changes
 * @param onTouched - Callback when input is touched (blurred)
 * @param onInvalidtionError - Callback for validation errors
 * @returns JX Input component
 */
const JXInput = React.memo(
  ({
    placeholder = "Enter text...",
    className = "",
    disabled = false,
    required = false,
    type,
    hidden = false,
    debounceTime,
    label,
    value = "",
    layout = "column",
    validations = [],
    onChange = () => {},
    onTouched = () => {},
    onInvalidtionError = () => {},
  }: JxInputProps) => {
    const [_, setTouched] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const elementId = useRef(Math.random().toString(36).substr(2, 9));
    const timerIdRef = useRef<number | null>(null);

    const debouncedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
      timerIdRef.current = setTimeout(() => {
        onChange(e);
      }, debounceTime);
    };

    const validateValue = (val: any) => {
      const validationError = validations?.find((validation) => {
        const error = validation.validator(val);
        if (error == null) return false;
        return true;
      });

      if (validationError) {
        onInvalidtionError(validationError.message ?? "Invalid value");
        setErrorMessage(validationError.message ?? "Invalid value");
      } else {
        setErrorMessage("");
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (debounceTime !== undefined) {
        debouncedChange(e);
      } else {
        onChange(e);
        validateValue(e.target.value);
      }
    };

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTouched(true);
      setIsFocused(true);
      onTouched(e);
      validateValue(e.target.value);
    };

    const isLabelFloating = isFocused || value;

    const InputJsxElements = {
      row: (
        <div className="jx-input-wrapper-row">
          <label htmlFor={elementId.current} className="jx-input-label">
            {label}
            {required && (
              <span aria-hidden="true" style={{ color: "#ef4444" }}>
                {" "}
                *
              </span>
            )}
          </label>
          <div>
            <input
              id={elementId.current}
              type={type}
              placeholder={placeholder}
              className={`jx-input ${className}`}
              disabled={disabled}
              onChange={handleChange}
              onBlur={handleBlur}
              required={required}
              hidden={hidden}
              value={value ?? ""}
              aria-invalid={!!errorMessage}
              aria-describedby={
                errorMessage ? `${elementId.current}-error` : undefined
              }
            />
            {errorMessage && (
              <span
                id={`${elementId.current}-error`}
                className="jx-input-error-text"
                role="alert"
              >
                {errorMessage}
              </span>
            )}
          </div>
        </div>
      ),
      column: (
        <div className="jx-input-wrapper-column">
          <label htmlFor={elementId.current} className="jx-input-label">
            {label}
            {required && (
              <span aria-hidden="true" style={{ color: "#ef4444" }}>
                {" "}
                *
              </span>
            )}
          </label>
          <input
            id={elementId.current}
            type={type}
            placeholder={placeholder}
            className={`jx-input ${className}`}
            disabled={disabled}
            onChange={handleChange}
            onBlur={handleBlur}
            required={required}
            hidden={hidden}
            value={value ?? ""}
            aria-invalid={!!errorMessage}
            aria-describedby={
              errorMessage ? `${elementId.current}-error` : undefined
            }
          />
          {errorMessage && (
            <span
              id={`${elementId.current}-error`}
              className="jx-input-error-text"
              role="alert"
            >
              {errorMessage}
            </span>
          )}
        </div>
      ),
      outlined: (
        <div className="jx-input-wrapper-outlined">
          <div className="jx-input-border">
            <label
              htmlFor={elementId.current}
              className={`jx-input-label jx-input-label-outlined ${
                isLabelFloating ? "jx-input-label-floating" : ""
              }`}
            >
              {label}
              {required && (
                <span aria-hidden="true" style={{ color: "#ef4444" }}>
                  {" "}
                  *
                </span>
              )}
            </label>
            <input
              id={elementId.current}
              type={type}
              placeholder={isLabelFloating ? placeholder : ""}
              className={`jx-input jx-input-outlined ${className}`}
              disabled={disabled}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
              required={required}
              hidden={hidden}
              value={value ?? ""}
              aria-invalid={!!errorMessage}
              aria-describedby={
                errorMessage ? `${elementId.current}-error` : undefined
              }
            />
            {errorMessage && (
              <span
                id={`${elementId.current}-error`}
                className="jx-input-error-text"
                role="alert"
              >
                {errorMessage}
              </span>
            )}
          </div>
        </div>
      ),
    };

    return <>{label && !hidden && InputJsxElements[layout]}</>;
  }
);

export default JXInput;
