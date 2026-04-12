import { Link, useNavigate, useLocation } from "react-router-dom";
import { theme } from "../styles/theme";
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>Bodhiki</Link>

      <div style={styles.links}>
        {!isLoggedIn ? (
          <>
            <Link style={theme.linkStyles} to="/login">Login</Link>
            <Link style={styles.cta} to="/register">Get Started</Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              style={{
                ...theme.linkStyles,
                ...(isActive("/dashboard") && styles.active)
              }}
            >
              Dashboard
            </Link>

            <button onClick={handleLogout} style={styles.cta}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    height: "64px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `0 ${theme.spacing.xl}`,
    background: theme.colors.surface,
    backdropFilter: "blur(10px)",
    borderBottom: `1px solid ${theme.colors.border}`,
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: "20px",
    fontWeight: "600",
    textDecoration: "none",
    color: theme.colors.text,
    fontFamily: theme.font.typewriter
  },

  links: {
    display: "flex",
    gap: theme.spacing.lg,
    alignItems: "center",
  },

  active: {
    color: theme.colors.text,
    fontWeight: "600",
  },

  cta: {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    borderRadius: theme.radius.sm,
    border: "none",
    background: theme.colors.primary,
    color: "#fff",
    cursor: "pointer",
    textDecoration: "none",
    transition: "0.2s",
  },
};