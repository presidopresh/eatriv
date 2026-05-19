"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }: any) => {
      if (data.session) setUser(data.session.user);
    });
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const scrollStyle: React.CSSProperties = {
    overflowX: "auto",
    WebkitOverflowScrolling: "touch" as any,
    borderTop: "1px solid #F3F4F6",
    background: "white",
  };

  const linkStyle: React.CSSProperties = {
    display: "block",
    padding: "10px 12px",
    fontSize: 13,
    color: "#6B7280",
    textDecoration: "none",
    whiteSpace: "nowrap",
    borderBottom: "2px solid transparent",
  };

  const activeStyle: React.CSSProperties = {
    ...linkStyle,
    color: "#2D6A4F",
    fontWeight: 500,
    borderBottom: "2px solid #2D6A4F",
  };

  return (
    <nav style={{ background: "white", borderBottom: "1px solid #E5E7EB", position: "sticky", top: 0, zIndex: 50 }}>

      {/* Top bar */}
      <div style={{ maxWidth: 672, margin: "0 auto", padding: "0 16px", height: 50, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href={user ? "/mealplan" : "/"} style={{ fontFamily: "Georgia, serif", fontSize: 20, color: "#2D6A4F", textDecoration: "none", fontWeight: 400 }}>
          🌿 Eatriv
        </a>
        {!user && (
          <a href="/signup">
            <button style={{ background: "#2D6A4F", color: "white", border: "none", padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
              Sign in
            </button>
          </a>
        )}
      </div>

      {/* Scrollable nav links */}
      {user && (
        <div style={scrollStyle}>
          <div style={{ display: "flex", padding: "0 8px", width: "max-content", minWidth: "100%" }}>
            <a href="/mealplan" style={linkStyle}>🍽️ Meals</a>
            <a href="/reminders" style={linkStyle}>🔔 Reminders</a>
            <a href="/progress" style={linkStyle}>📈 Progress</a>
            <a href="/workout" style={linkStyle}>💪 Workout</a>
            <a href="/pricing" style={{ ...linkStyle, color: "#2D6A4F", fontWeight: 500 }}>⭐ Upgrade</a>
            <a href="/profile" style={linkStyle}>👤 Profile</a>
            <button
              onClick={signOut}
              style={{ padding: "10px 12px", fontSize: 13, color: "#EF4444", background: "none", border: "none", borderBottom: "2px solid transparent", cursor: "pointer", whiteSpace: "nowrap" }}
            >
              🚪 Sign out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}