"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [answers, setAnswers] = useState<any>({});
  const [form, setForm] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    goal: "",
    activity: "",
    diet: "",
  });

  useEffect(() => {
    async function getUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { window.location.href = "/signup"; return; }
      setUser(session.user);

      // Load quiz answers
      const saved = localStorage.getItem("eatriv_answers");
      if (saved) {
        const parsed = JSON.parse(saved);
        setAnswers(parsed);
        setForm({
          name: session.user.user_metadata?.full_name || "",
          age: parsed.body?.age || "",
          weight: parsed.body?.weight || "",
          height: parsed.body?.height || "",
          goal: parsed.goal || "",
          activity: parsed.activity || "",
          diet: parsed.diet || "",
        });
      } else {
        setForm(f => ({ ...f, name: session.user.user_metadata?.full_name || "" }));
      }
      setLoading(false);
    }
    getUser();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  function saveProfile() {
    const updated = {
      ...answers,
      goal: form.goal,
      activity: form.activity,
      diet: form.diet,
      body: {
        age: form.age,
        weight: form.weight,
        height: form.height,
        sex: answers.body?.sex || ""
      }
    };
    localStorage.setItem("eatriv_answers", JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FEFDF8] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#B7E4C7] border-t-[#2D6A4F] rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FEFDF8] px-4 py-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-light text-[#1A1A1A]" style={{ fontFamily: "Georgia, serif" }}>
            My Profile
          </h1>
          <p className="text-sm text-gray-400 mt-1">Manage your account and nutrition preferences</p>
        </div>

        {/* Avatar card */}
        <div className="bg-[#2D6A4F] rounded-2xl p-6 mb-6 text-white flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-medium text-[#2D6A4F] flex-shrink-0">
            {form.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-lg">{form.name || "Eatriv User"}</div>
            <div className="text-green-200 text-sm">{user?.email}</div>
            <div className="text-green-300 text-xs mt-1">Free plan · Member since {new Date(user?.created_at).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</div>
          </div>
        </div>

        {/* Personal info */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
          <h3 className="font-medium text-[#1A1A1A] mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Personal information
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Full name</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                style={{ color: "#1A1A1A", backgroundColor: "#FFFFFF" }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#2D6A4F] outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Email address</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Age</label>
                <input
                  id="age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="e.g. 22"
                  onKeyDown={(e) => ["e","E","+","-"].includes(e.key) && e.preventDefault()}
                  style={{ color: "#1A1A1A", backgroundColor: "#FFFFFF" }}
                  className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#2D6A4F] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Weight (kg)</label>
                <input
                  id="weight"
                  type="number"
                  value={form.weight}
                  onChange={handleChange}
                  placeholder="e.g. 75"
                  onKeyDown={(e) => ["e","E","+","-"].includes(e.key) && e.preventDefault()}
                  style={{ color: "#1A1A1A", backgroundColor: "#FFFFFF" }}
                  className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#2D6A4F] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Height (cm)</label>
                <input
                  id="height"
                  type="number"
                  value={form.height}
                  onChange={handleChange}
                  placeholder="e.g. 170"
                  onKeyDown={(e) => ["e","E","+","-"].includes(e.key) && e.preventDefault()}
                  style={{ color: "#1A1A1A", backgroundColor: "#FFFFFF" }}
                  className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#2D6A4F] outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition preferences */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
          <h3 className="font-medium text-[#1A1A1A] mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Nutrition preferences
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">My goal</label>
              <select
                id="goal"
                value={form.goal}
                onChange={handleChange}
                style={{ color: "#1A1A1A", backgroundColor: "#FFFFFF" }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#2D6A4F] outline-none"
              >
                <option value="">Select goal</option>
                <option>Lose weight</option>
                <option>Gain muscle</option>
                <option>Eat healthier</option>
                <option>Stay on a diet</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Activity level</label>
              <select
                id="activity"
                value={form.activity}
                onChange={handleChange}
                style={{ color: "#1A1A1A", backgroundColor: "#FFFFFF" }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#2D6A4F] outline-none"
              >
                <option value="">Select activity level</option>
                <option>Sedentary</option>
                <option>Lightly active</option>
                <option>Moderately active</option>
                <option>Very active</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Diet preference</label>
              <select
                id="diet"
                value={form.diet}
                onChange={handleChange}
                style={{ color: "#1A1A1A", backgroundColor: "#FFFFFF" }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#2D6A4F] outline-none"
              >
                <option value="">Select diet</option>
                <option>No preference</option>
                <option>Vegetarian</option>
                <option>Vegan</option>
                <option>Keto</option>
                <option>Halal</option>
                <option>Paleo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={saveProfile}
          className={`w-full py-4 rounded-xl font-medium text-base transition-all mb-4 ${
            saved ? "bg-green-500 text-white" : "bg-[#2D6A4F] text-white hover:bg-[#235c43]"
          }`}
        >
          {saved ? "✓ Profile saved!" : "Save changes"}
        </button>

        {/* Danger zone */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
          <h3 className="font-medium text-[#1A1A1A] mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Account
          </h3>
          <div className="space-y-3">
            <a href="/pricing">
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all">
                <div>
                  <div className="text-sm font-medium text-[#1A1A1A]">⭐ Upgrade to Pro</div>
                  <div className="text-xs text-gray-400">₦2,999/month — unlock all features</div>
                </div>
                <span className="text-gray-400 text-sm">→</span>
              </div>
            </a>
            <a href="/onboarding">
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all">
                <div>
                  <div className="text-sm font-medium text-[#1A1A1A]">🔄 Redo nutrition quiz</div>
                  <div className="text-xs text-gray-400">Update your goals and preferences</div>
                </div>
                <span className="text-gray-400 text-sm">→</span>
              </div>
            </a>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50 cursor-pointer transition-all text-left"
            >
              <div>
                <div className="text-sm font-medium text-red-500">🚪 Sign out</div>
                <div className="text-xs text-gray-400">Sign out of your Eatriv account</div>
              </div>
              <span className="text-gray-400 text-sm">→</span>
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}