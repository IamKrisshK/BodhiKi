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
      color: "#EBD5AB", // highlight links
    },
  },
  author: {
  fontSize: "13px",
  fontStyle: "italic",
},
card: {
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
    color: "#fff",
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
},
};