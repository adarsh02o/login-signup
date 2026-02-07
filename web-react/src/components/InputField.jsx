import { useState } from 'react';

export default function InputField({
    type = 'text',
    id,
    name,
    label,
    placeholder,
    icon,
    value,
    onChange,
    onFocus,
    error,
    autoComplete,
    showPasswordToggle = false,
    className = '',
    staggerClass = '',
}) {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = showPasswordToggle
        ? (showPassword ? 'text' : 'password')
        : type;

    const hasError = !!error;

    return (
        <div className={`space-y-1.5 field-reveal ${staggerClass}`}>
            <label
                htmlFor={id}
                className="text-xs sm:text-sm font-medium ml-1 text-slate-800 dark:text-gray-300"
            >
                {label}
            </label>
            <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 group-focus-within:text-[#2b4bee] transition-colors duration-200">
                    <span className="material-symbols-outlined text-[18px] sm:text-[20px]">{icon}</span>
                </span>
                <input
                    type={inputType}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    className={`w-full text-sm rounded-xl pl-10 sm:pl-11 ${showPasswordToggle ? 'pr-11' : ''} p-3 sm:p-3.5 transition-all duration-200
                           ${hasError
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-slate-200 dark:border-slate-700 focus:border-[#2b4bee]'
                        }
                           bg-slate-100 dark:bg-[#12131a] border text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500
                           focus:outline-none focus:ring-0 ${className}`}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                />
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="toggle-password absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 dark:text-slate-400 hover:text-[#2b4bee] transition-colors duration-200"
                        aria-label="Toggle password visibility"
                    >
                        <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                            {showPassword ? 'visibility' : 'visibility_off'}
                        </span>
                    </button>
                )}
            </div>
            {error && (
                <p className="error-msg text-red-500 text-xs ml-1">{error}</p>
            )}
        </div>
    );
}
