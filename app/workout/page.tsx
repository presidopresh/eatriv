"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const WORKOUT_PLANS = {
  "Lose weight": {
    goal: "Lose weight",
    description: "Cardio-focused workouts to burn fat and boost metabolism",
    weeklyPlan: [
      {
        day: "Monday",
        title: "Cardio Blast",
        duration: "30 min",
        intensity: "Moderate",
        type: "Cardio",
        exercises: [
          { name: "Warm up walk", sets: "1", reps: "5 min", rest: "0" },
          { name: "Jumping jacks", sets: "3", reps: "30 reps", rest: "30s" },
          { name: "High knees", sets: "3", reps: "30 reps", rest: "30s" },
          { name: "Burpees", sets: "3", reps: "10 reps", rest: "45s" },
          { name: "Mountain climbers", sets: "3", reps: "20 reps", rest: "30s" },
          { name: "Cool down walk", sets: "1", reps: "5 min", rest: "0" },
        ]
      },
      {
        day: "Tuesday",
        title: "Active Rest",
        duration: "20 min",
        intensity: "Low",
        type: "Recovery",
        exercises: [
          { name: "Light walk", sets: "1", reps: "10 min", rest: "0" },
          { name: "Full body stretch", sets: "1", reps: "10 min", rest: "0" },
        ]
      },
      {
        day: "Wednesday",
        title: "HIIT Session",
        duration: "25 min",
        intensity: "High",
        type: "HIIT",
        exercises: [
          { name: "Jump squats", sets: "4", reps: "15 reps", rest: "30s" },
          { name: "Push ups", sets: "4", reps: "12 reps", rest: "30s" },
          { name: "Bicycle crunches", sets: "3", reps: "20 reps", rest: "30s" },
          { name: "Plank", sets: "3", reps: "30 sec", rest: "30s" },
          { name: "Lateral jumps", sets: "3", reps: "20 reps", rest: "30s" },
        ]
      },
      {
        day: "Thursday",
        title: "Rest Day",
        duration: "0 min",
        intensity: "Rest",
        type: "Rest",
        exercises: [
          { name: "Complete rest", sets: "—", reps: "Recovery is important!", rest: "—" },
        ]
      },
      {
        day: "Friday",
        title: "Full Body Cardio",
        duration: "35 min",
        intensity: "Moderate",
        type: "Cardio",
        exercises: [
          { name: "Jogging in place", sets: "1", reps: "5 min", rest: "0" },
          { name: "Squat jumps", sets: "3", reps: "15 reps", rest: "45s" },
          { name: "Push ups", sets: "3", reps: "10 reps", rest: "45s" },
          { name: "Lunges", sets: "3", reps: "12 each leg", rest: "45s" },
          { name: "Plank hold", sets: "3", reps: "45 sec", rest: "30s" },
          { name: "Cool down stretch", sets: "1", reps: "5 min", rest: "0" },
        ]
      },
      {
        day: "Saturday",
        title: "Long Walk",
        duration: "45 min",
        intensity: "Low",
        type: "Cardio",
        exercises: [
          { name: "Brisk outdoor walk", sets: "1", reps: "45 min", rest: "0" },
        ]
      },
      {
        day: "Sunday",
        title: "Rest & Stretch",
        duration: "15 min",
        intensity: "Low",
        type: "Recovery",
        exercises: [
          { name: "Full body yoga stretch", sets: "1", reps: "15 min", rest: "0" },
        ]
      },
    ]
  },
  "Gain muscle": {
    goal: "Gain muscle",
    description: "Strength training to build muscle mass and increase power",
    weeklyPlan: [
      {
        day: "Monday",
        title: "Upper Body Strength",
        duration: "45 min",
        intensity: "High",
        type: "Strength",
        exercises: [
          { name: "Push ups", sets: "4", reps: "15 reps", rest: "60s" },
          { name: "Dumbbell rows", sets: "4", reps: "12 reps", rest: "60s" },
          { name: "Shoulder press", sets: "3", reps: "12 reps", rest: "60s" },
          { name: "Bicep curls", sets: "3", reps: "12 reps", rest: "45s" },
          { name: "Tricep dips", sets: "3", reps: "12 reps", rest: "45s" },
        ]
      },
      {
        day: "Tuesday",
        title: "Lower Body Strength",
        duration: "45 min",
        intensity: "High",
        type: "Strength",
        exercises: [
          { name: "Squats", sets: "4", reps: "15 reps", rest: "60s" },
          { name: "Lunges", sets: "3", reps: "12 each leg", rest: "60s" },
          { name: "Glute bridges", sets: "3", reps: "15 reps", rest: "45s" },
          { name: "Calf raises", sets: "3", reps: "20 reps", rest: "30s" },
          { name: "Wall sit", sets: "3", reps: "45 sec", rest: "45s" },
        ]
      },
      {
        day: "Wednesday",
        title: "Active Recovery",
        duration: "20 min",
        intensity: "Low",
        type: "Recovery",
        exercises: [
          { name: "Light walk", sets: "1", reps: "10 min", rest: "0" },
          { name: "Stretching", sets: "1", reps: "10 min", rest: "0" },
        ]
      },
      {
        day: "Thursday",
        title: "Core & Back",
        duration: "40 min",
        intensity: "Moderate",
        type: "Strength",
        exercises: [
          { name: "Plank", sets: "3", reps: "60 sec", rest: "45s" },
          { name: "Superman hold", sets: "3", reps: "12 reps", rest: "45s" },
          { name: "Russian twists", sets: "3", reps: "20 reps", rest: "30s" },
          { name: "Leg raises", sets: "3", reps: "15 reps", rest: "30s" },
          { name: "Bird dog", sets: "3", reps: "10 each side", rest: "30s" },
        ]
      },
      {
        day: "Friday",
        title: "Full Body Power",
        duration: "50 min",
        intensity: "High",
        type: "Strength",
        exercises: [
          { name: "Squat jumps", sets: "4", reps: "12 reps", rest: "60s" },
          { name: "Push up variations", sets: "4", reps: "12 reps", rest: "60s" },
          { name: "Reverse lunges", sets: "3", reps: "12 each", rest: "60s" },
          { name: "Plank to downdog", sets: "3", reps: "10 reps", rest: "45s" },
          { name: "Burpees", sets: "3", reps: "8 reps", rest: "60s" },
        ]
      },
      {
        day: "Saturday",
        title: "Rest Day",
        duration: "0 min",
        intensity: "Rest",
        type: "Rest",
        exercises: [
          { name: "Complete rest", sets: "—", reps: "Your muscles grow on rest days!", rest: "—" },
        ]
      },
      {
        day: "Sunday",
        title: "Mobility & Stretch",
        duration: "25 min",
        intensity: "Low",
        type: "Recovery",
        exercises: [
          { name: "Full body mobility flow", sets: "1", reps: "25 min", rest: "0" },
        ]
      },
    ]
  },
  "default": {
    goal: "Eat healthier",
    description: "Balanced workouts to improve overall fitness and wellbeing",
    weeklyPlan: [
      {
        day: "Monday",
        title: "Full Body Workout",
        duration: "35 min",
        intensity: "Moderate",
        type: "Strength",
        exercises: [
          { name: "Squats", sets: "3", reps: "15 reps", rest: "45s" },
          { name: "Push ups", sets: "3", reps: "12 reps", rest: "45s" },
          { name: "Lunges", sets: "3", reps: "10 each", rest: "45s" },
          { name: "Plank", sets: "3", reps: "30 sec", rest: "30s" },
        ]
      },
      {
        day: "Tuesday", title: "Cardio", duration: "25 min", intensity: "Moderate", type: "Cardio",
        exercises: [
          { name: "Brisk walk or jog", sets: "1", reps: "25 min", rest: "0" },
        ]
      },
      {
        day: "Wednesday", title: "Rest", duration: "0 min", intensity: "Rest", type: "Rest",
        exercises: [{ name: "Complete rest", sets: "—", reps: "Rest and recover", rest: "—" }]
      },
      {
        day: "Thursday", title: "Core Focus", duration: "30 min", intensity: "Moderate", type: "Strength",
        exercises: [
          { name: "Plank", sets: "3", reps: "45 sec", rest: "30s" },
          { name: "Crunches", sets: "3", reps: "20 reps", rest: "30s" },
          { name: "Leg raises", sets: "3", reps: "15 reps", rest: "30s" },
          { name: "Russian twists", sets: "3", reps: "20 reps", rest: "30s" },
        ]
      },
      {
        day: "Friday", title: "Full Body", duration: "35 min", intensity: "Moderate", type: "Strength",
        exercises: [
          { name: "Squats", sets: "3", reps: "15 reps", rest: "45s" },
          { name: "Push ups", sets: "3", reps: "12 reps", rest: "45s" },
          { name: "Glute bridges", sets: "3", reps: "15 reps", rest: "45s" },
          { name: "Mountain climbers", sets: "3", reps: "20 reps", rest: "30s" },
        ]
      },
      {
        day: "Saturday", title: "Active Rest", duration: "20 min", intensity: "Low", type: "Recovery",
        exercises: [{ name: "Yoga or walk", sets: "1", reps: "20 min", rest: "0" }]
      },
      {
        day: "Sunday", title: "Rest Day", duration: "0 min", intensity: "Rest", type: "Rest",
        exercises: [{ name: "Complete rest", sets: "—", reps: "Rest well!", rest: "—" }]
      },
    ]
  }
};

const INTENSITY_COLORS: Record<string, string> = {
  "High": "bg-red-100 text-red-600",
  "Moderate": "bg-orange-100 text-orange-600",
  "Low": "bg-green-100 text-green-600",
  "Rest": "bg-gray-100 text-gray-500",
};

const TYPE_ICONS: Record<string, string> = {
  "Strength": "💪",
  "Cardio": "🏃",
  "HIIT": "⚡",
  "Recovery": "🧘",
  "Rest": "😴",
};

export default function Workout() {
  const [activeDay, setActiveDay] = useState(0);
  const [plan, setPlan] = useState(WORKOUT_PLANS["default"]);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { window.location.href = "/signup"; return; }
    }
    checkAuth();

    // Load user goal from quiz answers
    const answers = localStorage.getItem("eatriv_answers");
    if (answers) {
      const parsed = JSON.parse(answers);
      const goal = parsed.goal;
      if (goal === "Lose weight") setPlan(WORKOUT_PLANS["Lose weight"]);
      else if (goal === "Gain muscle") setPlan(WORKOUT_PLANS["Gain muscle"]);
      else setPlan(WORKOUT_PLANS["default"]);
    }

    // Set today as active day
    const today = new Date().getDay();
    setActiveDay(today === 0 ? 6 : today - 1);
  }, []);

  function toggleExercise(key: string) {
    setCompletedExercises(prev => ({ ...prev, [key]: !prev[key] }));
  }

  const todayWorkout = plan.weeklyPlan[activeDay];
  const completedCount = todayWorkout.exercises.filter((_, i) =>
    completedExercises[`${activeDay}-${i}`]
  ).length;
  const totalExercises = todayWorkout.exercises.length;

  return (
    <main className="min-h-screen bg-[#FEFDF8] px-4 py-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-light text-[#1A1A1A]" style={{ fontFamily: "Georgia, serif" }}>
            Workout Plan
          </h1>
          <p className="text-sm text-gray-400 mt-1">{plan.description}</p>
        </div>

        {/* Day tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {plan.weeklyPlan.map((day, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeDay === i
                  ? "bg-[#2D6A4F] text-white"
                  : day.type === "Rest" || day.type === "Recovery"
                  ? "bg-gray-100 text-gray-400 border border-gray-200"
                  : "bg-white border border-gray-200 text-gray-500"
              }`}
            >
              {day.day.slice(0, 3)}
            </button>
          ))}
        </div>

        {/* Today's workout card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{TYPE_ICONS[todayWorkout.type]}</span>
                <h2 className="font-medium text-[#1A1A1A]" style={{ fontFamily: "Georgia, serif" }}>
                  {todayWorkout.title}
                </h2>
              </div>
              <div className="flex gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${INTENSITY_COLORS[todayWorkout.intensity]}`}>
                  {todayWorkout.intensity}
                </span>
                {todayWorkout.duration !== "0 min" && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                    ⏱ {todayWorkout.duration}
                  </span>
                )}
              </div>
            </div>
            {todayWorkout.type !== "Rest" && (
              <div className="text-right">
                <div className="text-2xl font-light text-[#2D6A4F]">{completedCount}/{totalExercises}</div>
                <div className="text-xs text-gray-400">done</div>
              </div>
            )}
          </div>

          {/* Progress bar */}
          {todayWorkout.type !== "Rest" && totalExercises > 1 && (
            <div className="h-1.5 bg-gray-100 rounded-full mb-4 overflow-hidden">
              <div
                className="h-1.5 bg-[#2D6A4F] rounded-full transition-all"
                style={{ width: `${(completedCount / totalExercises) * 100}%` }}
              />
            </div>
          )}

          {/* Exercises */}
          <div className="space-y-2">
            {todayWorkout.exercises.map((exercise, i) => {
              const key = `${activeDay}-${i}`;
              const done = completedExercises[key];
              return (
                <div
                  key={i}
                  onClick={() => toggleExercise(key)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    done ? "bg-[#F0FFF4] border border-[#B7E4C7]" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    done ? "bg-[#2D6A4F] border-[#2D6A4F]" : "border-gray-300"
                  }`}>
                    {done && <span className="text-white text-xs">✓</span>}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${done ? "text-[#2D6A4F] line-through" : "text-[#1A1A1A]"}`}>
                      {exercise.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {exercise.sets !== "—" ? `${exercise.sets} sets × ${exercise.reps}` : exercise.reps}
                      {exercise.rest !== "0" && exercise.rest !== "—" && ` · Rest ${exercise.rest}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly overview */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
          <h3 className="font-medium text-[#1A1A1A] mb-3 text-sm" style={{ fontFamily: "Georgia, serif" }}>
            This week
          </h3>
          <div className="space-y-2">
            {plan.weeklyPlan.map((day, i) => (
              <div
                key={i}
                onClick={() => setActiveDay(i)}
                className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                  activeDay === i ? "bg-[#F0FFF4]" : "hover:bg-gray-50"
                }`}
              >
                <div className="w-8 text-xs font-medium text-gray-400">{day.day.slice(0, 3)}</div>
                <div className="text-base">{TYPE_ICONS[day.type]}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#1A1A1A]">{day.title}</div>
                  <div className="text-xs text-gray-400">{day.duration !== "0 min" ? day.duration : "Rest"}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${INTENSITY_COLORS[day.intensity]}`}>
                  {day.intensity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-[#2D6A4F] rounded-2xl p-4 text-white mb-6">
          <h3 className="font-medium mb-3 text-sm">💡 Workout tips</h3>
          <div className="space-y-2">
            {[
              "Always warm up for 5 minutes before exercising",
              "Stay hydrated — drink water before, during and after",
              "Rest days are just as important as workout days",
              "Listen to your body — stop if you feel pain",
              "Consistency over intensity — show up every day"
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