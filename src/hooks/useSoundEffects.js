import { useState, useCallback, useEffect } from "react";

// Shared lazy AudioContext singleton to avoid repeated creation and browser gesture warnings
let sharedAudioCtx = null;

const getAudioContext = () => {
  if (!sharedAudioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      try {
        sharedAudioCtx = new AudioContextClass();
      } catch (e) {
        // Ignored if blocked
      }
    }
  }
  return sharedAudioCtx;
};

export const useSoundEffects = () => {
  const [muted, setMuted] = useState(false);

  // Resume audio context on first user interaction
  useEffect(() => {
    const unlockAudio = () => {
      const ctx = getAudioContext();
      if (ctx && ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    window.addEventListener("click", unlockAudio, { passive: true });
    window.addEventListener("touchstart", unlockAudio, { passive: true });
    window.addEventListener("keydown", unlockAudio, { passive: true });

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  const playSynthSound = useCallback((type = "hover") => {
    if (muted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx || ctx.state !== "running") return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === "hover") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "click") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === "success") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === "cut") {
        osc.type = "square";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      }
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  }, [muted]);

  const toggleMute = () => {
    setMuted(prev => !prev);
  };

  return { muted, toggleMute, playSynthSound };
};
