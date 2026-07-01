import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import SocialButton from "../components/SocialButton";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) {
      nextErrors.name = "Name is required.";
    }
    if (!formData.email) {
      nextErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!formData.password) {
      nextErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      nextErrors.password = "Use at least 8 characters.";
    }
    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = "Confirm your password.";
    } else if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }
    return nextErrors;
  };

  // TanStack Query Signup Mutation
  const signupMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to sign up");
      }
      return data;
    },
    onSuccess: (data) => {
      // Auto login after successful signup
      localStorage.setItem("token", data.token || "mock-jwt-token-xyz");
      localStorage.setItem("user", JSON.stringify({ name: data.user, email: data.email }));
      
      // Redirect to home/dashboard
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

    signupMutation.mutate({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Create your account"
        subtitle="Start managing your projects on DevBoard."
        footer={
          <>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Log in
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
            id="name"
            name="name"
            label="Full name"
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            icon={User}
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

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
            placeholder="At least 8 characters"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <PasswordInput
            id="confirmPassword"
            label="Confirm password"
            placeholder="Re-enter your password"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <Button type="submit" isLoading={signupMutation.isPending}>
            Create account
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
