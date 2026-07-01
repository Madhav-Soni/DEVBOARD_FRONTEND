import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import SocialButton from "../components/SocialButton";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.email) {
      nextErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!formData.password) {
      nextErrors.password = "Password is required.";
    }
    return nextErrors;
  };

  // TanStack Query Login Mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to log in");
      }
      return data;
    },
    onSuccess: (data) => {
      // Store token in localStorage (or sessionStorage if rememberMe is false)
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", data.token || "mock-jwt-token-xyz");
      storage.setItem("user", JSON.stringify({ name: data.user, email: data.email }));

      // Redirect to home or dashboard
      navigate("/");
    },
    onError: (error) => {
      setFormError(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    loginMutation.mutate({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Welcome back"
        subtitle="Log in to your DevBoard workspace."
        footer={
          <>
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Sign up
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {formError && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {formError}
            </div>
          )}

          <InputField
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            icon={Mail}
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <PasswordInput
            id="password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className="flex items-center justify-between">
            <label
              htmlFor="remember-me"
              className="flex items-center gap-2 text-sm text-slate-600"
            >
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600
                  focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" isLoading={loginMutation.isPending}>
            Log in
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
            or
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <SocialButton
          label="Continue with Google"
          onClick={() => {
            // TODO: wire up Google OAuth flow
            alert("Google OAuth flow to be implemented");
          }}
        />
      </AuthCard>
    </AuthLayout>
  );
}
