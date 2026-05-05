"use client";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        window.location.href = "/mealplan";
      }
    }
    checkUser();
  }, []);

  return (
    <main className="min-h-screen bg-[#FEFDF8] flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-lg">

        <div className="w-14 h-14 bg-[#2D6A4F] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
          🌿
        </div>

        <h1 className="text-5xl font-light text-[#2D6A4F] mb-4"
          style={{fontFamily: 'Georgia, serif'}}>
          Eatriv
        </h1>

        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          Your AI-powered nutrition coach. Personalised meal plans, grocery lists and workout reminders — built around your goals.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/onboarding">
            <button className="bg-[#2D6A4F] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#235c43] transition-all">
              Get started free
            </button>
          </a>
          <a href="/signup">
            <button className="border border-[#2D6A4F] text-[#2D6A4F] px-8 py-3 rounded-xl font-medium hover:bg-[#F0FFF4] transition-all">
              Sign in
            </button>
          </a>
        </div>

        <p className="text-gray-400 text-sm mt-6">
          $4.99/mo after free trial · Cancel anytime
        </p>

      </div>
    </main>
  )
}