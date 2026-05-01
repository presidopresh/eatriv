"use client";
import { useState, useEffect } from "react";

export default function MealPlan() {
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    generateMealPlan();
  }, []);

  async function generateMealPlan() {
    setLoading(true);
    try {
      const savedAnswers = localStorage.getItem("eatriv_answers") || "{}";
      const answers = JSON.parse(savedAnswers);

      const res = await fetch("/api/mealplan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: answers.goal || "Eat healthier",
          body: answers.body || { age: 25, sex: "Male", weight: 70, height: 170 },
          activity: answers.activity || "Moderately active",
          diet: answers.diet || "No preference",
          allergies: answers.allergies || [],
          meals: answers.meals || "3 meals"
        })
      });

      const data = await res.json();
      console.log("Page received:", JSON.stringify(data).substring(0, 200));
      
      if (data.mealPlan) {
        setMealPlan(data.mealPlan);
      } else {
        // Use hardcoded fallback
        setMealPlan(getStaticPlan());
      }
    } catch (e) {
      console.log("Error, using static plan");
      setMealPlan(getStaticPlan());
    }
    setLoading(false);
  }

  function getStaticPlan() {
    return {
      days: [
        { day: "Monday", meals: [
          { type: "Breakfast", name: "Greek Yogurt Parfait", description: "Greek yogurt with berries and granola", calories: 380, protein: 18, carbs: 45, fat: 8 },
          { type: "Lunch", name: "Grilled Chicken Salad", description: "Fresh greens with grilled chicken and olive oil", calories: 450, protein: 35, carbs: 20, fat: 15 },
          { type: "Dinner", name: "Baked Salmon", description: "Herb baked salmon with broccoli and brown rice", calories: 550, protein: 40, carbs: 45, fat: 18 }
        ]},
        { day: "Tuesday", meals: [
          { type: "Breakfast", name: "Oatmeal & Banana", description: "Rolled oats with banana and chia seeds", calories: 360, protein: 12, carbs: 62, fat: 6 },
          { type: "Lunch", name: "Turkey Wrap", description: "Whole wheat wrap with turkey and vegetables", calories: 420, protein: 30, carbs: 40, fat: 12 },
          { type: "Dinner", name: "Beef Stir Fry", description: "Lean beef with vegetables and brown rice", calories: 520, protein: 38, carbs: 48, fat: 14 }
        ]},
        { day: "Wednesday", meals: [
          { type: "Breakfast", name: "Scrambled Eggs & Toast", description: "Eggs with whole grain toast and avocado", calories: 400, protein: 20, carbs: 35, fat: 18 },
          { type: "Lunch", name: "Lentil Soup", description: "Hearty lentil soup with vegetables", calories: 380, protein: 22, carbs: 55, fat: 8 },
          { type: "Dinner", name: "Grilled Tilapia", description: "Herb tilapia with sweet potato and spinach", calories: 480, protein: 42, carbs: 40, fat: 12 }
        ]},
        { day: "Thursday", meals: [
          { type: "Breakfast", name: "Smoothie Bowl", description: "Blended berries topped with granola", calories: 350, protein: 14, carbs: 58, fat: 8 },
          { type: "Lunch", name: "Tuna Sandwich", description: "Tuna on whole wheat with lettuce", calories: 410, protein: 32, carbs: 38, fat: 14 },
          { type: "Dinner", name: "Chicken Stir Fry", description: "Chicken with peppers and brown rice", calories: 500, protein: 38, carbs: 50, fat: 12 }
        ]},
        { day: "Friday", meals: [
          { type: "Breakfast", name: "Avocado Toast", description: "Whole grain toast with avocado and eggs", calories: 420, protein: 18, carbs: 38, fat: 22 },
          { type: "Lunch", name: "Chickpea Salad", description: "Mixed greens with chickpeas and lemon", calories: 380, protein: 16, carbs: 48, fat: 12 },
          { type: "Dinner", name: "Chicken & Quinoa", description: "Grilled chicken with quinoa and vegetables", calories: 530, protein: 42, carbs: 45, fat: 14 }
        ]},
        { day: "Saturday", meals: [
          { type: "Breakfast", name: "Whole Wheat Pancakes", description: "Pancakes with fresh fruit and honey", calories: 400, protein: 14, carbs: 68, fat: 10 },
          { type: "Lunch", name: "Vegetable Soup", description: "Mixed vegetable soup with crackers", calories: 320, protein: 12, carbs: 52, fat: 8 },
          { type: "Dinner", name: "Baked Cod", description: "Herb cod with potatoes and green beans", calories: 490, protein: 38, carbs: 48, fat: 12 }
        ]},
        { day: "Sunday", meals: [
          { type: "Breakfast", name: "Full Breakfast", description: "Eggs, turkey bacon and whole grain toast", calories: 450, protein: 28, carbs: 35, fat: 20 },
          { type: "Lunch", name: "Caesar Salad", description: "Romaine with chicken and light dressing", calories: 400, protein: 35, carbs: 18, fat: 16 },
          { type: "Dinner", name: "Slow Cooked Chicken", description: "Tender chicken with vegetables and potato", calories: 560, protein: 42, carbs: 52, fat: 14 }
        ]}
      ],
      groceryList: {
        Proteins: ["Chicken breast", "Salmon fillet", "Eggs (12)", "Turkey slices", "Lean beef", "Canned tuna"],
        Vegetables: ["Broccoli", "Mixed greens", "Tomatoes", "Sweet potato", "Spinach", "Bell peppers"],
        Grains: ["Brown rice", "Rolled oats", "Whole grain bread", "Quinoa", "Granola"],
        Extras: ["Olive oil", "Greek yogurt", "Mixed berries", "Avocado", "Chia seeds", "Lemon"]
      }
    };
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FEFDF8] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#B7E4C7] border-t-[#2D6A4F] rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-light text-[#1A1A1A] mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Building your meal plan...
          </h2>
          <p className="text-gray-400 text-sm">Our AI is personalising this just for you</p>
        </div>
      </main>
    );
  }

  if (!mealPlan) {
    return (
      <main className="min-h-screen bg-[#FEFDF8] flex items-center justify-center px-6">
        <div className="text-center">
          <button onClick={generateMealPlan} className="bg-[#2D6A4F] text-white px-8 py-3 rounded-xl">Try again</button>
        </div>
      </main>
    );
  }

  const currentDay = mealPlan?.days?.[activeDay];

  return (
    <main className="min-h-screen bg-[#FEFDF8] px-4 py-6">
      <div className="max-w-2xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-2xl font-light text-[#2D6A4F]" style={{ fontFamily: "Georgia, serif" }}>🌿 Eatriv</div>
            <div className="text-xs text-gray-400">Your AI meal plan</div>
          </div>
          <button onClick={generateMealPlan} className="text-sm text-[#2D6A4F] border border-[#2D6A4F] px-4 py-2 rounded-xl hover:bg-[#F0FFF4] transition-all">
            Regenerate
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {mealPlan?.days?.map((day: any, i: number) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeDay === i ? "bg-[#2D6A4F] text-white" : "bg-white border border-gray-200 text-gray-500 hover:border-[#2D6A4F]"
              }`}
            >
              {day.day?.slice(0, 3)}
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-6">
          {currentDay?.meals?.map((meal: any, i: number) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0FFF4] flex items-center justify-center text-xl flex-shrink-0">
                  {meal.type === "Breakfast" ? "🌅" : meal.type === "Lunch" ? "🥗" : "🍲"}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{meal.type}</div>
                  <div className="font-medium text-[#1A1A1A] mb-1" style={{ fontFamily: "Georgia, serif" }}>{meal.name}</div>
                  <div className="text-sm text-gray-400 mb-3">{meal.description}</div>
                  <div className="flex gap-3 flex-wrap">
                    <span className="text-xs bg-[#F0FFF4] text-[#2D6A4F] px-2 py-1 rounded-lg font-medium">{meal.calories} kcal</span>
                    <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-lg">P {meal.protein}g</span>
                    <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-lg">C {meal.carbs}g</span>
                    <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-lg">F {meal.fat}g</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-[#1A1A1A]" style={{ fontFamily: "Georgia, serif" }}>Weekly grocery list</h3>
            <button
              onClick={() => {
                const items = Object.entries(mealPlan.groceryList || {})
                  .map(([cat, items]: any) => `${cat}:\n${items.map((i: string) => `- ${i}`).join("\n")}`)
                  .join("\n\n");
                navigator.clipboard.writeText(items);
              }}
              className="text-xs text-[#2D6A4F] bg-[#F0FFF4] px-3 py-1 rounded-full"
            >
              Copy list
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(mealPlan?.groceryList || {}).map(([category, items]: any) => (
              <div key={category}>
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">{category}</div>
                {items.map((item: string, i: number) => (
                  <div key={i} className="text-sm text-gray-600 py-1 border-b border-gray-50 last:border-0">{item}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}