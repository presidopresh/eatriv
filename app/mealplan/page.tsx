"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const MEAL_PLANS = [
  {
    theme: "Balanced & Healthy",
    days: [
      { day: "Monday", meals: [
        { type: "Breakfast", name: "Greek Yogurt Parfait", description: "Greek yogurt layered with mixed berries, granola and chia seeds", calories: 380, protein: 18, carbs: 45, fat: 8 },
        { type: "Lunch", name: "Grilled Chicken Salad", description: "Fresh greens with grilled chicken breast, cucumber and olive oil dressing", calories: 450, protein: 35, carbs: 20, fat: 15 },
        { type: "Dinner", name: "Baked Salmon & Veggies", description: "Herb baked salmon with steamed broccoli and brown rice", calories: 550, protein: 40, carbs: 45, fat: 18 }
      ]},
      { day: "Tuesday", meals: [
        { type: "Breakfast", name: "Oatmeal & Banana", description: "Rolled oats with sliced banana, honey and chia seeds", calories: 360, protein: 12, carbs: 62, fat: 6 },
        { type: "Lunch", name: "Turkey Wrap", description: "Whole wheat wrap with turkey, lettuce, tomato and mustard", calories: 420, protein: 30, carbs: 40, fat: 12 },
        { type: "Dinner", name: "Beef Stir Fry", description: "Lean beef strips with mixed vegetables and brown rice", calories: 520, protein: 38, carbs: 48, fat: 14 }
      ]},
      { day: "Wednesday", meals: [
        { type: "Breakfast", name: "Scrambled Eggs & Toast", description: "2 scrambled eggs with whole grain toast and sliced avocado", calories: 400, protein: 20, carbs: 35, fat: 18 },
        { type: "Lunch", name: "Lentil Soup & Bread", description: "Hearty red lentil soup with vegetables and crusty bread", calories: 380, protein: 22, carbs: 55, fat: 8 },
        { type: "Dinner", name: "Grilled Tilapia", description: "Herb grilled tilapia with sweet potato mash and spinach", calories: 480, protein: 42, carbs: 40, fat: 12 }
      ]},
      { day: "Thursday", meals: [
        { type: "Breakfast", name: "Smoothie Bowl", description: "Blended banana and berries topped with granola and coconut flakes", calories: 350, protein: 14, carbs: 58, fat: 8 },
        { type: "Lunch", name: "Tuna Salad Sandwich", description: "Tuna with light mayo on whole wheat bread with lettuce", calories: 410, protein: 32, carbs: 38, fat: 14 },
        { type: "Dinner", name: "Chicken Stir Fry", description: "Chicken breast with bell peppers, onions, garlic and brown rice", calories: 500, protein: 38, carbs: 50, fat: 12 }
      ]},
      { day: "Friday", meals: [
        { type: "Breakfast", name: "Avocado Toast & Eggs", description: "Whole grain toast with smashed avocado and 2 poached eggs", calories: 420, protein: 18, carbs: 38, fat: 22 },
        { type: "Lunch", name: "Chickpea Salad Bowl", description: "Mixed greens with chickpeas, cucumber, tomato and lemon dressing", calories: 380, protein: 16, carbs: 48, fat: 12 },
        { type: "Dinner", name: "Grilled Chicken & Quinoa", description: "Spiced grilled chicken with fluffy quinoa and roasted vegetables", calories: 530, protein: 42, carbs: 45, fat: 14 }
      ]},
      { day: "Saturday", meals: [
        { type: "Breakfast", name: "Whole Wheat Pancakes", description: "Fluffy pancakes with fresh berries, banana and light maple syrup", calories: 400, protein: 14, carbs: 68, fat: 10 },
        { type: "Lunch", name: "Vegetable Minestrone", description: "Hearty Italian vegetable soup with pasta and parmesan", calories: 320, protein: 12, carbs: 52, fat: 8 },
        { type: "Dinner", name: "Baked Cod & Potatoes", description: "Herb crusted cod with roasted potatoes and steamed green beans", calories: 490, protein: 38, carbs: 48, fat: 12 }
      ]},
      { day: "Sunday", meals: [
        { type: "Breakfast", name: "Full Protein Breakfast", description: "2 fried eggs, turkey bacon, whole grain toast and grilled tomato", calories: 450, protein: 28, carbs: 35, fat: 20 },
        { type: "Lunch", name: "Caesar Salad & Chicken", description: "Romaine lettuce with grilled chicken, croutons and light caesar dressing", calories: 400, protein: 35, carbs: 18, fat: 16 },
        { type: "Dinner", name: "Slow Cooked Chicken", description: "Tender slow cooked chicken thighs with vegetables and mashed potato", calories: 560, protein: 42, carbs: 52, fat: 14 }
      ]}
    ],
    groceryList: {
      Proteins: ["Chicken breast (1kg)", "Salmon fillet (500g)", "Eggs (12)", "Turkey slices (200g)", "Lean beef (500g)", "Canned tuna (2 cans)", "Tilapia fillet (400g)", "Cod fillet (400g)"],
      Vegetables: ["Broccoli (1 head)", "Mixed salad greens (1 bag)", "Tomatoes (6)", "Sweet potato (3)", "Spinach (1 bag)", "Bell peppers (3)", "Cucumber (2)", "Green beans (200g)"],
      Grains: ["Brown rice (1kg)", "Rolled oats (500g)", "Whole grain bread (1 loaf)", "Whole wheat wraps (6)", "Quinoa (300g)", "Granola (300g)"],
      Extras: ["Olive oil", "Greek yogurt (500g)", "Mixed berries (300g)", "Avocado (3)", "Chia seeds", "Lemon (4)", "Garlic (1 bulb)", "Honey"]
    }
  },
  {
    theme: "High Protein Plan",
    days: [
      { day: "Monday", meals: [
        { type: "Breakfast", name: "Protein Omelette", description: "3-egg omelette with spinach, mushrooms and low-fat cheese", calories: 420, protein: 32, carbs: 8, fat: 24 },
        { type: "Lunch", name: "Chicken & Rice Bowl", description: "Grilled chicken breast with white rice, broccoli and soy sauce", calories: 520, protein: 45, carbs: 50, fat: 10 },
        { type: "Dinner", name: "Beef & Sweet Potato", description: "Lean ground beef with roasted sweet potato and mixed greens", calories: 580, protein: 42, carbs: 48, fat: 16 }
      ]},
      { day: "Tuesday", meals: [
        { type: "Breakfast", name: "Protein Smoothie", description: "Banana, milk, peanut butter, oats and protein powder blended smooth", calories: 440, protein: 35, carbs: 50, fat: 12 },
        { type: "Lunch", name: "Tuna Pasta Salad", description: "Whole wheat pasta with tuna, olives, tomatoes and light mayo", calories: 480, protein: 38, carbs: 52, fat: 12 },
        { type: "Dinner", name: "Grilled Salmon Steak", description: "Atlantic salmon with asparagus, lemon butter and brown rice", calories: 580, protein: 46, carbs: 42, fat: 20 }
      ]},
      { day: "Wednesday", meals: [
        { type: "Breakfast", name: "Egg & Turkey Wrap", description: "Scrambled eggs with turkey strips in a whole wheat wrap", calories: 430, protein: 34, carbs: 36, fat: 14 },
        { type: "Lunch", name: "Greek Salad & Chicken", description: "Chicken breast over greek salad with feta and olives", calories: 460, protein: 40, carbs: 18, fat: 22 },
        { type: "Dinner", name: "Pork Tenderloin", description: "Lean pork tenderloin with roasted vegetables and quinoa", calories: 540, protein: 44, carbs: 42, fat: 16 }
      ]},
      { day: "Thursday", meals: [
        { type: "Breakfast", name: "Cottage Cheese Bowl", description: "Low-fat cottage cheese with pineapple, flaxseeds and almonds", calories: 380, protein: 30, carbs: 32, fat: 12 },
        { type: "Lunch", name: "Turkey Meatball Bowl", description: "Turkey meatballs with zucchini noodles and marinara sauce", calories: 460, protein: 40, carbs: 28, fat: 16 },
        { type: "Dinner", name: "Baked Chicken Thighs", description: "Herb baked chicken thighs with roasted potatoes and salad", calories: 560, protein: 46, carbs: 40, fat: 18 }
      ]},
      { day: "Friday", meals: [
        { type: "Breakfast", name: "Overnight Oats", description: "Oats soaked in milk with banana, chia seeds and almond butter", calories: 420, protein: 18, carbs: 58, fat: 14 },
        { type: "Lunch", name: "Shrimp Stir Fry", description: "Jumbo shrimp with vegetables, garlic, ginger and brown rice", calories: 440, protein: 38, carbs: 44, fat: 10 },
        { type: "Dinner", name: "Lean Beef Burger", description: "Lean beef patty in whole grain bun with salad and sweet potato fries", calories: 580, protein: 42, carbs: 52, fat: 18 }
      ]},
      { day: "Saturday", meals: [
        { type: "Breakfast", name: "Egg White Frittata", description: "Egg whites baked with vegetables, herbs and low-fat cheese", calories: 360, protein: 30, carbs: 12, fat: 16 },
        { type: "Lunch", name: "Chicken Soup", description: "Homemade chicken broth with vegetables, noodles and herbs", calories: 380, protein: 34, carbs: 30, fat: 10 },
        { type: "Dinner", name: "Grilled Sea Bass", description: "Sea bass fillet with lemon, capers, cherry tomatoes and quinoa", calories: 520, protein: 46, carbs: 38, fat: 16 }
      ]},
      { day: "Sunday", meals: [
        { type: "Breakfast", name: "Protein Pancakes", description: "High protein pancakes made with oat flour, eggs and banana", calories: 440, protein: 28, carbs: 52, fat: 12 },
        { type: "Lunch", name: "Beef & Veggie Bowl", description: "Lean beef strips with roasted peppers, onions and brown rice", calories: 520, protein: 42, carbs: 48, fat: 14 },
        { type: "Dinner", name: "Roast Chicken", description: "Whole roast chicken with roasted vegetables and gravy", calories: 580, protein: 48, carbs: 38, fat: 20 }
      ]}
    ],
    groceryList: {
      Proteins: ["Chicken breast (1.5kg)", "Salmon steak (600g)", "Lean beef mince (500g)", "Turkey mince (500g)", "Eggs (18)", "Shrimp (400g)", "Sea bass fillet (400g)", "Canned tuna (3 cans)"],
      Vegetables: ["Spinach (2 bags)", "Broccoli (2 heads)", "Asparagus (1 bunch)", "Zucchini (3)", "Bell peppers (4)", "Cherry tomatoes (300g)", "Mushrooms (300g)", "Mixed salad (2 bags)"],
      Grains: ["Brown rice (1kg)", "Quinoa (500g)", "Whole grain bread (1 loaf)", "Rolled oats (500g)", "Whole wheat pasta (500g)", "Whole grain buns (4)"],
      Extras: ["Olive oil", "Low-fat cheese (200g)", "Cottage cheese (500g)", "Almond butter", "Chia seeds", "Flaxseeds", "Lemon (6)", "Garlic (2 bulbs)"]
    }
  },
  {
    theme: "Weight Loss Plan",
    days: [
      { day: "Monday", meals: [
        { type: "Breakfast", name: "Green Smoothie", description: "Spinach, cucumber, green apple, ginger and lemon blended fresh", calories: 220, protein: 8, carbs: 42, fat: 4 },
        { type: "Lunch", name: "Large Garden Salad", description: "Mixed greens, grilled chicken, tomatoes, cucumber with light vinaigrette", calories: 320, protein: 30, carbs: 18, fat: 12 },
        { type: "Dinner", name: "Grilled Fish & Veggies", description: "Grilled white fish with steamed broccoli, carrots and green beans", calories: 380, protein: 38, carbs: 22, fat: 10 }
      ]},
      { day: "Tuesday", meals: [
        { type: "Breakfast", name: "Boiled Eggs & Fruit", description: "2 boiled eggs with a bowl of fresh mixed fruit and green tea", calories: 280, protein: 14, carbs: 35, fat: 10 },
        { type: "Lunch", name: "Veggie Soup & Salad", description: "Light vegetable soup with a side salad and rice cakes", calories: 280, protein: 12, carbs: 42, fat: 6 },
        { type: "Dinner", name: "Chicken & Greens", description: "Poached chicken breast with steamed spinach, kale and lemon", calories: 340, protein: 38, carbs: 12, fat: 10 }
      ]},
      { day: "Wednesday", meals: [
        { type: "Breakfast", name: "Overnight Oats", description: "Small portion oats with berries, low-fat milk and no sugar", calories: 300, protein: 12, carbs: 48, fat: 6 },
        { type: "Lunch", name: "Tuna & Salad", description: "Canned tuna over mixed greens with lemon and olive oil", calories: 280, protein: 32, carbs: 8, fat: 12 },
        { type: "Dinner", name: "Baked Tilapia", description: "Herb baked tilapia with cauliflower rice and steamed vegetables", calories: 320, protein: 36, carbs: 18, fat: 8 }
      ]},
      { day: "Thursday", meals: [
        { type: "Breakfast", name: "Greek Yogurt & Berries", description: "Plain low-fat greek yogurt with fresh berries and a teaspoon of honey", calories: 240, protein: 16, carbs: 32, fat: 4 },
        { type: "Lunch", name: "Lentil Salad", description: "Cooked lentils with tomatoes, onion, parsley and lemon dressing", calories: 300, protein: 18, carbs: 42, fat: 6 },
        { type: "Dinner", name: "Turkey & Vegetables", description: "Lean turkey mince with stir-fried vegetables and minimal oil", calories: 360, protein: 36, carbs: 20, fat: 10 }
      ]},
      { day: "Friday", meals: [
        { type: "Breakfast", name: "Veggie Omelette", description: "2-egg omelette with spinach, tomatoes and no cheese", calories: 260, protein: 18, carbs: 8, fat: 16 },
        { type: "Lunch", name: "Chicken Lettuce Wraps", description: "Minced chicken in lettuce cups with cucumber and light sauce", calories: 280, protein: 28, carbs: 12, fat: 10 },
        { type: "Dinner", name: "Salmon & Asparagus", description: "Small salmon fillet with steamed asparagus and lemon", calories: 360, protein: 34, carbs: 8, fat: 18 }
      ]},
      { day: "Saturday", meals: [
        { type: "Breakfast", name: "Fruit & Nut Bowl", description: "Mixed fresh fruit with a small handful of almonds and walnuts", calories: 280, protein: 8, carbs: 40, fat: 12 },
        { type: "Lunch", name: "Tomato Soup", description: "Homemade tomato soup with no cream and a small slice of bread", calories: 240, protein: 8, carbs: 38, fat: 6 },
        { type: "Dinner", name: "Grilled Chicken Skewers", description: "Chicken skewers with peppers, onions and tzatziki dip", calories: 340, protein: 36, carbs: 14, fat: 12 }
      ]},
      { day: "Sunday", meals: [
        { type: "Breakfast", name: "Poached Eggs & Spinach", description: "2 poached eggs on wilted spinach with grilled tomatoes", calories: 260, protein: 18, carbs: 10, fat: 14 },
        { type: "Lunch", name: "Prawn Salad", description: "King prawns over rocket, avocado and cherry tomatoes", calories: 300, protein: 28, carbs: 12, fat: 14 },
        { type: "Dinner", name: "Light Fish Curry", description: "White fish in mild tomato curry sauce with cauliflower rice", calories: 340, protein: 34, carbs: 22, fat: 10 }
      ]}
    ],
    groceryList: {
      Proteins: ["Chicken breast (1kg)", "White fish fillets (600g)", "Salmon fillet (400g)", "Canned tuna (3 cans)", "Eggs (12)", "Turkey mince (400g)", "King prawns (300g)", "Tilapia (400g)"],
      Vegetables: ["Spinach (3 bags)", "Broccoli (2 heads)", "Asparagus (2 bunches)", "Cauliflower (1 head)", "Mixed greens (2 bags)", "Cherry tomatoes (400g)", "Cucumber (3)", "Green beans (300g)"],
      Grains: ["Rolled oats (500g)", "Brown rice (500g)", "Rice cakes (1 pack)", "Whole grain bread (1 small loaf)", "Lentils (400g)"],
      Extras: ["Olive oil (small)", "Low-fat greek yogurt (500g)", "Mixed berries (400g)", "Lemons (8)", "Garlic (2 bulbs)", "Ginger root", "Fresh herbs", "Almonds (small bag)"]
    }
  }
];

export default function MealPlan() {
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(0);
  const [planIndex, setPlanIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = "/signup";
        return;
      }
      loadPlan(0);
    }
    checkAuth();
  }, []);

  function loadPlan(index: number) {
    setLoading(true);
    setActiveDay(0);
    setTimeout(() => {
      setMealPlan(MEAL_PLANS[index]);
      setLoading(false);
    }, 1500);
  }

  function regenerate() {
    const next = (planIndex + 1) % MEAL_PLANS.length;
    setPlanIndex(next);
    loadPlan(next);
  }

  function copyGrocery() {
    if (!mealPlan) return;
    const text = Object.entries(mealPlan.groceryList)
      .map(([cat, items]: any) => `${cat}:\n${items.map((i: string) => `- ${i}`).join("\n")}`)
      .join("\n\n");
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      // Fallback for browsers that don't support clipboard API
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FEFDF8] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#B7E4C7] border-t-[#2D6A4F] rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-light text-[#1A1A1A] mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Building your meal plan...
          </h2>
          <p className="text-gray-400 text-sm">Personalising this just for you</p>
        </div>
      </main>
    );
  }

  const currentDay = mealPlan?.days?.[activeDay];

  return (
    <main className="min-h-screen bg-[#FEFDF8] px-4 py-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-2xl font-light text-[#2D6A4F]" style={{ fontFamily: "Georgia, serif" }}>🌿 Eatriv</div>
            <div className="text-xs text-gray-400">Your AI meal plan</div>
          </div>
         <div className="flex gap-2">
  <a href="/pricing">
    <button className="text-sm bg-[#2D6A4F] text-white px-4 py-2 rounded-xl hover:bg-[#235c43] transition-all">
      ⭐ Upgrade
    </button>
  </a>
  <button
    onClick={regenerate}
    className="text-sm text-[#2D6A4F] border border-[#2D6A4F] px-4 py-2 rounded-xl hover:bg-[#F0FFF4] transition-all"
  >
    🔄 Regenerate
  </button>
</div>

        {/* Plan theme badge */}
        <div className="mb-4">
          <span className="text-xs font-medium bg-[#F0FFF4] text-[#2D6A4F] px-3 py-1 rounded-full">
            {mealPlan?.theme}
          </span>
        </div>

        {/* Day tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {mealPlan?.days?.map((day: any, i: number) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeDay === i
                  ? "bg-[#2D6A4F] text-white"
                  : "bg-white border border-gray-200 text-gray-500 hover:border-[#2D6A4F]"
              }`}
            >
              {day.day?.slice(0, 3)}
            </button>
          ))}
        </div>

        {/* Meals */}
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
                  <div className="flex gap-2 flex-wrap">
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

        {/* Grocery List */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-[#1A1A1A]" style={{ fontFamily: "Georgia, serif" }}>
              🛒 Weekly grocery list
            </h3>
            <button
              onClick={copyGrocery}
              className={`text-xs font-medium px-3 py-1 rounded-full transition-all ${
                copied
                  ? "bg-[#2D6A4F] text-white"
                  : "text-[#2D6A4F] bg-[#F0FFF4] hover:bg-[#2D6A4F] hover:text-white"
              }`}
            >
              {copied ? "✓ Copied!" : "Copy list"}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(mealPlan?.groceryList || {}).map(([category, items]: any) => (
              <div key={category}>
                <div className="text-xs font-medium text-[#2D6A4F] uppercase tracking-wide mb-2">
                  {category}
                </div>
                {items.map((item: string, i: number) => (
                  <div key={i} className="text-sm text-gray-600 py-1 border-b border-gray-50 last:border-0 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#2D6A4F] flex-shrink-0"></span>
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Sign out button */}
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = "/";
          }}
          className="w-full py-3 text-sm text-gray-400 hover:text-gray-600 transition-all"
        >
          Sign out
        </button>

      </div>
    </main>
  );
}