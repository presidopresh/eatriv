"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

type WeightEntry = {
  date: string;
  weight: number;
};

export default function Progress() {
  const [weightLog, setWeightLog] = useState<WeightEntry[]>([]);
  const [newWeight, setNewWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [startWeight, setStartWeight] = useState("");
  const [saved, setSaved] = useState(false);
  const [streak, setStreak] = useState(0);
  const [mealsLogged, setMealsLogged] = useState(0);

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) window.location.href = "/signup";
    }
    checkAuth();

    // Load saved data
    const log = localStorage.getItem("eatriv_weight_log");
    const goal = localStorage.getItem("eatriv_goal_weight");
    const start = localStorage.getItem("eatriv_start_weight");
    const streakData = localStorage.getItem("eatriv_streak");
    const meals = localStorage.getItem("eatriv_meals_logged");

    if (log) setWeightLog(JSON.parse(log));
    if (goal) setGoalWeight(goal);
    if (start) setStartWeight(start);
    if (streakData) setStreak(parseInt(streakData));
    if (meals) setMealsLogged(parseInt(meals));
  }, []);

  function logWeight() {
    if (!newWeight) return;
    const entry: WeightEntry = {
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      weight: parseFloat(newWeight)
    };
    const updated = [...weightLog, entry].slice(-10); // keep last 10
    setWeightLog(updated);
    localStorage.setItem("eatriv_weight_log", JSON.stringify(updated));
    if (!startWeight) {
      setStartWeight(newWeight);
      localStorage.setItem("eatriv_start_weight", newWeight);
    }
    setNewWeight("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function saveGoal() {
    localStorage.setItem("eatriv_goal_weight", goalWeight);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const currentWeight = weightLog.length > 0 ? weightLog[weightLog.length - 1].weight : null;
  const startWeightNum = parseFloat(startWeight) || 0;
  const goalWeightNum = parseFloat(goalWeight) || 0;
  const totalLost = currentWeight && startWeightNum ? parseFloat((startWeightNum - currentWeight).toFixed(1)) : 0;
  const toGoal = currentWeight && goalWeightNum ? parseFloat((currentWeight - goalWeightNum).toFixed(1)) : 0;

  // Progress percentage
  const progressPct = startWeightNum && goalWeightNum && currentWeight
    ? Math.min(100, Math.max(0, Math.round(((startWeightNum - currentWeight) / (startWeightNum - goalWeightNum)) * 100)))
    : 0;

  // Simple bar chart
  const maxWeight = weightLog.length > 0 ? Math.max(...weightLog.map(e => e.weight)) : 100;
  const minWeight = weightLog.length > 0 ? Math.min(...weightLog.map(e => e.weight)) : 0;
  const range = maxWeight - minWeight || 1;

  return (
    <main className="min-h-screen bg-[#FEFDF8] px-4 py-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-light text-[#1A1A1A]" style={{ fontFamily: "Georgia, serif" }}>
            Your Progress
          </h1>
          <p className="text-sm text-gray-400 mt-1">Track your weight journey and streaks</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <div className="text-2xl mb-1">🔥</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Current streak</div>
            <div className="text-3xl font-light text-[#1A1A1A]">{streak}<span className="text-sm text-gray-400 ml-1">days</span></div>
            <div className="text-xs text-gray-400 mt-1">Keep it going!</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <div className="text-2xl mb-1">⚖️</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Current weight</div>
            <div className="text-3xl font-light text-[#1A1A1A]">
              {currentWeight ? `${currentWeight}` : "—"}
              <span className="text-sm text-gray-400 ml-1">kg</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {totalLost > 0 ? `↓ ${totalLost}kg lost` : "Log your weight"}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">To goal</div>
            <div className="text-3xl font-light text-[#1A1A1A]">
              {toGoal > 0 ? `${toGoal}` : "—"}
              <span className="text-sm text-gray-400 ml-1">kg</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {goalWeight ? `Goal: ${goalWeight}kg` : "Set your goal"}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <div className="text-2xl mb-1">🍽️</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Meals logged</div>
            <div className="text-3xl font-light text-[#1A1A1A]">{mealsLogged}<span className="text-sm text-gray-400 ml-1">total</span></div>
            <div className="text-xs text-gray-400 mt-1">This month</div>
          </div>
        </div>

        {/* Progress bar to goal */}
        {goalWeight && startWeight && (
          <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-[#1A1A1A]">Goal progress</div>
              <div className="text-sm font-medium text-[#2D6A4F]">{progressPct}%</div>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div
                className="h-3 bg-[#2D6A4F] rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Start: {startWeight}kg</span>
              <span>Goal: {goalWeight}kg</span>
            </div>
          </div>
        )}

        {/* Weight chart */}
        {weightLog.length > 1 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
            <h3 className="font-medium text-[#1A1A1A] mb-4 text-sm" style={{ fontFamily: "Georgia, serif" }}>
              Weight journey
            </h3>
            <div className="flex items-end gap-2 h-32">
              {weightLog.map((entry, i) => {
                const heightPct = range === 0 ? 50 : ((entry.weight - minWeight) / range) * 80 + 10;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-xs text-gray-400">{entry.weight}</div>
                    <div
                      className="w-full bg-[#2D6A4F] rounded-t-lg transition-all"
                      style={{ height: `${heightPct}%`, minHeight: 8, opacity: i === weightLog.length - 1 ? 1 : 0.5 }}
                    />
                    <div className="text-xs text-gray-400 truncate w-full text-center">{entry.date}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Log weight */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-4">
          <h3 className="font-medium text-[#1A1A1A] mb-3 text-sm" style={{ fontFamily: "Georgia, serif" }}>
            Log today's weight
          </h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="e.g. 74.5"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              onKeyDown={(e) => ["e","E","+","-"].includes(e.key) && e.preventDefault()}
              style={{ color: "#1A1A1A", backgroundColor: "#FFFFFF" }}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#2D6A4F] outline-none"
            />
            <span className="flex items-center text-gray-400 text-sm">kg</span>
            <button
              onClick={logWeight}
              className="bg-[#2D6A4F] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#235c43] transition-all"
            >
              {saved ? "✓" : "Save"}
            </button>
          </div>
        </div>

        {/* Set goal weight */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
          <h3 className="font-medium text-[#1A1A1A] mb-3 text-sm" style={{ fontFamily: "Georgia, serif" }}>
            Set goal weight
          </h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="e.g. 70.0"
              value={goalWeight}
              onChange={(e) => setGoalWeight(e.target.value)}
              onKeyDown={(e) => ["e","E","+","-"].includes(e.key) && e.preventDefault()}
              style={{ color: "#1A1A1A", backgroundColor: "#FFFFFF" }}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#2D6A4F] outline-none"
            />
            <span className="flex items-center text-gray-400 text-sm">kg</span>
            <button
              onClick={saveGoal}
              className="bg-[#2D6A4F] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#235c43] transition-all"
            >
              Set
            </button>
          </div>
        </div>

        {/* Weight log history */}
        {weightLog.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
            <h3 className="font-medium text-[#1A1A1A] mb-3 text-sm" style={{ fontFamily: "Georgia, serif" }}>
              Weight history
            </h3>
            <div className="space-y-2">
              {[...weightLog].reverse().map((entry, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-500">{entry.date}</span>
                  <span className="text-sm font-medium text-[#1A1A1A]">{entry.weight} kg</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Motivational tips */}
        <div className="bg-[#2D6A4F] rounded-2xl p-4 mb-6 text-white">
          <h3 className="font-medium mb-3 text-sm">💡 Tips to stay on track</h3>
          <div className="space-y-2">
            {[
              "Weigh yourself at the same time every day — morning is best",
              "Weight fluctuates daily — focus on the weekly trend",
              "1 glass of water = ~240ml. Aim for 8 glasses daily",
              "Consistency beats perfection every time"
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-green-100">
                <span className="text-green-300 flex-shrink-0">•</span>
                {tip}
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}