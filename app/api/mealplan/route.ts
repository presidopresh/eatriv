import { NextRequest, NextResponse } from "next/server";

const FALLBACK_PLAN = {
  days: [
    {
      day: "Monday",
      meals: [
        { type: "Breakfast", name: "Greek Yogurt Parfait", description: "Greek yogurt with mixed berries, granola and chia seeds", calories: 380, protein: 18, carbs: 45, fat: 8 },
        { type: "Lunch", name: "Grilled Chicken Salad", description: "Fresh greens with grilled chicken breast and olive oil dressing", calories: 450, protein: 35, carbs: 20, fat: 15 },
        { type: "Dinner", name: "Baked Salmon & Veggies", description: "Herb baked salmon with steamed broccoli and brown rice", calories: 550, protein: 40, carbs: 45, fat: 18 }
      ]
    },
    {
      day: "Tuesday",
      meals: [
        { type: "Breakfast", name: "Oatmeal with Banana", description: "Rolled oats with sliced banana, honey and chia seeds", calories: 360, protein: 12, carbs: 62, fat: 6 },
        { type: "Lunch", name: "Turkey Wrap", description: "Whole wheat wrap with turkey, lettuce, tomato and mustard", calories: 420, protein: 30, carbs: 40, fat: 12 },
        { type: "Dinner", name: "Beef Stir Fry", description: "Lean beef with mixed vegetables and brown rice", calories: 520, protein: 38, carbs: 48, fat: 14 }
      ]
    },
    {
      day: "Wednesday",
      meals: [
        { type: "Breakfast", name: "Scrambled Eggs & Toast", description: "2 scrambled eggs with whole grain toast and avocado", calories: 400, protein: 20, carbs: 35, fat: 18 },
        { type: "Lunch", name: "Lentil Soup & Bread", description: "Hearty lentil soup with vegetables and crusty bread", calories: 380, protein: 22, carbs: 55, fat: 8 },
        { type: "Dinner", name: "Grilled Tilapia", description: "Herb grilled tilapia with sweet potato and spinach", calories: 480, protein: 42, carbs: 40, fat: 12 }
      ]
    },
    {
      day: "Thursday",
      meals: [
        { type: "Breakfast", name: "Smoothie Bowl", description: "Blended banana and berries topped with granola and nuts", calories: 350, protein: 14, carbs: 58, fat: 8 },
        { type: "Lunch", name: "Tuna Salad Sandwich", description: "Tuna with light mayo on whole wheat with lettuce", calories: 410, protein: 32, carbs: 38, fat: 14 },
        { type: "Dinner", name: "Chicken Stir Fry", description: "Chicken breast with bell peppers, onions and brown rice", calories: 500, protein: 38, carbs: 50, fat: 12 }
      ]
    },
    {
      day: "Friday",
      meals: [
        { type: "Breakfast", name: "Avocado Toast & Eggs", description: "Whole grain toast with smashed avocado and poached eggs", calories: 420, protein: 18, carbs: 38, fat: 22 },
        { type: "Lunch", name: "Chickpea Salad", description: "Mixed greens with chickpeas, cucumber and lemon dressing", calories: 380, protein: 16, carbs: 48, fat: 12 },
        { type: "Dinner", name: "Grilled Chicken & Quinoa", description: "Spiced grilled chicken with quinoa and roasted vegetables", calories: 530, protein: 42, carbs: 45, fat: 14 }
      ]
    },
    {
      day: "Saturday",
      meals: [
        { type: "Breakfast", name: "Pancakes with Fruit", description: "Whole wheat pancakes with fresh fruit and light syrup", calories: 400, protein: 14, carbs: 68, fat: 10 },
        { type: "Lunch", name: "Vegetable Soup", description: "Hearty mixed vegetable soup with whole grain crackers", calories: 320, protein: 12, carbs: 52, fat: 8 },
        { type: "Dinner", name: "Baked Cod & Potatoes", description: "Herb baked cod with roasted potatoes and green beans", calories: 490, protein: 38, carbs: 48, fat: 12 }
      ]
    },
    {
      day: "Sunday",
      meals: [
        { type: "Breakfast", name: "Full English Breakfast", description: "Eggs, turkey bacon, whole grain toast and grilled tomato", calories: 450, protein: 28, carbs: 35, fat: 20 },
        { type: "Lunch", name: "Caesar Salad & Chicken", description: "Romaine lettuce with grilled chicken and light caesar dressing", calories: 400, protein: 35, carbs: 18, fat: 16 },
        { type: "Dinner", name: "Slow Cooked Chicken", description: "Tender slow cooked chicken with vegetables and mashed potato", calories: 560, protein: 42, carbs: 52, fat: 14 }
      ]
    }
  ],
  groceryList: {
    Proteins: ["Chicken breast", "Salmon fillet", "Eggs (12)", "Turkey slices", "Lean beef", "Canned tuna", "Tilapia", "Cod fillet"],
    Vegetables: ["Broccoli", "Mixed greens", "Tomatoes", "Sweet potato", "Spinach", "Bell peppers", "Cucumber", "Green beans"],
    Grains: ["Brown rice", "Rolled oats", "Whole grain bread", "Whole wheat wraps", "Quinoa", "Granola"],
    Extras: ["Olive oil", "Greek yogurt", "Mixed berries", "Avocado", "Chia seeds", "Lemon", "Garlic", "Honey"]
  }
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { goal, body: userBody, activity, diet, allergies, meals } = body;

    const prompt = `Create a 7-day meal plan for: goal=${goal}, activity=${activity}, diet=${diet}, avoid=${allergies?.join(",") || "none"}, meals=${meals}.
    
Return ONLY valid compact JSON (no spaces, no newlines) exactly like this structure:
{"days":[{"day":"Monday","meals":[{"type":"Breakfast","name":"X","description":"Y","calories":400,"protein":20,"carbs":45,"fat":12},{"type":"Lunch","name":"X","description":"Y","calories":500,"protein":30,"carbs":50,"fat":15},{"type":"Dinner","name":"X","description":"Y","calories":550,"protein":35,"carbs":45,"fat":18}]}],"groceryList":{"Proteins":["x"],"Vegetables":["x"],"Grains":["x"],"Extras":["x"]}}

Replace X and Y with real meal names and descriptions. Include all 7 days.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://eatriv.vercel.app",
        "X-Title": "Eatriv"
      },
      body: JSON.stringify({
        model: "openrouter/free",
        max_tokens: 3000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";
    console.log("AI response length:", text.length);
    console.log("AI response start:", text.substring(0, 100));

    if (text) {
      try {
        const startIdx = text.indexOf("{");
        const endIdx = text.lastIndexOf("}");
        if (startIdx !== -1 && endIdx !== -1) {
          const jsonStr = text.substring(startIdx, endIdx + 1);
          const mealPlan = JSON.parse(jsonStr);
          if (mealPlan.days && mealPlan.days.length > 0) {
            return NextResponse.json({ success: true, mealPlan });
          }
        }
      } catch (e) {
        console.log("JSON parse failed, using fallback");
      }
    }

    // Always return fallback if AI fails
    return NextResponse.json({ success: true, mealPlan: FALLBACK_PLAN });

  } catch (error: any) {
    console.error("Error:", error.message);
    // Even on total failure, return fallback
    return NextResponse.json({ success: true, mealPlan: FALLBACK_PLAN });
  }
}