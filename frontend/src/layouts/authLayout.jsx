import { Outlet } from "react-router-dom";
import { theme } from "../styles/theme";

export default function AuthLayout() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Outlet />
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.colors.background,
  },

  card: {
    width: "360px",
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    background: theme.colors.accent,
    boxShadow: theme.shadow.card,
  },
};