import { useEffect, useRef, useState } from "react";

const MESSAGES = [
  "Breathe slowly. Do not rush thoughts.",
  "Observe without reacting.",
  "Focus returns when you stop forcing it.",
  "Let distractions pass like clouds.",
  "Your attention is the training itself.",
];

const ACTIVITIES = [
  { id: "Meditation", icon: "🧘", desc: "Gentle narration to quiet a busy mind", duration: "5–15 min" },
  { id: "Breathing",  icon: "🌬",  desc: "Box breathing to calm the nervous system", duration: "5 min" },
  { id: "Soundscape", icon: "🎵", desc: "Ambient nature sounds & light music", duration: "10 min" },
  { id: "Reflection", icon: "📝", desc: "Short gratitude & intention prompts", duration: "5 min" },
];

const MOODS = ["😮‍💨", "😐", "🙂", "😄"];
const RATINGS = [
  { emoji: "😮‍💨", label: "Tense" },
  { emoji: "😐",   label: "Neutral" },
  { emoji: "🙂",   label: "Calmer" },
  { emoji: "😌",   label: "Restored" },
];

export default function ZenGarden() {
  const [running, setRunning]           = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [seconds, setSeconds]           = useState(300);
  const [preset, setPreset]             = useState(300);
  const [msgIndex, setMsgIndex]         = useState(0);
  const [msgVisible, setMsgVisible]     = useState(true);
  const [screen, setScreen]             = useState("home");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [phase, setPhase]               = useState("breathing");
  const [selectedMood, setSelectedMood] = useState(2);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sessionDuration, setSessionDuration] = useState(300);

  const plasmaRef   = useRef(null);
  const audioCtxRef = useRef(null);
  const audioRef    = useRef(null);
  const analyserRef = useRef(null);
  const dataRef     = useRef(null);
  const timerRef    = useRef(null);
  const breathRef   = useRef(null);
  const msgRef      = useRef(null);
  const msgTimerRef = useRef(null);
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        const audio = audioRef.current;
        const ctx = audioCtxRef.current;
        if (audio) audio.pause();
        if (ctx && ctx.state === "running") ctx.suspend();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);
  /* ─── TIMER ─── */
  useEffect(() => {
    if (!running) return;
    const total = seconds;
    timerRef.current = setInterval(() => {
      setSeconds((t) => {
        if (t <= 1) {
          setRunning(false);
          setScreen("complete");
          return 0;
        }
        if (t === Math.floor(total / 2)) setPhase("focus");
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [running]);

  const format = (s = seconds) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  /* ─── BREATH ENGINE (untouched) ─── */
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

  /* ─── AUDIO ENGINE (untouched) ─── */
  const initAudio = async () => {
    if (audioCtxRef.current) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const audio = new Audio("/sounds/sound1.mp3");
    audio.loop = true;
    audio.crossOrigin = "anonymous";
    const source = ctx.createMediaElementSource(audio);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    source.connect(analyser);
    analyser.connect(ctx.destination);
    const data = new Uint8Array(analyser.frequencyBinCount);
    audioCtxRef.current = ctx;
    analyserRef.current = analyser;
    dataRef.current = data;
    audioRef.current = audio;
    const loop = () => {
      analyser.getByteFrequencyData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) sum += data[i];
      const intensity = sum / data.length / 255;
      if (plasmaRef.current) {
        plasmaRef.current.style.setProperty("--scale", 1 + intensity * 0.5);
        plasmaRef.current.style.setProperty("--radius", `${50 + intensity * 25}% ${45 + intensity * 30}% ${55 - intensity * 20}% ${50 + intensity * 15}%`);
      }
      requestAnimationFrame(loop);
    };
    loop();
  };

  const toggleAudio = async (nextState) => {
    if (nextState) {
      await initAudio();
      const ctx = audioCtxRef.current;
      const audio = audioRef.current;
      if (!ctx || !audio) return;
      if (ctx.state === "suspended") await ctx.resume();
      try { await audio.play(); } catch (err) { console.log("Audio play blocked:", err); }
    } else {
      const audio = audioRef.current;
      const ctx = audioCtxRef.current;
      if (audio) audio.pause();
      if (ctx && ctx.state !== "closed") await ctx.suspend();
    }
  };

  /* ─── MESSAGE ENGINE (untouched) ─── */
  useEffect(() => {
    if (!running) return;
    msgTimerRef.current = setInterval(() => {
      setMsgVisible(false);
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % MESSAGES.length);
        setMsgVisible(true);
      }, 500);
    }, 7000);
    return () => clearInterval(msgTimerRef.current);
  }, [running]);

  /* ─── FULLSCREEN (untouched) ─── */
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

  /* ─── START / PAUSE (untouched) ─── */
  const handleStartPause = async () => {
    const next = !running;
    setRunning(next);
    await toggleAudio(next);
  };

  /* ─── PRESETS ─── */
  const setSessionTime = (t) => {
    setPreset(t);
    setSeconds(t);
    setRunning(false);
  };

  const startSession = async () => {
    setSessionDuration(seconds);
    setScreen("session");
    setPhase("breathing");
    setRunning(true);
    await toggleAudio(true);
  };

  /* ════════════════════════════════
     HOME SCREEN
  ════════════════════════════════ */
  if (screen === "home") {
    return (
      <>
        <div className="home-wrap">
          <div className="hero-wrap">
            <h1>Zen Garden</h1>
            <p>Restoring the scholar's clarity</p>
          </div>

          <div className="cards-grid">
            {[
              { label: "Quick Reset",  icon: "💨", bg: "rgba(56,130,190,0.12)",  desc: "5 Minute deep breathing to clear cognitive load.", t: 300 },
              { label: "Vipassana",    icon: "👁",  bg: "rgba(90,56,190,0.12)",   desc: "15 Minute insight meditation for perspective.", t: 900 },
              { label: "Peak Focus",   icon: "⚡", bg: "rgba(200,120,20,0.12)",  desc: "10 Minute sharp concentration technique.", t: 600 },
              { label: "Deep Rest",    icon: "🌙", bg: "rgba(20,140,120,0.12)",  desc: "20 Minute NSDR protocol for replenishment.", t: 1200 },
            ].map((m) => (
              <div
                className="mode-card"
                key={m.label}
                onClick={() => { setSessionTime(m.t); setScreen("activities"); }}
              >
                <div className="card-icon" style={{ background: m.bg }}>{m.icon}</div>
                <div>
                  <div className="card-title">{m.label}</div>
                  <div className="card-desc">{m.desc}</div>
                </div>
                <button className="card-begin">Begin</button>
              </div>
            ))}
          </div>

          <div className="focus-row">
            <div className="focus-left">
              <h3>How is your focus today?</h3>
              <p>Tell us your current mental state so we can suggest the best meditation or study frequency.</p>
              <div className="mood-row">
                {MOODS.map((emoji, i) => (
                  <button
                    key={i}
                    className={`mood-btn${selectedMood === i ? " sel" : ""}`}
                    onClick={() => setSelectedMood(i)}
                  >{emoji}</button>
                ))}
              </div>
            </div>
            <div className="journal-side">
              <div className="journal-label">Mindful Journal</div>
              <div className="journal-text">
                "Feeling slightly overwhelmed by the complexity of the literature review, but the 15-minute Vipassana helped me realize I don't need to tackle everything at once. Focus is returning."
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ════════════════════════════════
     ACTIVITIES SCREEN
  ════════════════════════════════ */
  if (screen === "activities") {
    return (
      <>
        <div className="act-wrap">
          <button className="act-back" onClick={() => setScreen("home")}>← Back</button>

          <div className="act-header">
            <div className="act-prelabel">Relax &amp; Reset</div>
            <h2>What would help right now?</h2>
            <p>Choose an activity to begin your session</p>
          </div>

          <div className="act-grid">
            {ACTIVITIES.map((a) => (
              <div
                key={a.id}
                className={`act-tile${selectedActivity === a.id ? " sel" : ""}`}
                onClick={() => setSelectedActivity(a.id)}
              >
                <div className="tile-icon">{a.icon}</div>
                <div className="tile-name">{a.id}</div>
                <div className="tile-desc">{a.desc}</div>
                <div className="tile-dur">{a.duration}</div>
              </div>
            ))}
          </div>

          <button
            className="act-cta"
            disabled={!selectedActivity}
            onClick={startSession}
          >
            Begin Session →
          </button>
        </div>
      </>
    );
  }

  /* ════════════════════════════════
     COMPLETION SCREEN
  ════════════════════════════════ */
  if (screen === "complete") {
    return (
      <>
        <div className="cmp-wrap">
          <div className="cmp-ring">✓</div>
          <div className="cmp-title">Session complete</div>
          <div className="cmp-sub">
            You completed a {format(sessionDuration)} {selectedActivity || "session"}
          </div>

          <div className="cmp-stats">
            <div className="stat-item">
              <div className="stat-label">Duration</div>
              <div className="stat-val">{format(sessionDuration)}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Activity</div>
              <div className="stat-val">{selectedActivity || "—"}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Phase</div>
              <div className="stat-val" style={{ textTransform: "capitalize" }}>{phase}</div>
            </div>
          </div>

          <div className="rating-prompt">How do you feel now?</div>
          <div className="rating-row">
            {RATINGS.map((r, i) => (
              <button
                key={i}
                className={`rating-btn${selectedRating === i ? " sel" : ""}`}
                onClick={() => setSelectedRating(i)}
              >
                {r.emoji}
                <span className="rating-lbl">{r.label}</span>
              </button>
            ))}
          </div>

          <div className="cmp-actions">
            <button className="btn-ghost" onClick={() => { setScreen("activities"); setRunning(false); }}>
              Another session
            </button>
            <button className="btn-green-main" onClick={() => { setScreen("home"); setRunning(false); }}>
              Back to dashboard
            </button>
          </div>
        </div>
      </>
    );
  }

  /* ════════════════════════════════
     SESSION SCREEN (untouched animations)
  ════════════════════════════════ */
  return (
    <>
      <div className="zen-session-wrap">
        <button className="zen-back-btn" onClick={() => { setRunning(false); toggleAudio(false); setScreen("activities"); }}>← Back</button>
        <button className="zen-fs-btn" onClick={toggleFullscreen}>{isFullscreen ? "Exit" : "Full"}</button>

        <div ref={plasmaRef} className="plasma" />

        <div className="zen-activity-tag">{selectedActivity || "Session"}</div>
        <div className="zen-timer-display">{format()}</div>

        <div
          ref={msgRef}
          className="zen-msg"
          style={{
            opacity: msgVisible ? 0.9 : 0,
            transform: msgVisible ? "translateY(0px)" : "translateY(20px)",
            filter: msgVisible ? "blur(0px)" : "blur(6px)",
          }}
        >
          {MESSAGES[msgIndex]}
        </div>

        <div className="zen-presets-row" style={{ opacity: running ? 0.15 : 1 }}>
          <button className="zen-preset" onClick={() => setSessionTime(300)}>5m</button>
          <button className="zen-preset" onClick={() => setSessionTime(600)}>10m</button>
          <button className="zen-preset" onClick={() => setSessionTime(900)}>15m</button>
        </div>

        <button className="zen-start" onClick={handleStartPause}>
          {running ? "Pause" : "Start"}
        </button>
      </div>
    </>
  );
}