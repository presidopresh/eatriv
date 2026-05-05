"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Signup() {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Already logged in — go straight to meal plan
        window.location.href = "/mealplan";
      } else {
        setChecking(false);
      }
    }
    checkUser();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  async function handleSubmit() {
    if (!form.email || !form.password) return;
    setLoading(true);
    setError("");

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.name } }
      });
      if (error) { setError(error.message); setLoading(false); return; }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) { setError(error.message); setLoading(false); return; }
      // Signed in successfully — go to meal plan
      window.location.href = "/mealplan";
      return;
    }

    setLoading(false);
    setDone(true);
  }

  // Show loading while checking session
  if (checking) {
    return (
      <main className="min-h-screen bg-[#FEFDF8] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#B7E4C7] border-t-[#2D6A4F] rounded-full animate-spin"></div>
      </main>
    );
  }

  if (done) {
    return (
      <main className="min-h-screen bg-[#FEFDF8] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#F0FFF4] rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            🌿
          </div>
          <h2 className="text-3xl font-light text-[#1A1A1A] mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Check your email!
          </h2>
          <p className="text-gray-500 mb-6">
            We sent you a confirmation email. Click the link to activate your account then sign in.
          </p>
          <button
            onClick={() => { setDone(false); setMode("login"); }}
            className="w-full bg-[#2D6A4F] text-white py-3 rounded-xl font-medium hover:bg-[#235c43] transition-all"
          >
            Go to sign in →
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FEFDF8] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

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

        <div className="flex bg-white border border-gray-200 rounded-xl p-1 mb-6">
          <button
            onClick={() => { setMode("signup"); setError(""); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === "signup" ? "bg-[#2D6A4F] text-white" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Sign up
          </button>
          <button
            onClick={() => { setMode("login"); setError(""); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === "login" ? "bg-[#2D6A4F] text-white" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Sign in
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-light text-[#1A1A1A] mb-1" style={{ fontFamily: "Georgia, serif" }}>
            {mode === "signup" ? "Create your account" : "Sign in to Eatriv"}
          </h2>
          <p className="text-sm text-gray-400 mb-5">
            {mode === "signup" ? "Free for your first week. No credit card needed." : "Continue where you left off."}
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

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

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#2D6A4F] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#235c43] transition-all disabled:opacity-50"
          >
            {loading ? "Please wait..." : mode === "signup" ? "Create free account →" : "Sign in →"}
          </button>

          {mode === "signup" && (
            <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
              By signing up you agree to our{" "}
              <span className="text-[#2D6A4F] cursor-pointer hover:underline">Terms of Service</span>{" "}
              and{" "}
              <span className="text-[#2D6A4F] cursor-pointer hover:underline">Privacy Policy</span>
            </p>
          )}
        </div>

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