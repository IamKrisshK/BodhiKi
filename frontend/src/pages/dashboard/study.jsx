import { useEffect, useRef, useState } from "react";
import { logSession } from "../../features/activity/studyAPI";

const TIPS = [
  "Focus on one task only — remove everything else.",
  "If distracted, restart from last completed milestone.",
  "Deep work improves after 7–10 minutes of resistance.",
  "Don’t multitask. Single-thread your thinking.",
  "Breathe slowly: 4s inhale, 4s exhale.",
];

export default function Study() {
  const [seconds, setSeconds] = useState(1500);
  const [running, setRunning] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const [mode, setMode] = useState("focus");
  const [technique, setTechnique] = useState("pomodoro");

  const [milestones, setMilestones] = useState([]);
  const [input, setInput] = useState("");

  const [tip, setTip] = useState(TIPS[0]);

  const timerRef = useRef(null);
  const totalRef = useRef(1500);
  const midLogRef = useRef(false);

  const [isFullscreen, setIsFullscreen] = useState(false);
  /* ---------------- TIMER ---------------- */

  useEffect(() => {
    if (!running) return;

    timerRef.current = setInterval(() => {
      setSeconds((t) => {
        const progress = (totalRef.current - t) / totalRef.current;

        if (progress > 0.5 && !midLogRef.current) {
          midLogRef.current = true;
          pushMidSession();
          rotateTip();
        }

        if (t <= 1) {
          clearInterval(timerRef.current);
          handleEnd();
          return 0;
        }

        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [running]);

  /* ---------------- SESSION LOGGING ---------------- */

  const pushMidSession = async () => {
    await logSession({
      duration: totalRef.current - seconds,
      technique,
      milestones,
      type: "study-mid",
    });
  };

  const handleEnd = async () => {
    setRunning(false);

    await logSession({
      duration: totalRef.current,
      technique,
      milestones,
      type: "study-end",
    });

    setMilestones((prev) =>
      prev.map((m) =>
        m.done ? m : { ...m, done: false, archived: true }
      )
    );
  };

  /* ---------------- MILESTONES ---------------- */

  const addMilestone = () => {
    if (!input.trim()) return;

    setMilestones((prev) => [
      ...prev,
      { id: Date.now(), text: input, done: false },
    ]);

    setInput("");
  };

  const toggleMilestone = (id) => {
    setMilestones((prev) => {
      const updated = prev.map((m) =>
        m.id === id ? { ...m, done: !m.done } : m
      );

      return updated.sort((a, b) => a.done - b.done);
    });
  };

  /* ---------------- TIPS ---------------- */

  const rotateTip = () => {
    setTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
  };

  /* ---------------- SESSION TYPES ---------------- */

  const setSession = (type) => {
    setTechnique(type);
    setRunning(false);
    midLogRef.current = false;

    if (type === "pomodoro") {
      setSeconds(1500);
      totalRef.current = 1500;
    } else {
      setSeconds(3600);
      totalRef.current = 3600;
    }
  };

  /* ---------------- FULLSCREEN ---------------- */

  const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.body.classList.add("zen-fullscreen");
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        document.body.classList.remove("zen-fullscreen");
        setIsFullscreen(false);
      }
    };

  /* ---------------- UI ---------------- */

  const format = () => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progress =
    ((totalRef.current - seconds) / totalRef.current) * 100;

  return (
    <div style={styles.container} className="noise-bg">

      <button style={styles.fullscreen} onClick={toggleFullscreen}>
        {fullscreen ? "Exit" : "Full"}
      </button>

      <div style={styles.card}>
        <div style={styles.header}>
          <h2>Study Mode</h2>
          <p style={styles.tip}>{tip}</p>
        </div>

        <div style={styles.timer}>{format()}</div>

        <div style={styles.bar}>
          <div style={{ ...styles.fill, width: `${progress}%` }} />
        </div>

        <div style={styles.controls}>
          <button style={styles.primary} onClick={() => setRunning(!running)}>
            {running ? "Pause" : "Start"}
          </button>

          <button style={styles.secondary} onClick={() => setSession("pomodoro")}>
            Pomodoro
          </button>

          <button style={styles.secondary} onClick={() => setSession("deep")}>
            Deep Work
          </button>
        </div>

        <div style={styles.milestonesBox}>
          <div style={styles.inputRow}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add milestone"
              style={styles.input}
            />
            <button style={styles.add} onClick={addMilestone}>
              +
            </button>
          </div>

          <div style={styles.list}>
            {milestones.map((m) => (
              <div
                key={m.id}
                onClick={() => toggleMilestone(m.id)}
                style={{
                  ...styles.item,
                  opacity: m.done ? 0.5 : 1,
                  fontStyle: m.done ? "italic" : "normal",
                  textDecoration: m.done ? "line-through" : "none",
                }}
              >
                <span>{m.done ? "✓" : "○"} {m.text}</span>
              </div>
            ))}
          </div>
        </div>
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
    background: "#0f1110",
    position: "relative",
    overflow: "hidden",
  },

  fullscreen: {
    position: "absolute",
    top: 20,
    right: 20,
    background: "transparent",
    border: "1px solid #8BAE66",
    color: "#EBD5AB",
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer",
    zIndex: 10,
  },

  card: {
    width: 480,
    padding: 24,
    borderRadius: 16,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(139,174,102,0.2)",
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    zIndex: 2,
  },

  header: {
    textAlign: "center",
  },

  tip: {
    fontSize: 12,
    opacity: 0.7,
  },

  timer: {
    fontSize: 54,
    textAlign: "center",
    color: "#EBD5AB",
  },

  bar: {
    height: 6,
    background: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    background: "#8BAE66",
    transition: "0.3s",
  },

  controls: {
    display: "flex",
    gap: 8,
  },

  primary: {
    flex: 1,
    padding: 10,
    background: "#8BAE66",
    border: "none",
    borderRadius: 8,
  },

  secondary: {
    flex: 1,
    padding: 10,
    background: "transparent",
    border: "1px solid #8BAE66",
    borderRadius: 8,
    color: "#EBD5AB",
  },

  milestonesBox: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  inputRow: {
    display: "flex",
    gap: 8,
  },

  input: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #333",
    background: "rgba(0,0,0,0.3)",
    color: "#fff",
  },

  add: {
    padding: "10px 14px",
    background: "#8BAE66",
    border: "none",
    borderRadius: 8,
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    maxHeight: 160,
    overflowY: "auto",
  },

  item: {
    padding: 8,
    borderRadius: 8,
    background: "rgba(255,255,255,0.03)",
    cursor: "pointer",
  },
};