import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

/**
 * Password field with a visibility toggle. Kept separate from InputField
 * because the toggle button occupies the trailing icon slot.
 */
export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  error,
  autoComplete = "current-password",
  placeholder = "Enter your password",
  required = true,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
          <Lock className="h-4 w-4" aria-hidden="true" />
        </span>

        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-lg border bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900
            placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-blue-500 transition-colors
            ${
              error
                ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                : "border-slate-300"
            }`}
        />

        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-3 flex items-center text-slate-400
            hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-blue-500 rounded"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}