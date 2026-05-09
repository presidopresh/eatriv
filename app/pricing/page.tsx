"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Pricing() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");

  useEffect(() => {
    async function getUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setUser(session.user);
      setLoading(false);
    }
    getUser();

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  function handleNairaPayment() {
    if (!user) { window.location.href = "/signup"; return; }
    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: 299900,
      currency: "NGN",
      ref: "eatriv_" + new Date().getTime(),
      callback: function(response: any) {
        alert("🎉 Payment successful! Welcome to Eatriv Pro!\nRef: " + response.reference);
        window.location.href = "/mealplan";
      },
      onClose: function() {}
    });
    handler.openIframe();
  }

  function handleUSDPayment() {
    if (!user) { window.location.href = "/signup"; return; }
    alert("International payments coming soon! Please use Naira payment for now.");
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

        <div className="text-center mb-8">
          <a href="/mealplan">
            <div className="text-2xl font-light text-[#2D6A4F] mb-4 cursor-pointer" style={{ fontFamily: "Georgia, serif" }}>
              🌿 Eatriv
            </div>
          </a>
          <h1 className="text-3xl font-light text-[#1A1A1A] mb-3" style={{ fontFamily: "Georgia, serif" }}>
            Upgrade to Pro
          </h1>
          <p className="text-gray-500 text-sm">Unlimited meal plans, grocery lists and workout reminders</p>
        </div>

        <div className="flex bg-white border border-gray-200 rounded-xl p-1 mb-6 max-w-xs mx-auto">
          <button
            onClick={() => setCurrency("NGN")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              currency === "NGN" ? "bg-[#2D6A4F] text-white" : "text-gray-400"
            }`}
          >
            🇳🇬 Naira
          </button>
          <button
            onClick={() => setCurrency("USD")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              currency === "USD" ? "bg-[#2D6A4F] text-white" : "text-gray-400"
            }`}
          >
            🌍 USD
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-medium text-[#1A1A1A] text-lg">Free</div>
              <div className="text-gray-400 text-sm">Current plan</div>
            </div>
            <div className="text-2xl font-light text-gray-400">
              {currency === "NGN" ? "₦0" : "$0"}
            </div>
          </div>
          <div className="space-y-2">
            {["1 meal plan per week", "Basic grocery list", "3 meal plan themes"].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                <span className="text-[#2D6A4F]">✓</span> {f}
              </div>
            ))}
            {["Smart reminders", "Workout plans", "Unlimited regenerations", "Priority support"].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                <span>✗</span> {f}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#2D6A4F] rounded-2xl p-6 mb-6 text-white">

          <div className="inline-block bg-white text-[#2D6A4F] text-xs font-bold px-3 py-1 rounded-full mb-4">
            ⭐ MOST POPULAR
          </div>

          <div className="font-medium text-xl mb-1">Pro</div>
          <div className="text-green-200 text-sm mb-4">Everything you need to hit your goals</div>

          <div className="mb-1">
            <span className="text-4xl font-light">
              {currency === "NGN" ? "₦2,999" : "$4.99"}
            </span>
            <span className="text-green-200 text-sm ml-2">/month</span>
          </div>
          <div className="text-xs text-green-200 mb-6">
            {currency === "NGN" ? "~$4.99 USD equivalent · Cancel anytime" : "Cancel anytime · Billed monthly"}
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
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="text-green-300">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>

          <button
            onClick={currency === "NGN" ? handleNairaPayment : handleUSDPayment}
            className="w-full bg-white text-[#2D6A4F] py-4 rounded-xl font-medium text-base hover:bg-green-50 transition-all"
          >
            {!user
              ? "Sign in to upgrade →"
              : currency === "NGN"
              ? "Pay ₦2,999/month →"
              : "Pay $4.99/month →"}
          </button>

          <p className="text-center text-xs text-green-200 mt-3">
            {currency === "NGN"
              ? "💳 Nigerian cards, bank transfer & USSD"
              : "💳 Visa, Mastercard & international cards"}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center mb-6">
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <div className="text-2xl mb-2">🔒</div>
            <div className="text-xs font-medium text-gray-600">Secure payment</div>
            <div className="text-xs text-gray-400 mt-1">256-bit SSL</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <div className="text-2xl mb-2">↩️</div>
            <div className="text-xs font-medium text-gray-600">Cancel anytime</div>
            <div className="text-xs text-gray-400 mt-1">No questions asked</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-xs font-medium text-gray-600">Instant access</div>
            <div className="text-xs text-gray-400 mt-1">After payment</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <h3 className="font-medium text-[#1A1A1A] mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Common questions
          </h3>
          <div className="space-y-4">
            {[
              { q: "Can I cancel anytime?", a: "Yes! Cancel your subscription anytime with no questions asked. No hidden fees." },
              { q: "How do Nigerian users pay?", a: "Nigerian users pay with any Nigerian debit card, bank transfer or USSD — powered by Paystack." },
              { q: "How do international users pay?", a: "International users pay with Visa, Mastercard or any major card in USD." },
              { q: "Is my payment safe?", a: "Yes. All payments are processed by Paystack and Dodo Payments — both PCI-DSS compliant." },
              { q: "What happens after I pay?", a: "You get instant access to all Pro features — unlimited meal plans, reminders, workout plans and more." }
            ].map((item, i) => (
              <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="font-medium text-sm text-[#1A1A1A] mb-1">{item.q}</div>
                <div className="text-sm text-gray-500 leading-relaxed">{item.a}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 pb-6">
          🇳🇬 Nigerian payments by Paystack · 🌍 International payments by Dodo Payments
        </p>

      </div>
    </main>
  );
}