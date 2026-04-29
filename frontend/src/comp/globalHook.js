import { useState } from "react";

export function useSessionManager() {
  const [activeSession, setActiveSession] = useState(null);
  const startSession = (type) => {
    if (activeSession && activeSession !== type) {
      return false;
    }
    setActiveSession(type);
    return true;
  };
  const stopSession = () => {
    setActiveSession(null);
  };
  return {
    activeSession,
    startSession,
    stopSession,
  };
}