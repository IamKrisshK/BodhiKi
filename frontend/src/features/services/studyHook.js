import { useEffect, useRef } from "react";
import { activityService } from "./tracker";

/**
 * useStudyTracker
 *
 * @param {boolean} isRunning   - session is actively running
 * @param {string}  technique   - "pomodoro" | "deep-work" | "hardcore"
 * @param {Array}   milestones  - [{ text, minutes, difficulty }] from Study component
 * @param {string}  moodBefore  - emoji string
 */
export function useStudyTracker(isRunning, technique, milestones, moodBefore) {
  const started = useRef(false);

  useEffect(() => {
    if (!technique) return;

    if (isRunning && !started.current) {
      // Stamp each milestone with the time the session started
      const stampedMilestones = (milestones || []).map((m) => ({
        label:      m.text,
        difficulty: m.difficulty ?? "medium",
        timestamp:  new Date().toISOString(),
      }));

      activityService.start({
        category:   "study",
        technique,
        milestones: stampedMilestones,
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
  }, [isRunning, technique, moodBefore]);
}