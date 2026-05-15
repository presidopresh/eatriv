"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

type Reminder = {
  id: string;
  icon: string;
  name: string;
  time: string;
  days: boolean[];
  enabled: boolean;
  category: string;
};

const DEFAULT_REMINDERS: Reminder[] = [
  { id: "breakfast", icon: "🌅", name: "Breakfast", time: "07:00", days: [true, true, true, true, true, false, false], enabled: true, category: "meal" },
  { id: "lunch", icon: "🥗", name: "Lunch", time: "12:30", days: [true, true, true, true, true, true, true], enabled: true, category: "meal" },
  { id: "dinner", icon: "🍲", name: "Dinner", time: "19:00", days: [true, true, true, true, true, true, true], enabled: true, category: "meal" },
  { id: "water1", icon: "💧", name: "Morning hydration", time: "08:00", days: [true, true, true, true, true, true, true], enabled: true, category: "water" },
  { id: "water2", icon: "💧", name: "Mid-morning water", time: "10:00", days: [true, true, true, true, true, true, true], enabled: true, category: "water" },
  { id: "water3", icon: "💧", name: "Afternoon hydration", time: "14:00", days: [true, true, true, true, true, true, true], enabled: true, category: "water" },
  { id: "water4", icon: "💧", name: "Evening water", time: "17:00", days: [true, true, true, true, true, true, true], enabled: true, category: "water" },
  { id: "workout", icon: "🏋️", name: "Workout time", time: "18:00", days: [true, false, true, false, true, true, false], enabled: true, category: "workout" },
];

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const DAYS_FULL = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>(DEFAULT_REMINDERS);
  const [activeTab, setActiveTab] = useState<"all" | "meal" | "water" | "workout">("all");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) window.location.href = "/signup";
    }
    checkAuth();

    const saved = localStorage.getItem("eatriv_reminders");
    if (saved) setReminders(JSON.parse(saved));
  }, []);

  function toggleEnabled(id: string) {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  }

  function toggleDay(id: string, dayIndex: number) {
    setReminders(prev => prev.map(r => {
      if (r.id !== id) return r;
      const newDays = [...r.days];
      newDays[dayIndex] = !newDays[dayIndex];
      return { ...r, days: newDays };
    }));
  }

  function updateTime(id: string, time: string) {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, time } : r));
  }

  function saveReminders() {
    localStorage.setItem("eatriv_reminders", JSON.stringify(reminders));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const filtered = activeTab === "all" ? reminders : reminders.filter(r => r.category === activeTab);

  const tabs = [
    { key: "all", label: "All" },
    { key: "meal", label: "🍽️ Meals" },
    { key: "water", label: "💧 Water" },
    { key: "workout", label: "🏋️ Workout" },
  ];

  const waterCount = reminders.filter(r => r.category === "water" && r.enabled).length;

  return (
    <main className="min-h-screen bg-[#FEFDF8] px-4 py-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-light text-[#1A1A1A]" style={{ fontFamily: "Georgia, serif" }}>
            Smart Reminders
          </h1>
          <p className="text-sm text-gray-400 mt-1">Never miss a meal, workout or hydration check</p>
        </div>

        {/* Hydration summary card */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
            💧
          </div>
          <div className="flex-1">
            <div className="font-medium text-blue-800 text-sm mb-0.5">Daily hydration goal</div>
            <div className="text-xs text-blue-500">
              {waterCount} water reminders active · Aim for 8 glasses (2 litres) per day
            </div>
            <div className="flex gap-1 mt-2">
              {[1,2,3,4,5,6,7,8].map((_, i) => (
                <div key={i} className={`h-2 flex-1 rounded-full ${i < waterCount * 2 ? "bg-blue-400" : "bg-blue-100"}`}/>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-[#2D6A4F] text-white"
                  : "bg-white border border-gray-200 text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reminder cards */}
        <div className="space-y-3 mb-6">
          {filtered.map(reminder => (
            <div key={reminder.id} className={`bg-white border rounded-2xl p-4 transition-all ${reminder.enabled ? "border-gray-200" : "border-gray-100 opacity-60"}`}>
              <div className="flex items-center gap-3 mb-3">

                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                  reminder.category === "water" ? "bg-blue-50" :
                  reminder.category === "workout" ? "bg-purple-50" : "bg-[#F0FFF4]"
                }`}>
                  {reminder.icon}
                </div>

                {/* Name & time */}
                <div className="flex-1">
                  <div className="font-medium text-[#1A1A1A] text-sm">{reminder.name}</div>
                  <input
                    type="time"
                    value={reminder.time}
                    onChange={(e) => updateTime(reminder.id, e.target.value)}
                    className="text-xs text-gray-400 bg-transparent border-none outline-none mt-0.5 cursor-pointer"
                    disabled={!reminder.enabled}
                  />
                </div>

                {/* Toggle */}
                <div
                  onClick={() => toggleEnabled(reminder.id)}
                  className={`w-11 h-6 rounded-full cursor-pointer transition-all flex items-center px-0.5 ${
                    reminder.enabled ? "bg-[#2D6A4F]" : "bg-gray-200"
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-all ${reminder.enabled ? "translate-x-5" : "translate-x-0"}`}/>
                </div>
              </div>

              {/* Day selector */}
              {reminder.enabled && (
                <div className="flex gap-1.5">
                  {DAYS.map((day, i) => (
                    <button
                      key={i}
                      onClick={() => toggleDay(reminder.id, i)}
                      className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${
                        reminder.days[i]
                          ? reminder.category === "water"
                            ? "bg-blue-400 text-white"
                            : reminder.category === "workout"
                            ? "bg-purple-400 text-white"
                            : "bg-[#2D6A4F] text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Water tips */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
          <h3 className="font-medium text-[#1A1A1A] mb-3 text-sm" style={{ fontFamily: "Georgia, serif" }}>
            💧 Hydration tips
          </h3>
          <div className="space-y-2">
            {[
              "Drink a glass of water first thing in the morning",
              "Drink water 30 minutes before each meal",
              "Carry a water bottle everywhere you go",
              "Drink more water on days you exercise",
              "Your urine should be pale yellow — that's a good sign!"
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-500">
                <span className="text-blue-400 flex-shrink-0 mt-0.5">•</span>
                {tip}
              </div>
            ))}
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={saveReminders}
          className={`w-full py-4 rounded-xl font-medium text-base transition-all ${
            saved
              ? "bg-green-500 text-white"
              : "bg-[#2D6A4F] text-white hover:bg-[#235c43]"
          }`}
        >
          {saved ? "✓ Reminders saved!" : "Save reminders"}
        </button>

      </div>
    </main>
  );
}