import React from "react";

export default function WelcomeBanner({ name }) {
  const hours = new Date().getHours();
  let greeting = "Welcome back";
  if (hours < 12) greeting = "Good morning";
  else if (hours < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white shadow-md sm:px-8 sm:py-10">
      {/* Decorative background shapes */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-xl" />
      <div className="absolute -bottom-20 -left-10 h-60 w-60 rounded-full bg-indigo-500/20 blur-2xl" />

      <div className="relative z-10 max-w-xl">
        <h1 className="text-2xl font-bold sm:text-3xl">
          {greeting}, {name}!
        </h1>
        <p className="mt-2 text-sm text-blue-100 sm:text-base">
          Here's what's happening with your workspace today. Track progress, manage tasks, and coordinate with your team.
        </p>
      </div>
    </div>
  );
}
