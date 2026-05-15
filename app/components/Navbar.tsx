"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUser(session.user);
    });
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <nav style={{ background: "white", borderBottom: "1px solid #E5E7EB", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 672, margin: "0 auto", padding: "0 16px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        <a href={user ? "/mealplan" : "/"} style={{ fontFamily: "Georgia, serif", fontSize: 20, color: "#2D6A4F", textDecoration: "none", fontWeight: 400 }}>
          🌿 Eatriv
        </a>

        {user && (
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <a href="/mealplan" style={{ padding: "6px 10px", borderRadius: 8, fontSize: 13, color: "#6B7280", textDecoration: "none" }}>🍽️ Meals</a>
            <a href="/reminders" style={{ padding: "6px 10px", borderRadius: 8, fontSize: 13, color: "#6B7280", textDecoration: "none" }}>🔔 Reminders</a>
            <a href="/progress" style={{ padding: "6px 10px", borderRadius: 8, fontSize: 13, color: "#6B7280", textDecoration: "none" }}>📈 Progress</a>
            <a href="/workout" style={{ padding: "6px 10px", borderRadius: 8, fontSize: 13, color: "#6B7280", textDecoration: "none" }}>💪 Workout</a>
            <a href="/pricing" style={{ padding: "6px 10px", borderRadius: 8, fontSize: 13, color: "#2D6A4F", textDecoration: "none", fontWeight: 500 }}>⭐ Upgrade</a>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {user ? (
            <>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#F0FFF4", border: "1px solid #B7E4C7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 500, color: "#2D6A4F" }}>
                {user.email?.[0]?.toUpperCase()}
              </div>
              <button onClick={signOut} style={{ fontSize: 13, color: "#9CA3AF", background: "none", border: "none", cursor: "pointer" }}>
                Sign out
              </button>
            </>
          ) : (
            <a href="/signup">
              <button style={{ background: "#2D6A4F", color: "white", border: "none", padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                Sign in
              </button>
            </a>
          )}
        </div>

      </div>
    </nav>
  );
}