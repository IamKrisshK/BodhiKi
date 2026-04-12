import { useEffect, useRef, useState } from "react";

const MESSAGES = [
  "Breathe slowly. Do not rush thoughts.",
  "Observe without reacting.",
  "Focus returns when you stop forcing it.",
  "Let distractions pass like clouds.",
  "Your attention is the training itself.",
];

export default function ZenGarden() {
  const [running, setRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [seconds, setSeconds] = useState(300);
  const [preset, setPreset] = useState(300);
  const [msgIndex, setMsgIndex] = useState(0);
  const [msgVisible, setMsgVisible] = useState(true);
  const plasmaRef = useRef(null);
  const audioCtxRef = useRef(null);
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const dataRef = useRef(null);
  const timerRef = useRef(null);
  const breathRef = useRef(null);
  const msgRef = useRef(null);
  const msgTimerRef = useRef(null);

  /* ---------------- TIMER ---------------- */

  useEffect(() => {
    if (!running) return;

    timerRef.current = setInterval(() => {
      setSeconds((t) => {
        if (t <= 1) {
          setRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [running]);

  const format = () => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  /* ---------------- BREATH ENGINE ---------------- */

  useEffect(() => {
    if (!running) return;

    let t = 0;

    breathRef.current = setInterval(() => {
      t += 0.04;

      const breath = (Math.sin(t) + 1) / 2;
      const scale = 0.9 + breath * 0.35;

      const radius = `
        ${50 + breath * 12}% 
        ${45 + breath * 18}% 
        ${55 - breath * 10}% 
        ${50 + breath * 8}%
      `;

      if (plasmaRef.current) {
        plasmaRef.current.style.setProperty("--scale", scale);
        plasmaRef.current.style.setProperty("--radius", radius);
      }
    }, 40);

    return () => clearInterval(breathRef.current);
  }, [running]);

  /* ---------------- AUDIO ENGINE ---------------- */

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
        plasmaRef.current.style.setProperty(
          "--radius",
          `
            ${50 + intensity * 25}% 
            ${45 + intensity * 30}% 
            ${55 - intensity * 20}% 
            ${50 + intensity * 15}%
          `
        );
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

      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      try {
        await audio.play();
      } catch (err) {
        console.log("Audio play blocked:", err);
      }
    } else {
      const ctx = audioCtxRef.current;
      const audio = audioRef.current;

      if (audio) audio.pause();
      if (ctx && ctx.state !== "closed") {
        await ctx.suspend();
      }
    }
  };

  /* ---------------- MESSAGE ENGINE ---------------- */

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

  /* ---------------- START / PAUSE ---------------- */

  const handleStartPause = async () => {
    const next = !running;
    setRunning(next);
    await toggleAudio(next);
  };

  /* ---------------- PRESETS ---------------- */

  const setSessionTime = (t) => {
    setPreset(t);
    setSeconds(t);
    setRunning(false);
  };

  /* ---------------- UI ---------------- */

  return (
    <div style={styles.container}>

      <button style={styles.fullscreen} onClick={toggleFullscreen}>
        {isFullscreen ? "Exit" : "Full"}
      </button>

      <div ref={plasmaRef} className="plasma" />

      <div style={styles.timer}>{format()}</div>

      {/* MESSAGE */}
      <div
        ref={msgRef}
        style={{
          ...styles.message,
          opacity: msgVisible ? 0.9 : 0,
          transform: msgVisible ? "translateY(0px)" : "translateY(20px)",
          filter: msgVisible ? "blur(0px)" : "blur(6px)",
        }}
      >
        {MESSAGES[msgIndex]}
      </div>

      {/* PRESETS */}
      <div style={{...styles.presets,opacity: running ? 0.15 : 1}}>
        <button style={styles.presetBtn} onClick={() => setSessionTime(300)}>5m</button>
        <button style={styles.presetBtn} onClick={() => setSessionTime(600)}>10m</button>
        <button style={styles.presetBtn} onClick={() => setSessionTime(900)}>15m</button>
      </div>
      {/* CONTROLS */}
      <div
        style={{
          ...styles.controls,
          opacity: running ? 0.15 : 1,
          pointerEvents: running ? "auto" : "auto",
        }}
        className="zen-controls"
      >

        <button style={styles.button} onClick={handleStartPause}>
          {running ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
}
const styles = {
  presets: {
  display: "flex",
  gap: "8px",
  marginTop: "10px",
},

presetBtn: {
  background: "transparent",
  border: "1px solid #628141",
  color: "#EBD5AB",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "12px",
},
  container: {
    height: "100vh",
    background: "#1B211A",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "18px",
    position: "relative",
    overflow: "hidden",
  },

  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  timer: {
    fontSize: "42px",
    color: "#EBD5AB",
    letterSpacing: "2px",
  },

  tip: {
    fontSize: "13px",
    opacity: 0.6,
    maxWidth: "300px",
    textAlign: "center",
  },

  controls: {
    display: "flex",
    gap: "10px",
    transition: "0.4s ease",
  },

  button: {
    background: "#628141",
    border: "none",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  fullscreen: {
    position: "absolute",
    top: 20,
    right: 20,
    background: "transparent",
    border: "1px solid #444",
    color: "#aaa",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
};