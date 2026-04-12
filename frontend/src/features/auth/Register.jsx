import { useState } from "react";
import { registerUser } from "./authAPI";
import { useNavigate, Link } from "react-router-dom";
import { theme } from "../../styles/theme";
export default function Register() {
  const [form, setForm] = useState({
    name:"",
    username:"",
    phone:"",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2 style={styles.title}>Create Account</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Phone"
          type="number"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button style={styles.button} type="submit">
          Register
        </button>
      </form>

      <p style={styles.text}>
        Already have an account? <Link to="/login" style={theme.linkStyles}>Login</Link>
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
    color: theme.colors.textLight,
  },

};