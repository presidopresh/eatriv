"use client";
import { useState } from "react";

export default function Signup() {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  function handleSubmit() {
    if (!form.email || !form.password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
  }

  if (done) {
    return (
      <main className="min-h-screen bg-[#FEFDF8] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#F0FFF4] rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            🌿
          </div>
          <h2 className="text-3xl font-light text-[#1A1A1A] mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Welcome to Eatriv!
          </h2>
          <p className="text-gray-500 mb-6">Your account is ready. Let's build your meal plan.</p>
          <a href="/onboarding">
            <button className="w-full bg-[#2D6A4F] text-white py-3 rounded-xl font-medium hover:bg-[#235c43] transition-all">
              Start my nutrition quiz →
            </button>
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FEFDF8] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">
          <a href="/">
            <div className="text-2xl font-light text-[#2D6A4F] mb-1 cursor-pointer" style={{ fontFamily: "Georgia, serif" }}>
              🌿 Eatriv
            </div>
          </a>
          <div className="text-sm text-gray-400">
            {mode === "signup" ? "Start your health journey today" : "Welcome back"}
          </div>
        </div>

        {/* Toggle tabs */}
        <div className="flex bg-white border border-gray-200 rounded-xl p-1 mb-6">
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === "signup" ? "bg-[#2D6A4F] text-white" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Sign up
          </button>
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === "login" ? "bg-[#2D6A4F] text-white" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Sign in
          </button>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-light text-[#1A1A1A] mb-1" style={{ fontFamily: "Georgia, serif" }}>
            {mode === "signup" ? "Create your account" : "Sign in to Eatriv"}
          </h2>
          <p className="text-sm text-gray-400 mb-5">
            {mode === "signup" ? "Free for your first week. No credit card needed." : "Continue where you left off."}
          </p>

          {/* Google button */}
          <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-600 hover:border-[#2D6A4F] hover:bg-[#F0FFF4] transition-all mb-4">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.576c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.576 9 3.576z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">or continue with email</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Fields */}
          {mode === "signup" && (
            <div className="mb-3">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Full name</label>
              <input
                id="name"
                type="text"
                placeholder="e.g. Chidi Okeke"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:border-[#2D6A4F] outline-none transition-all"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="text-xs font-medium text-gray-500 mb-1 block">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:border-[#2D6A4F] outline-none transition-all"
            />
          </div>

          <div className="mb-5">
            <label className="text-xs font-medium text-gray-500 mb-1 block">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:border-[#2D6A4F] outline-none transition-all"
            />
            {mode === "login" && (
              <div className="text-right mt-1">
                <span className="text-xs text-[#2D6A4F] cursor-pointer hover:underline">Forgot password?</span>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#2D6A4F] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#235c43] transition-all disabled:opacity-50"
          >
            {loading ? "Please wait..." : mode === "signup" ? "Create free account →" : "Sign in →"}
          </button>

          {/* Terms */}
          {mode === "signup" && (
            <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
              By signing up you agree to our{" "}
              <span className="text-[#2D6A4F] cursor-pointer hover:underline">Terms of Service</span>{" "}
              and{" "}
              <span className="text-[#2D6A4F] cursor-pointer hover:underline">Privacy Policy</span>
            </p>
          )}
        </div>

        {/* Switch mode */}
        <p className="text-center text-sm text-gray-400 mt-4">
          {mode === "signup" ? "Already have an account? " : "Don't have an account? "}
          <span
            onClick={() => setMode(mode === "signup" ? "login" : "signup")}
            className="text-[#2D6A4F] font-medium cursor-pointer hover:underline"
          >
            {mode === "signup" ? "Sign in" : "Sign up free"}
          </span>
        </p>

      </div>
    </main>
  );
}