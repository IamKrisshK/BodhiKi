import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h2>Settings</h2>

      <div style={styles.card}>
        <h3>Account</h3>
        <p>Username: {user?.username}</p>
        <p>Email: {user?.email}</p>
      </div>

      <button style={styles.logout} onClick={logout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  card: { marginBottom: "20px" },
  logout: {
    background: "#b23",
    color: "#fff",
    padding: "10px",
    border: "none",
    cursor: "pointer",
  },
};