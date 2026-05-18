"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }: any) => {
      if (data.session) setUser(data.session.user);
    });
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const linkStyle = { padding: "6px 7px", borderRadius: 8, fontSize: 12, color: "#6B7280", textDecoration: "none", whiteSpace: "nowrap" as const };
  const menuItemStyle = { display: "block", padding: "10px 12px", borderRadius: 10, fontSize: 14, color: "#374151", textDecoration: "none", marginBottom: 2 };

  return (
    <nav style={{ background: "white", borderBottom: "1px solid #E5E7EB", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 672, margin: "0 auto", padding: "0 16px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        <a href={user ? "/mealplan" : "/"} style={{ fontFamily: "Georgia, serif", fontSize: 20, color: "#2D6A4F", textDecoration: "none", fontWeight: 400, flexShrink: 0 }}>
          🌿 Eatriv
        </a>

        {user && (
          <div style={{ display: "flex", gap: 2, alignItems: "center", overflow: "hidden" }}>
            <a href="/mealplan" style={linkStyle}>🍽️ Meals</a>
            <a href="/reminders" style={linkStyle}>🔔 Reminders</a>
            <a href="/progress" style={linkStyle}>📈 Progress</a>
            <a href="/workout" style={linkStyle}>💪 Workout</a>
            <a href="/pricing" style={{ ...linkStyle, color: "#2D6A4F", fontWeight: 500 }}>⭐ Pro</a>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {user ? (
            <button
              onClick={() => setOpen(!open)}
              style={{ background: "none", border: "1px solid #E5E7EB", cursor: "pointer", fontSize: 16, color: "#6B7280", padding: "4px 10px", borderRadius: 8 }}
            >
              {open ? "✕" : "☰"}
            </button>
          ) : (
            <a href="/signup">
              <button style={{ background: "#2D6A4F", color: "white", border: "none", padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                Sign in
              </button>
            </a>
          )}
        </div>
      </div>

      {open && user && (
        <div style={{ background: "white", borderTop: "1px solid #F3F4F6", padding: "8px 16px 12px" }}>
          <a href="/mealplan" style={menuItemStyle} onClick={() => setOpen(false)}>🍽️ Meal Plan</a>
          <a href="/reminders" style={menuItemStyle} onClick={() => setOpen(false)}>🔔 Reminders</a>
          <a href="/progress" style={menuItemStyle} onClick={() => setOpen(false)}>📈 Progress</a>
          <a href="/workout" style={menuItemStyle} onClick={() => setOpen(false)}>💪 Workout</a>
          <a href="/pricing" style={menuItemStyle} onClick={() => setOpen(false)}>⭐ Upgrade to Pro</a>
          <a href="/profile" style={menuItemStyle} onClick={() => setOpen(false)}>👤 My Profile</a>
          <button
            onClick={signOut}
            style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: 10, fontSize: 14, color: "#EF4444", background: "none", border: "none", cursor: "pointer", marginTop: 4 }}
          >
            🚪 Sign out
          </button>
        </div>
      )}
    </nav>
  );
}