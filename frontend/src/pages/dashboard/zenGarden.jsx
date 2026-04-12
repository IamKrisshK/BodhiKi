import { useState, useEffect, useRef } from "react";

export default function ZenGarden() {
  const [running, setRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const plasmaRef = useRef(null);
  const audioRef = useRef(null);

  /* ---------------- 🫁 BREATH ENGINE ---------------- */

  useEffect(() => {
    if (!running) return;

    let t = 0;

    const interval = setInterval(() => {
      t += 0.05;

      // smooth breathing wave
      const breath = (Math.sin(t) + 1) / 2; // 0 → 1

      // scale effect
      const scale = 0.9 + breath * 0.3;

      // organic shape morph
      const radius = `
        ${50 + breath * 10}% 
        ${45 + breath * 15}% 
        ${55 - breath * 10}% 
        ${50 + breath * 5}%
      `;

      if (plasmaRef.current) {
        plasmaRef.current.style.setProperty("--scale", scale);
        plasmaRef.current.style.setProperty("--radius", radius);
      }

    }, 50);

    return () => clearInterval(interval);
  }, [running]);

  /* ---------------- 🎧 SOUND REACTIVITY ---------------- */

  useEffect(() => {
    let analyser, dataArray, source;

    const initAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;

        source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        dataArray = new Uint8Array(analyser.frequencyBinCount);

        const loop = () => {
          analyser.getByteFrequencyData(dataArray);

          const avg =
            dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

          // normalize
          const intensity = avg / 255;

          if (plasmaRef.current) {
            const extraScale = 1 + intensity * 0.5;

            plasmaRef.current.style.setProperty(
              "--scale",
              `calc(var(--scale,1) * ${extraScale})`
            );

            // distort shape with sound
            plasmaRef.current.style.setProperty(
              "--radius",
              `${50 + intensity * 30}% ${40 + intensity * 20}% ${60 -
                intensity * 20}% ${50 + intensity * 10}%`
            );
          }

          requestAnimationFrame(loop);
        };

        loop();
      } catch (err) {
        console.log("Mic permission denied");
      }
    };

    initAudio();
  }, []);

  /* ---------------- 🖥️ FULLSCREEN ---------------- */

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

  return (
    <div style={styles.container}>

      {/* FULLSCREEN */}
      <button style={styles.fullscreen} onClick={toggleFullscreen}>
        {isFullscreen ? "Exit" : "Fullscreen"}
      </button>

      {/* PLASMA */}
      <div style={styles.center}>
        <div ref={plasmaRef} className="plasma"></div>
      </div>

      {/* CONTROLS */}
      <div style={styles.controls}>
        <button style={styles.button} onClick={() => setRunning(r => !r)}>
          {running ? "Pause" : "Start"}
        </button>
      </div>

      <p style={styles.subtext}>
        breathe naturally • sound shapes the flow
      </p>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#1B211A",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    position: "relative",
  },

  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  controls: {
    display: "flex",
    gap: "10px",
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
    top: "20px",
    right: "20px",
    background: "transparent",
    border: "1px solid #444",
    color: "#aaa",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  subtext: {
    fontSize: "12px",
    opacity: 0.4,
  },
};