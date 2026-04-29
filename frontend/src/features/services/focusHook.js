import { useEffect, useRef } from "react";
import { activityService } from "./tracker";

/**
 * useFocusTracker
 *
 * @param {boolean} isRunning      - session is actively running
 * @param {string}  preset         - "quick-reset" | "vipassana" | "peak-focus" | "deep-rest"
 * @param {string}  activity       - "meditation" | "breathing" | "soundscape" | "reflection"
 * @param {string}  moodBefore     - emoji string from mood selector
 */
export function useFocusTracker(isRunning, preset, activity, moodBefore) {
  const started = useRef(false);

  useEffect(() => {
    if (!preset || !activity) return;

    if (isRunning && !started.current) {
      activityService.start({
        category:  "focus",
        technique: activity,
        source:    preset,
        moodBefore,
      });
      started.current = true;
    }

    if (!isRunning && started.current) {
      activityService.stop();
      started.current = false;
    }

    return () => {
      if (started.current) {
        activityService.stop();
        started.current = false;
      }
    };
  }, [isRunning, preset, activity, moodBefore]);
}