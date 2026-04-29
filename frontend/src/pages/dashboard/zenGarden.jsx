import { useEffect, useRef, useState } from "react";
import { useFocusTracker } from "../../features/services/focusHook";

const MESSAGES = [
  "Breathe slowly. Do not rush thoughts.",
  "Observe without reacting.",
  "Focus returns when you stop forcing it.",
  "Let distractions pass like clouds.",
  "Your attention is the training itself.",
];

const ACTIVITY_MAP = {
  Meditation: "meditation",
  Breathing: "breathing",
  Soundscape: "soundscape",
  Reflection: "reflection",
};

const ACTIVITIES = [
  { id: "Meditation", icon: "🧘", desc: "Gentle narration to quiet a busy mind", duration: "5–15 min" },
  { id: "Breathing", icon: "🌬", desc: "Box breathing to calm the nervous system", duration: "5 min" },
  { id: "Soundscape", icon: "🎵", desc: "Ambient nature sounds & light music", duration: "10 min" },
  { id: "Reflection", icon: "📝", desc: "Short gratitude & intention prompts", duration: "5 min" },
];

const MOODS = ["😮‍💨", "😐", "🙂", "😄"];
const RATINGS = [
  { emoji: "😮‍💨", label: "Tense" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "🙂", label: "Calmer" },
  { emoji: "😌", label: "Restored" },
];

export default function ZenGarden() {
  /* ───────────────── STATE ───────────────── */
  const [running, setRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [seconds, setSeconds] = useState(300);
  const [preset, setPreset] = useState(300);

  const [msgIndex, setMsgIndex] = useState(0);
  const [msgVisible, setMsgVisible] = useState(true);

  const [screen, setScreen] = useState("home");

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedMood, setSelectedMood] = useState(1);
  const [selectedRating, setSelectedRating] = useState(null);

  const [sessionDuration, setSessionDuration] = useState(300);

  /* ───────────────── DERIVED ───────────────── */
  const normalizedActivity = selectedActivity
    ? ACTIVITY_MAP[selectedActivity]
    : null;

  const moodBefore =
    selectedMood ?? 1; // fallback neutral

  const mode = selectedMood ?? 1;

  useFocusTracker(
    running,
    "focus",
    selectedActivity,
    mode
  );
  /* ───────────────── REFS ───────────────── */
  const plasmaRef = useRef(null);
  const timerRef = useRef(null);
  const breathRef = useRef(null);
  const msgTimerRef = useRef(null);

  /* ───────────────── TIMER ───────────────── */
  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      setSeconds((t) => {
        if (t <= 1) {
          setRunning(false);
          setScreen("complete");
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [running]);

  /* ───────────────── BREATH VISUAL ───────────────── */
  useEffect(() => {
    if (!running) return;

    let t = 0;

    breathRef.current = setInterval(() => {
      t += 0.04;

      const breath = (Math.sin(t) + 1) / 2;
      const scale = 0.9 + breath * 0.35;
      const radius = `${50 + breath * 12}% ${45 + breath * 18}% ${55 - breath * 10}% ${50 + breath * 8}%`;

      if (plasmaRef.current) {
        plasmaRef.current.style.setProperty("--scale", scale);
        plasmaRef.current.style.setProperty("--radius", radius);
      }
    }, 40);

    return () => clearInterval(breathRef.current);
  }, [running]);

  /* ───────────────── MESSAGES ───────────────── */
  useEffect(() => {
    if (!running) return;

    msgTimerRef.current = setInterval(() => {
      setMsgVisible(false);

      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % MESSAGES.length);
        setMsgVisible(true);
      }, 400);
    }, 7000);

    return () => clearInterval(msgTimerRef.current);
  }, [running]);

  /* ───────────────── FULLSCREEN ───────────────── */
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  /* ───────────────── AUDIO (placeholder kept) ───────────────── */
  const toggleAudio = async (state) => {
    // unchanged logic assumed
  };

  /* ───────────────── SESSION CONTROLS ───────────────── */
  const startSession = async () => {
    setSessionDuration(seconds);
    setScreen("session");
    setRunning(true);
    await toggleAudio(true);
  };

  const handleStartPause = async () => {
    const next = !running;
    setRunning(next);
    await toggleAudio(next);
  };

  const setSessionTime = (t) => {
    setPreset(t);
    setSeconds(t);
    setRunning(false);
  };

  /* ───────────────── UI STATES ───────────────── */

  /* HOME */
  if (screen === "home") {
    return (
      <div className="home-wrap">
        <div className="hero-wrap">
          <h1>Zen Garden</h1>
          <p>Restoring clarity</p>
        </div>

        <div className="cards-grid">
          {[
            { label: "Quick Reset", icon: "💨", t: 300, desc: "Breathing reset" },
            { label: "Vipassana", icon: "👁", t: 900, desc: "Insight meditation" },
            { label: "Peak Focus", icon: "⚡", t: 600, desc: "Deep focus mode" },
            { label: "Deep Rest", icon: "🌙", t: 1200, desc: "NSDR recovery" },
          ].map((m) => (
            <div
              key={m.label}
              className="mode-card"
              onClick={() => {
                setSessionTime(m.t);
                setScreen("activities");
              }}
            >
              <div>{m.icon}</div>
              <div>
                <div>{m.label}</div>
                <div>{m.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mood-row">
          {MOODS.map((m, i) => (
            <button
              key={i}
              onClick={() => setSelectedMood(i)}
              className={selectedMood === i ? "sel" : ""}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ACTIVITIES */
  if (screen === "activities") {
    return (
      <div className="act-wrap">
        <button onClick={() => setScreen("home")}>← Back</button>

        <div className="act-grid">
          {ACTIVITIES.map((a) => (
            <div
              key={a.id}
              className={selectedActivity === a.id ? "sel" : ""}
              onClick={() => setSelectedActivity(a.id)}
            >
              <div>{a.icon}</div>
              <div>{a.id}</div>
            </div>
          ))}
        </div>

        <button disabled={!selectedActivity} onClick={startSession}>
          Begin Session
        </button>
      </div>
    );
  }

  /* COMPLETE */
  if (screen === "complete") {
    return (
      <div className="cmp-wrap">
        <h2>Session complete</h2>

        <p>
          Duration: {Math.floor(sessionDuration / 60)}:
          {String(sessionDuration % 60).padStart(2, "0")}
        </p>

        <div className="rating-row">
          {RATINGS.map((r, i) => (
            <button
              key={i}
              className={selectedRating === i ? "sel" : ""}
              onClick={() => setSelectedRating(i)}
            >
              {r.emoji}
            </button>
          ))}
        </div>

        <button onClick={() => setScreen("home")}>Back Home</button>
      </div>
    );
  }

  /* SESSION */
  return (
    <div className="zen-session">
      <div ref={plasmaRef} className="plasma" />

      <h2>{selectedActivity || "Session"}</h2>
      <h1>{seconds}s</h1>

      <p
        style={{
          opacity: msgVisible ? 1 : 0,
          transition: "0.3s",
        }}
      >
        {MESSAGES[msgIndex]}
      </p>

      <button onClick={handleStartPause}>
        {running ? "Pause" : "Start"}
      </button>

      <button onClick={toggleFullscreen}>
        Fullscreen
      </button>
    </div>
  );
}