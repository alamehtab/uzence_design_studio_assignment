import { useState } from "react";
import { X, Eye, EyeOff, Loader2 } from "lucide-react";

export interface InputFieldProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    helperText?: string;
    errorMessage?: string;
    disabled?: boolean;
    invalid?: boolean;
    loading?: boolean;
    variant?: "filled" | "outlined" | "ghost";
    size?: "sm" | "md" | "lg";
    type?: "text" | "password";
    clearable?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
    value = "",
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled = false,
    invalid = false,
    loading = false,
    variant = "outlined",
    size = "md",
    type = "text",
    clearable = false,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const sizeClasses = {
        sm: "px-2 py-1 text-sm",
        md: "px-3 py-2 text-base",
        lg: "px-4 py-3 text-lg",
    };

    const variantClasses = {
        outlined: "border border-gray-300 focus:border-blue-500 dark:border-gray-600",
        filled: "bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500",
        ghost: "bg-transparent border-b border-gray-300 focus:border-blue-500 dark:border-gray-600",
    };

    return (
        <div className="w-full flex flex-col gap-1">
            {label && (
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {label}
                </label>
            )}

            <div
                className={`relative flex items-center rounded-md transition ${disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                <input
                    type={type === "password" && showPassword ? "text" : type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled || loading}
                    className={`w-full rounded-md outline-none 
            ${sizeClasses[size]} 
            ${variantClasses[variant]} 
            ${invalid ? "border-red-500 focus:border-red-500" : ""}
            dark:text-gray-100
          `}
                />

                {loading && (
                    <Loader2 className="absolute right-2 animate-spin text-gray-400 w-5 h-5" />
                )}

                {clearable && value && !loading && !disabled && (
                    <button
                        type="button"
                        onClick={() =>
                            onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)
                        }
                        className="absolute right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        <X size={18} />
                    </button>
                )}

                {type === "password" && !loading && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
            {!invalid && helperText && (
                <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
            )}
            {invalid && errorMessage && (
                <p className="text-xs text-red-500">{errorMessage}</p>
            )}
        </div>
    );
};
