"use client";
import { useState } from "react";

const steps = [
  {
    id: 1,
    label: "Your goal",
    question: "What do you want to achieve?",
    hint: "We'll personalise everything around this.",
    key: "goal",
    type: "single",
    options: [
      { icon: "🔥", title: "Lose weight", desc: "Burn fat, feel lighter" },
      { icon: "💪", title: "Gain muscle", desc: "Build strength and size" },
      { icon: "🥗", title: "Eat healthier", desc: "Better habits, more energy" },
      { icon: "📋", title: "Stay on a diet", desc: "Commit to a specific plan" },
    ],
  },
  {
    id: 2,
    label: "Your body",
    question: "Tell us about yourself",
    hint: "Used to calculate your ideal calorie targets.",
    key: "body",
    type: "inputs",
    fields: [
      { id: "age", label: "Age", placeholder: "e.g. 22", type: "number" },
      { id: "sex", label: "Sex", placeholder: "", type: "select", options: ["Male", "Female", "Prefer not to say"] },
      { id: "weight", label: "Weight (kg)", placeholder: "e.g. 75", type: "number" },
      { id: "height", label: "Height (cm)", placeholder: "e.g. 170", type: "number" },
    ],
  },
  {
    id: 3,
    label: "Activity level",
    question: "How active are you currently?",
    hint: "Be honest — this shapes your calorie needs.",
    key: "activity",
    type: "single",
    options: [
      { icon: "🪑", title: "Sedentary", desc: "Desk job, little movement" },
      { icon: "🚶", title: "Lightly active", desc: "Walk daily, light exercise" },
      { icon: "🏃", title: "Moderately active", desc: "Exercise 3–4x per week" },
      { icon: "🏋️", title: "Very active", desc: "Intense training daily" },
    ],
  },
  {
    id: 4,
    label: "Diet preference",
    question: "Do you follow any specific diet?",
    hint: "We'll make sure every meal fits your lifestyle.",
    key: "diet",
    type: "single",
    options: [
      { icon: "🍽️", title: "No preference", desc: "Eat everything" },
      { icon: "🥦", title: "Vegetarian", desc: "No meat" },
      { icon: "🌱", title: "Vegan", desc: "No animal products" },
      { icon: "🥑", title: "Keto", desc: "Low carb, high fat" },
      { icon: "☪️", title: "Halal", desc: "Halal certified foods" },
      { icon: "🫘", title: "Paleo", desc: "Whole, unprocessed foods" },
    ],
  },
  {
    id: 5,
    label: "Food safety",
    question: "Any allergies or foods to avoid?",
    hint: "Select all that apply. We'll never suggest these.",
    key: "allergies",
    type: "multi",
    options: ["Gluten", "Dairy", "Nuts", "Eggs", "Soy", "Seafood", "Shellfish", "Pork", "None"],
  },
  {
    id: 6,
    label: "Meal schedule",
    question: "How many meals do you eat per day?",
    hint: "This shapes how we split your daily nutrition.",
    key: "meals",
    type: "single",
    options: [
      { icon: "⏱️", title: "2 meals", desc: "Intermittent fasting" },
      { icon: "🍳", title: "3 meals", desc: "Classic routine" },
      { icon: "🥙", title: "4–5 meals", desc: "Small frequent meals" },
      { icon: "🔄", title: "Flexible", desc: "Changes daily" },
    ],
  },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [bodyFields, setBodyFields] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const step = steps[current];
  const progress = ((current + 1) / steps.length) * 100;

  function selectSingle(value: string) {
    setAnswers({ ...answers, [step.key]: value });
  }

  function toggleMulti(value: string) {
    const current_vals: string[] = answers[step.key] || [];
    if (value === "None") {
      setAnswers({ ...answers, [step.key]: ["None"] });
      return;
    }
    const filtered = current_vals.filter((v) => v !== "None");
    if (filtered.includes(value)) {
      setAnswers({ ...answers, [step.key]: filtered.filter((v) => v !== value) });
    } else {
      setAnswers({ ...answers, [step.key]: [...filtered, value] });
    }
  }

  function canProceed() {
    if (step.type === "single") return !!answers[step.key];
    if (step.type === "multi") return true;
    if (step.type === "inputs") {
      return bodyFields.age && bodyFields.sex && bodyFields.weight && bodyFields.height;
    }
    return true;
  }

  function next() {
    if (!canProceed()) return;
    if (step.type === "inputs") {
      setAnswers({ ...answers, body: bodyFields });
    }
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  }

  function back() {
    if (current > 0) setCurrent(current - 1);
  }

  if (done) {
    return (
      <main className="min-h-screen bg-[#FEFDF8] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#F0FFF4] rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🌿</div>
          <h2 className="text-3xl font-light text-[#1A1A1A] mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Your plan is ready!
          </h2>
         <p className="text-gray-500 mb-6">Eatriv is building your personalised meal plan and grocery list right now.</p>
  <a href="/signup">
    <button className="w-full bg-[#2D6A4F] text-white py-3 rounded-xl font-medium hover:bg-[#235c43] transition-all">
      Go to my meal plan →
    </button>
  </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FEFDF8] px-4 py-8">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-2xl font-light text-[#2D6A4F] mb-1" style={{ fontFamily: "Georgia, serif" }}>🌿 Eatriv</div>
          <div className="text-sm text-gray-400">Your personal nutrition coach</div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-200 rounded-full mb-2">
          <div className="h-1 bg-[#2D6A4F] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-xs text-gray-400 text-center mb-6">Step {current + 1} of {steps.length}</div>

        {/* Question */}
        <div className="mb-6">
          <div className="text-xs font-medium uppercase tracking-widest text-[#D4845A] mb-1">{step.label}</div>
          <h2 className="text-2xl font-light text-[#1A1A1A] mb-1" style={{ fontFamily: "Georgia, serif" }}>{step.question}</h2>
          <p className="text-sm text-gray-400">{step.hint}</p>
        </div>

        {/* Single select */}
        {step.type === "single" && (
          <div className="grid gap-3">
            {step.options?.map((opt: any) => (
              <div
                key={opt.title}
                onClick={() => selectSingle(opt.title)}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  answers[step.key] === opt.title
                    ? "border-[#2D6A4F] bg-[#F0FFF4]"
                    : "border-gray-200 bg-white hover:border-[#2D6A4F]"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-[#F0FFF4] flex items-center justify-center text-xl flex-shrink-0">{opt.icon}</div>
                <div>
                  <div className="font-medium text-[#1A1A1A] text-sm">{opt.title}</div>
                  <div className="text-xs text-gray-400">{opt.desc}</div>
                </div>
                <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  answers[step.key] === opt.title ? "bg-[#2D6A4F] border-[#2D6A4F]" : "border-gray-300"
                }`}>
                  {answers[step.key] === opt.title && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Multi select */}
        {step.type === "multi" && (
          <div className="flex flex-wrap gap-2">
            {step.options?.map((opt: any) => (
              <div
                key={opt}
                onClick={() => toggleMulti(opt)}
                className={`px-4 py-2 rounded-full border-2 cursor-pointer text-sm font-medium transition-all ${
                  (answers[step.key] || []).includes(opt)
                    ? "border-[#2D6A4F] bg-[#F0FFF4] text-[#2D6A4F]"
                    : "border-gray-200 bg-white text-gray-500 hover:border-[#2D6A4F]"
                }`}
              >
                {opt}
              </div>
            ))}
          </div>
        )}

        {/* Input fields */}
        {step.type === "inputs" && (
          <div className="grid grid-cols-2 gap-3">
            {step.fields?.map((field: any) => (
              <div key={field.id}>
                <label className="text-xs font-medium text-gray-500 mb-1 block">{field.label}</label>
                {field.type === "select" ? (
                  <select
                    className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#2D6A4F] outline-none bg-white"
                    value={bodyFields[field.id] || ""}
                    onChange={(e) => setBodyFields({ ...bodyFields, [field.id]: e.target.value })}
                  >
                    <option value="">Select</option>
                    {field.options.map((o: string) => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#2D6A4F] outline-none"
                    value={bodyFields[field.id] || ""}
                    onChange={(e) => setBodyFields({ ...bodyFields, [field.id]: e.target.value })}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={back}
            className={`text-sm text-gray-400 hover:text-gray-600 transition-all ${current === 0 ? "invisible" : ""}`}
          >
            ← Back
          </button>
          <button
            onClick={next}
            className={`px-8 py-3 rounded-xl text-sm font-medium transition-all ${
              canProceed()
                ? "bg-[#2D6A4F] text-white hover:bg-[#235c43]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {current === steps.length - 1 ? "Generate my plan →" : "Continue →"}
          </button>
        </div>

      </div>
    </main>
  );
}