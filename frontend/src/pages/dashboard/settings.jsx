import { useState } from "react";
import { useAuth } from "../../features/services/authContext";
import { theme } from "../../styles/theme";

export default function Settings() {
  const { user, logout, updateUser } = useAuth();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const handleSave = () => {
    updateUser({ ...user, ...form });
    setEditing(false);
  };

  return (
    <div style={theme.SettingCard}>
      <h2 style={theme.heading}>Profile</h2>

      <div style={theme.SettingCard}>
        <div style={theme.sectionHeader}>
          <h3 style={theme.sectionTitle}>Account</h3>
          <button
            style={theme.smallBtn}
            onClick={() => setEditing(!editing)}
          >
            {editing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Username */}
        <div style={theme.row}>
          <span style={theme.label}>Username</span>
          {editing ? (
            <input
              style={theme.input}
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
          ) : (
            <span style={theme.value}>{user?.username}</span>
          )}
        </div>

        {/* Email */}
        <div style={theme.row}>
          <span style={theme.label}>Email</span>
          {editing ? (
            <input
              style={theme.input}
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          ) : (
            <span style={theme.value}>{user?.email}</span>
          )}
        </div>

        {editing && (
          <button style={theme.saveBtn} onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>

      {/* Danger Zone */}
      <div style={theme.SettingCard}>
        <h3 style={{ color: "#e57373" }}>Danger Zone</h3>
        <button style={theme.logout} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}