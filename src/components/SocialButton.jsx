/**
 * Google sign-in/sign-up button. UI only — wire up the onClick
 * handler to your OAuth flow later.
 */
export default function SocialButton({
  label = "Continue with Google",
  onClick,
  ...rest
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border
        border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700
        transition-colors duration-150 hover:bg-slate-50 focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      {...rest}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3.01h3.87c2.27-2.09 3.55-5.17 3.55-8.66z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.95-1.08 7.94-2.92l-3.87-3.01c-1.08.73-2.46 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11C3.26 21.3 7.31 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.27 14.27a7.28 7.28 0 010-4.54V6.62H1.27a11.98 11.98 0 000 10.76l4-3.11z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.27 6.62l4 3.11C6.22 6.86 8.87 4.75 12 4.75z"
        />
      </svg>
      <span>{label}</span>
    </button>
  );
}