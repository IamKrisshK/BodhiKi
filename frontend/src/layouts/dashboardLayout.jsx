import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { theme } from "../styles/theme";

export default function DashboardLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? 70 : 240;

  const isActive = (path) => location.pathname === path;

  return (
    <div style={styles.container}>
      
      {/* SIDEBAR */}
      <aside
        style={{
          ...styles.sidebar,
          width: sidebarWidth,
        }}
      >
        <div style={styles.top}>
          {!collapsed && (
            <h2 style={styles.title}>Bodhiki</h2>
          )}

          <button
            style={styles.toggle}
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? "➡" : "⬅"}
          </button>
        </div>

        <nav style={styles.nav}>
          <Link
            to="/dashboard"
            style={linkStyle(isActive("/dashboard"), collapsed)}
          >
            🏠 {!collapsed && "Home"}
          </Link>

          <Link
            to="/zengarden"
            style={linkStyle(isActive("/zengarden"), collapsed)}
          >
            🌿 {!collapsed && "Zen Garden"}
          </Link>

          <Link
            to="/study"
            style={linkStyle(isActive("/study"), collapsed)}
          >
            📚 {!collapsed && "Study"}
          </Link>

          <Link
            to="/settings"
            style={linkStyle(isActive("/settings"), collapsed)}
          >
            ⚙️ {!collapsed && "Settings"}
          </Link>
        </nav>
      </aside>

      {/* MAIN */}
      <main
        style={{
          ...styles.main,
          marginLeft: sidebarWidth,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
const linkStyle = (active, collapsed) => ({
  padding: "10px 12px",
  borderRadius: "8px",
  textDecoration: "none",
  color: active ? "#EBD5AB" : "#8BAE66",
  background: active ? "rgba(139, 174, 102, 0.15)" : "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: collapsed ? "center" : "flex-start",
  gap: "10px",
  transition: "0.2s ease",
  fontSize: "14px",
});

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#1B211A",
    color: "#EBD5AB",
  },

  sidebar: {
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh",
    background: "#111711",
    borderRight: "1px solid #2d3b2d",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    transition: "width 0.3s ease",
    overflow: "hidden",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "18px",
    color: "#EBD5AB",
  },

  toggle: {
    background: "transparent",
    border: "1px solid #2d3b2d",
    color: "#8BAE66",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "6px",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "10px",
  },

  main: {
    flex: 1,
    padding: "24px",
    transition: "margin-left 0.3s ease",
    overflowY: "auto",
  },
};