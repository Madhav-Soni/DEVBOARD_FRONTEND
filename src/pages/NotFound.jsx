import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/AuthCard";

export default function NotFound() {
  return (
    <AuthLayout>
      <AuthCard
        title="404 - Page not found"
        subtitle="The page you are looking for doesn't exist or has been moved."
        footer={
          <Link
            to="/login"
            className="inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        }
      >
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600 mb-6">
            <AlertCircle className="h-8 w-8" />
          </div>
          
          <p className="text-slate-600 text-sm mb-4">
            We couldn't find the page at this address. Check the URL or click below to return safely to your workspace.
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
