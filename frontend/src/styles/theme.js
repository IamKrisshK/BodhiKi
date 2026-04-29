export const theme = {
  colors: {
    primary: "#628141",    
    primaryDark: "#4f6a34ff",
    background: "#1B211A",  
    surface: "#222A21",     
    surfaceLight: "#2d362b",
    border: "#3a4636",
    accent: "#8BAE66",   
    text: "#EBD5AB",     
    textMuted: "#bfae8f",
    highlight: "#EBD5AB",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },

  radius: {
    sm: "6px",
    md: "10px",
    lg: "14px",
  },

  shadow: {
    card: "0 6px 20px rgba(0,0,0,0.4)",
  },
  
  saveBtn:{  
    width: "20%",
    marginTop: '10px',
    background: "linear-gradient(135deg, #5f633fff, rgba(93, 131, 32, 1))",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 500,
    transition: "all 0.2s ease",
    boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
  },
  
  font: {
    family: "'Inter', sans-serif",
    typewriter: "'Special Elite', monospace",
  },
  linkStyles: {
    color: "#e2e19aff", // soft green from your palette
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontWeight: "500",
    hover: {
      color: "#A4C97B",
      textDecoration: "underline",
    },

    subtle: {
      color: "#bfae8f", // muted beige (for low emphasis links)
    },

    accent: {
      color: "#EBD5AB",
    },
  },
  author: {
  fontSize: "13px",
  fontStyle: "italic",
},
PostCard: {
  marginTop:'5px',
  background: "#1f261e",
  border: "1px solid #2e3a2c",
  borderRadius: "12px",
  padding: "16px",
  transition: "0.2s ease",
},
SettingCard: {
  marginTop: '5px',
  background: "#1f261e",
  border: "1px solid #2e3a2c",
  borderRadius: "12px",
  padding: "16px",
  transition: "0.2s ease",
},

header: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
},

title: {
  margin: 0,
  fontSize: "18px",
},

content: {
  marginTop: "10px",
  lineHeight: "1.5",
  color: "#d6caa5",
},

footer: {
  marginTop: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "13px",
  color: "#aaa",
},

delete: {
  background: "transparent",
  border: "none",
  color: "#ff7a7a",
  cursor: "pointer",
},
form: {
  marginBottom: "20px",
  padding: "16px",
  background: "#1f261e",
  borderRadius: "12px",
  border: "1px solid #2e3a2c",
},
  container: {
    display: "flex",
    flexDirection: "column",
    background: "#1f261e",
    transition: "0.2s ease",
  },

  meta: {
    display: "flex",
    gap: "10px",
  },

  metaInput: {
    background: "transparent",
    border: "none",
    outline: "none",
    fontSize: "12px",
    width: "90px",
  },

  button: {
    border: "none",
    color: "#359c2cff",
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: "13px",
  },
    timer_container: {
    height: "100vh",
    background: "#1B211A",
    color: "#EBD5AB",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    },

  timer: {
    fontSize: "42px",
    letterSpacing: "2px",
    opacity: 0.85,
  },

  circle: {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    background: "#628141",
  },

  phaseText: {
    fontSize: "14px",
    opacity: 0.6,
    textTransform: "uppercase",
    letterSpacing: "2px",
  },

  controls: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  smallBtn: {
    background: "transparent",
    border: "1px solid #444",
    color: "#ccc",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  subtext: {
    fontSize: "12px",
    opacity: 0.4,
  },
  plasmaWrapper: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
},  topBar: {
    position: "sticky",
    top: "64px", // aligns better with typical navbar heights
    zIndex: 100,
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px 16px",
    backdropFilter: "blur(6px)", // subtle glass feel
  },

  openBtn: {
    background: "linear-gradient(135deg, #6f8f4f, #628141)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "8px 14px",
    borderRadius: "999px", // pill shape
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "13px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
    transition: "all 0.2s ease",
  },

  panel: {
    position: "fixed",
    top: "110px",
    right: "24px",
    width: "380px",
    maxWidth: "90vw",
    zIndex: 200,

    background: "#1B211A",
    border: "1px solid #628141",
    borderRadius: "14px",

    boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
    padding: "14px",

    transition: "transform 0.25s ease, opacity 0.2s ease",
    transformOrigin: "top right",

    // smoother rendering
    willChange: "transform, opacity",
  },

  collapseBtn: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#EBD5AB",
    fontSize: "14px",
    padding: "4px 8px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  heading: {
    marginBottom: "16px",
    fontSize: "22px",
  },

  sectionHeader: {
    marginBottom: "12px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    paddingBottom: "6px",
  },

  sectionTitle: {
    fontSize: "15px",
    opacity: 0.8,
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },

  label: {
    opacity: 0.6,
    fontSize: "13px",
  },

  value: {
    fontWeight: 500,
    fontSize: "14px",
  },

  logout: {
    width: "20%",
    marginTop:'10px',
    background: "linear-gradient(135deg, #c94b4b, #b23)",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 500,
    transition: "all 0.2s ease",
    boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
  },

    root: {
    minHeight: "100vh",
    background: "#1b211a",
    color: "#e7e3d8",
    fontFamily: "system-ui",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  topbar: {
    position: "fixed",
    top: 20,
    left: 20,
  },

  navBtn: (active) => ({
    padding: "8px 14px",
    borderRadius: 10,
    background: active ? "#111" : "#222",
    color: active ? "#fff" : "#777",
    border: "1px solid #333",
    cursor: active ? "pointer" : "not-allowed",
  }),

  card: {
    width: 420,
    padding: 30,
    borderRadius: 20,
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(12px)",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  session: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 30,
  },

  bar: {
    width: 300,
    height: 6,
    background: "#111",
    borderRadius: 10,
  },

  fill: (p) => ({
    width: `${p}%`,
    height: "100%",
    background: "linear-gradient(90deg,#d4a843,#e6c36a)",
  }),

  quote: { opacity: 0.5 },

  buttonPrimary: (active) => ({
    padding: "12px",
    borderRadius: 12,
    background: active ? "#8fc43bff" : "#333",
    color: active ? "#000" : "#777",
    border: "none",
    cursor: active ? "pointer" : "not-allowed",
  }),

  input: {
    padding: 10,
    background: "#111",
    border: "1px solid #222",
    borderRadius: 10,
    color: "#fff",
  },

  diff: { display: "flex", gap: 6 },

  diffBtn: (active) => ({
    width: 34,
    height: 34,
    borderRadius: 8,
    background: active ? "#93bb25ff" : "#111",
    color: active ? "#000" : "#aaa",
    border: "1px solid #333",
  }),

  list: { display: "flex", flexDirection: "column", gap: 8 },

  item: {
    padding: 10,
    background: "#0f0f0f",
    borderRadius: 10,
  },

  break: { color: "#d8a837ff" },

};