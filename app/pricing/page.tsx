"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { usePaystackPayment } from "react-paystack";

export default function Pricing() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
      setLoading(false);
    }
    getUser();
  }, []);

  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email || "",
    amount: 499 * 100, // ₦499 in kobo (Paystack uses kobo)
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    currency: "NGN",
    metadata: {
      custom_fields: [
        {
          display_name: "Plan",
          variable_name: "plan",
          value: "Eatriv Pro"
        }
      ]
    }
  };

  const initializePayment = usePaystackPayment(config);

  function onSuccess(reference: any) {
    console.log("Payment successful!", reference);
    // Here we would update the user's subscription in Supabase
    alert("🎉 Payment successful! Welcome to Eatriv Pro!");
    window.location.href = "/mealplan";
  }

  function onClose() {
    console.log("Payment closed");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FEFDF8] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#B7E4C7] border-t-[#2D6A4F] rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FEFDF8] px-4 py-10">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <a href="/mealplan">
            <div className="text-2xl font-light text-[#2D6A4F] mb-4 cursor-pointer" style={{ fontFamily: "Georgia, serif" }}>
              🌿 Eatriv
            </div>
          </a>
          <h1 className="text-3xl font-light text-[#1A1A1A] mb-3" style={{ fontFamily: "Georgia, serif" }}>
            Upgrade to Pro
          </h1>
          <p className="text-gray-500">Get unlimited meal plans, grocery lists and workout reminders</p>
        </div>

        {/* Free plan */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-medium text-[#1A1A1A] text-lg">Free</div>
              <div className="text-gray-400 text-sm">Current plan</div>
            </div>
            <div className="text-2xl font-light text-gray-400">₦0</div>
          </div>
          <div className="space-y-2">
            {["1 meal plan per week", "Basic grocery list", "3 meal plan themes"].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                <span className="text-green-500">✓</span> {f}
              </div>
            ))}
            {["Smart reminders", "Workout plans", "Unlimited regenerations", "Priority support"].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                <span>✗</span> {f}
              </div>
            ))}
          </div>
        </div>

        {/* Pro plan */}
        <div className="bg-[#2D6A4F] rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-white text-[#2D6A4F] text-xs font-bold px-3 py-1 rounded-full">
            MOST POPULAR
          </div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-medium text-xl mb-1">Pro</div>
              <div className="text-green-200 text-sm">Everything you need</div>
            </div>
            <div>
              <div className="text-3xl font-light">₦499</div>
              <div className="text-green-200 text-sm text-right">/month</div>
            </div>
          </div>

          <div className="text-xs text-green-200 mb-4">
            ~$4.99 USD · Cancel anytime
          </div>

          <div className="space-y-2 mb-6">
            {[
              "Unlimited meal plans",
              "Full grocery list with quantities",
              "Smart eat & workout reminders",
              "Workout plans matched to your goal",
              "Progress tracking dashboard",
              "All meal plan themes",
              "Priority AI updates",
              "Priority support"
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-white">
                <span className="text-green-300">✓</span> {f}
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              if (!user) {
                window.location.href = "/signup";
                return;
              }
              initializePayment({ onSuccess, onClose });
            }}
            className="w-full bg-white text-[#2D6A4F] py-4 rounded-xl font-medium text-base hover:bg-green-50 transition-all"
          >
            {user ? "Upgrade to Pro — ₦499/mo" : "Sign in to upgrade"}
          </button>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { icon: "🔒", text: "Secure payment" },
            { icon: "↩️", text: "Cancel anytime" },
            { icon: "⚡", text: "Instant access" }
          ].map((badge, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-3">
              <div className="text-xl mb-1">{badge.icon}</div>
              <div className="text-xs text-gray-500">{badge.text}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Payments secured by Paystack · Nigerian & international cards accepted
        </p>

      </div>
    </main>
  );
}