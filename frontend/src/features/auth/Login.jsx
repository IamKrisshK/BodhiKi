import { useState } from "react";
import { loginUser } from "./authAPI";
import { useNavigate, Link } from "react-router-dom";
import { theme } from "../../styles/theme";
export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard"); // ✅ fixed route
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2 style={styles.title}>Welcome Back</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Username/Email"
          onChange={(e) => setForm({ ...form, identifier: e.target.value })}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button style={styles.button} type="submit">
          Login
        </button>
      </form>

      <p style={styles.text}>
        Don’t have an account? <Link to="/register" style={theme.linkStyles}>Register</Link>
      </p>
    </div>
  );
}

const styles = {
  title: {
    marginBottom: theme.spacing.lg,
    color: theme.colors.surface,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.md,
  },

  input: {
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    border: `1px solid ${theme.colors.border}`,
  },

  button: {
    padding: theme.spacing.sm,
    background: theme.colors.primary,
    color: "#fff",
    border: "none",
    borderRadius: theme.radius.sm,
    cursor: "pointer",
  },

  text: {
    marginTop: theme.spacing.md,
    color: theme.colors.surface,
  },

};