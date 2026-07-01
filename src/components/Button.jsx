import { Loader2 } from "lucide-react";

const VARIANT_STYLES = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300",
  secondary:
    "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 active:bg-slate-100 disabled:text-slate-400 disabled:bg-slate-50",
};

/**
 * Standard button used across the auth flow (and beyond).
 * Handles disabled + loading states so pages don't repeat that logic.
 */
export default function Button({
  children,
  type = "button",
  variant = "primary",
  isLoading = false,
  disabled = false,
  onClick,
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5
        text-sm font-medium transition-colors duration-150 focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
        disabled:cursor-not-allowed ${VARIANT_STYLES[variant]} ${className}`}
      {...rest}
    >
      {isLoading && (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      <span>{isLoading ? "Please wait…" : children}</span>
    </button>
  );
}