import { Link } from "react-router-dom";
import { theme } from "../styles/theme";

export default function Landing() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bodhiki</h1>

      <p style={styles.subtitle}>
        Focus better. Relax deeper. Study smarter.
      </p>

      <div style={styles.actions}>
        <Link to="/register" style={styles.primary}>
          Get Started
        </Link>

        <Link to="/login" style={styles.secondary}>
          Login
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "calc(100vh - 64px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.lg,

    background: "linear-gradient(180deg, #1B211A 0%, #222A21 100%)",
  },

  title: {
    fontSize: "56px",
    fontWeight: "600",
    fontFamily: theme.font.typewriter,
    color: theme.colors.text,

    letterSpacing: "2px",
    textShadow: "0 2px 10px rgba(0,0,0,0.6)",
  },

  subtitle: {
    color: theme.colors.textMuted,
    fontSize: "16px",
    maxWidth: "400px",
    textAlign: "center",
  },

  actions: {
    display: "flex",
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },

  primary: {
    padding: "12px 22px",
    background: theme.colors.primary,
    color: theme.colors.text,
    borderRadius: theme.radius.md,
    textDecoration: "none",
    fontWeight: "500",

    boxShadow: theme.shadow.card,
    transition: "0.2s",
  },

  secondary: {
    padding: "12px 22px",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    textDecoration: "none",
    color: theme.colors.text,
    background: theme.colors.surface,
    transition: "0.2s",
  },
};