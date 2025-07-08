"use client";

import { useEffect } from "react";
import { useActivity } from "@/contexts/ActivityContext";

const TRACKED_EVENTS = [
  "mousedown",
  "mousemove",
  "keydown",
  "scroll",
  "touchstart",
  "click",
  "focus",
] as const;

export function ActivityTracker() {
  const { resetActivity } = useActivity();

  useEffect(() => {
    if (typeof window === "undefined") return;

    resetActivity();

    const handleActivity = () => resetActivity();

    TRACKED_EVENTS.forEach((event) => {
      document.addEventListener(event, handleActivity);
    });

    return () => {
      TRACKED_EVENTS.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });

      if ((window as any).__inactivityWarningTimer) {
        clearTimeout((window as any).__inactivityWarningTimer);
      }
      if ((window as any).__inactivityLogoutTimer) {
        clearTimeout((window as any).__inactivityLogoutTimer);
      }
    };
  }, [resetActivity]);

  return null;
}
