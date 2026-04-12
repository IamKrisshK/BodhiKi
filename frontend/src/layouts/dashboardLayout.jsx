import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { theme } from "../styles/theme";

export default function DashboardLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div style={styles.container}>
      
      {/* Sidebar */}
      <aside
        style={{
          ...styles.sidebar,
          width: collapsed ? "70px" : "240px",
        }}
      >
        <div style={styles.top}>
          {!collapsed && <h2 style={styles.title}>Bodhiki</h2>}

          <button
            style={styles.toggle}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "➡️" : "⬅️"}
          </button>
        </div>

        <nav style={styles.nav}>
          <Link style={linkStyle(isActive("/dashboard"), collapsed)} to="/dashboard">
            🏠 {!collapsed && "Home"}
          </Link>

          <Link style={linkStyle(isActive("/zengarden"), collapsed)} to="/zengarden">
            🌿 {!collapsed && "Zen Garden"}
          </Link>

          <Link style={linkStyle(isActive("/study"), collapsed)} to="/study">
            📚 {!collapsed && "Study"}
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const linkStyle = (active, collapsed) => ({
  padding: theme.spacing.sm,
  borderRadius: theme.radius.sm,
  textDecoration: "none",
  color: active ? theme.colors.text : theme.colors.textMuted,
  background: active ? theme.colors.surfaceLight : "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: collapsed ? "center" : "flex-start",
  gap: theme.spacing.sm,
  transition: "0.2s",
});

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: theme.colors.background,
  },

  sidebar: {
    background: theme.colors.surface,
    color: theme.colors.text,
    padding: theme.spacing.md,
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.md,
    transition: "width 0.3s ease",
    borderRight: `1px solid ${theme.colors.border}`,
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontFamily: theme.font.typewriter,
    fontSize: "20px",
  },

  toggle: {
    background: "transparent",
    border: `1px solid ${theme.colors.border}`,
    color: theme.colors.text,
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: theme.radius.sm,
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.sm,
  },

  main: {
    flex: 1,
    padding: theme.spacing.lg,
    background: theme.colors.background,
    color: theme.colors.text,
  },
};