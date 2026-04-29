import { useEffect, useRef, useState } from "react";
import { theme } from "../../styles/theme";
/* ───────── CONFIG ───────── */

const DIFFICULTY = { light: 5, medium: 10, heavy: 18 };

const TECHNIQUE = {
  pomodoro: { label: "Pomodoro", break: 5 },
  deep: { label: "Deep Work", break: 10 },
  hardcore: { label: "Hardcore", break: 0 },
};

const QUOTES = [
  "Focus is a decision.",
  "Depth over speed.",
  "Stay with the task.",
  "Let distractions pass.",
];

const rand = (a) => a[Math.floor(Math.random() * a.length)];
const fmt = (s) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/* ───────── APP ───────── */

export default function Study() {
  const [phase, setPhase] = useState("init");

  const [milestones, setMilestones] = useState([]);
  const [input, setInput] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [technique, setTechnique] = useState("pomodoro");

  const [timeline, setTimeline] = useState([]);
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [total, setTotal] = useState(0);

  const [running, setRunning] = useState(false);
  const [quote, setQuote] = useState(QUOTES[0]);
  const [onBreak, setOnBreak] = useState(false);

  const timerRef = useRef();
  const quoteRef = useRef();

  /* ───────── LOGIC ───────── */

  const addCheckpoint = () => {
    if (!input.trim()) return;
    setMilestones((p) => [
      ...p,
      {
        id: Date.now(),
        text: input,
        minutes: DIFFICULTY[difficulty],
      },
    ]);
    setInput("");
  };

  const buildTimeline = () => {
    if (!milestones.length) return;

    let acc = 0;
    const breakSec = TECHNIQUE[technique].break * 60;
    const built = [];

    milestones.forEach((m, i) => {
      const end = acc + m.minutes * 60;
      built.push({ type: "focus", label: m.text, start: acc, end });
      acc = end;

      if (technique !== "hardcore" && i !== milestones.length - 1) {
        built.push({
          type: "break",
          label: "Break",
          start: acc,
          end: acc + breakSec,
        });
        acc += breakSec;
      }
    });

    setTimeline(built);
    setTotal(acc);
    setSeconds(built[0]?.end - built[0]?.start);
    setElapsed(0);
    setIndex(0);
    setPhase("run");

    // 🔥 Auto fullscreen
    setTimeout(() => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      }
    }, 200);
  };

  useEffect(() => {
    if (!running) return;

    timerRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          next();
          return 0;
        }
        return s - 1;
      });
      setElapsed((e) => e + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [running, index]);

  useEffect(() => {
    if (!running) return;

    quoteRef.current = setInterval(() => {
      setQuote(rand(QUOTES));
    }, 180000);

    return () => clearInterval(quoteRef.current);
  }, [running]);

  const next = () => {
    const nextIdx = index + 1;

    if (nextIdx >= timeline.length) {
      setRunning(false);
      return;
    }

    const nextBlock = timeline[nextIdx];
    setIndex(nextIdx);
    setSeconds(nextBlock.end - nextBlock.start);
    setOnBreak(nextBlock.type === "break");
  };

  const skip = () => {
    const block = timeline[index];
    if (!block || block.type !== "focus") return;

    setElapsed(block.end);
    next();
  };

  const progress = total ? (elapsed / total) * 100 : 0;

  /* ───────── NAV ───────── */

  const canExit = !running;

  const handleBack = () => {
    if (!canExit) return;
    setPhase("init");
    setRunning(false);

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  /* ───────── INIT UI ───────── */

  if (phase === "init") {
    const canStart = milestones.length > 0;

    return (
      <div style={theme.root}>
        <div style={theme.card}>
          <h2 style={theme.title}>Build Session</h2>

          <div style={theme.row}>
            <input
              style={theme.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Checkpoint..."
            />

            <div style={theme.diff}>
              {["light", "medium", "heavy"].map((d) => (
                <button
                  key={d}
                  style={theme.diffBtn(difficulty === d)}
                  onClick={() => setDifficulty(d)}
                >
                  {d[0].toUpperCase()}
                </button>
              ))}
            </div>

            <button style={theme.button} onClick={addCheckpoint}>
              +
            </button>
          </div>

          <div style={theme.list}>
            {milestones.map((m) => (
              <div key={m.id} style={theme.item}>
                {m.text} — {m.minutes}m
              </div>
            ))}
          </div>

          <select
            style={theme.input}
            onChange={(e) => setTechnique(e.target.value)}
          >
            {Object.entries(TECHNIQUE).map(([k, v]) => (
              <option key={k}>{v.label}</option>
            ))}
          </select>

          <button
            style={theme.buttonPrimary(canStart)}
            onClick={buildTimeline}
            disabled={!canStart}
          >
            Start
          </button>
        </div>
      </div>
    );
  }

  /* ───────── RUN UI ───────── */

  return (
    <div style={theme.root}>
      {/* TOP BAR */}
      <div style={theme.topbar}>
        <button
          style={theme.navBtn(canExit)}
          onClick={handleBack}
          title={canExit ? "Go back" : "Pause session to exit"}
        >
          ← Back
        </button>
      </div>

      <div style={theme.session}>
        <h2 style={theme.title}>{timeline[index]?.label}</h2>

        <div style={theme.timer}>{fmt(seconds)}</div>

        <div style={theme.bar}>
          <div style={theme.fill(progress)} />
        </div>

        <div style={theme.quote}>{quote}</div>

        <div style={theme.controls}>
          <button style={theme.button} onClick={() => setRunning(!running)}>
            {running ? "Pause" : "Start"}
          </button>

          <button style={theme.button} onClick={skip}>
            Skip Early
          </button>
        </div>

        {onBreak && <div style={theme.break}>Break</div>}
      </div>
    </div>
  );
}
