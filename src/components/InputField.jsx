/**
 * Generic labeled input field used for email, name, etc.
 * Renders an accessible label, optional leading icon, and an
 * error message slot wired up with aria-describedby.
 */
export default function InputField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  autoComplete,
  required = false,
  ...rest
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-lg border bg-white py-2.5 text-sm text-slate-900
            placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-blue-500 transition-colors
            ${Icon ? "pl-10 pr-3" : "px-3"}
            ${
              error
                ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                : "border-slate-300"
            }`}
          {...rest}
        />
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}