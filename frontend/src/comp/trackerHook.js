import { useEffect } from "react";
import { activityService } from "../features/services/tracker";
export function useActivityTracker(isRunning, activityCat, activityType) {
  useEffect(() => {
    if (!activityType) return;
    if (!activityCat) return;
    if (isRunning) {
      activityService.start({
        category: activityCat,
        technique: activityType,
      });
    } else {
      activityService.stop();
    }

    return () => activityService.stop();
  }, [isRunning,activityCat, activityType]);
}