import React, { forwardRef, useId, useState } from "react";
import clsx from "clsx";
import type { InputFieldProps } from "./types";

const sizeClasses: Record<NonNullable<InputFieldProps["size"]>, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-3 text-base",
  lg: "h-12 px-4 text-lg",
};

const variantClasses: Record<
  NonNullable<InputFieldProps["variant"]>,
  string
> = {
  filled:
    "bg-gray-100 dark:bg-gray-800 border border-transparent focus:bg-white dark:focus:bg-gray-900",
  outlined:
    "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700",
  ghost:
    "bg-transparent border-b border-gray-300 dark:border-gray-700 rounded-none",
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value,
      onChange,
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled,
      invalid,
      loading,
      variant = "outlined",
      size = "md",
      type = "text",
      clearable = false,
      className,
    },
    ref
  ) => {
    const inputId = useId();
    const helpId = `${inputId}-help`;
    const errorId = `${inputId}-error`;

    const [localValue, setLocalValue] = useState(value ?? "");
    const [showPassword, setShowPassword] = useState(false);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value! : localValue;

    const setValue = (v: string) => {
      if (!isControlled) setLocalValue(v);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    };

    const inputType =
      type === "password" ? (showPassword ? "text" : "password") : type;

    const describedBy = clsx(
      !invalid && helperText && helpId,
      invalid && errorMessage && errorId
    );

    return (
      <div className={clsx("w-full", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={inputType}
            value={currentValue}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled || loading}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy || undefined}
            className={clsx(
              "w-full rounded-md transition focus-ring",
              "placeholder:text-gray-400 dark:placeholder:text-gray-500",
              "disabled:opacity-60 disabled:cursor-not-allowed",
              sizeClasses[size],
              variantClasses[variant],
              invalid &&
                "border-red-500 text-red-700 dark:text-red-400 dark:border-red-500",
              loading && "pr-10"
            )}
          />

          {loading && (
            <span
              className="absolute inset-y-0 right-2 my-auto inline-flex h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-transparent"
              aria-hidden="true"
            />
          )}

          {clearable && !loading && currentValue && (
            <button
              type="button"
              onClick={() => setValue("")}
              aria-label="Clear input"
              className="absolute inset-y-0 right-2 my-auto text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ×
            </button>
          )}

          {type === "password" && !loading && (
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className={clsx(
                "absolute inset-y-0",
                clearable ? "right-7" : "right-2",
                "my-auto text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              )}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          )}
        </div>

        {!invalid && helperText && (
          <p id={helpId} className="mt-1 text-xs text-gray-500">
            {helperText}
          </p>
        )}
        {invalid && errorMessage && (
          <p
            id={errorId}
            role="status"
            aria-live="polite"
            className="mt-1 text-xs text-red-600"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
