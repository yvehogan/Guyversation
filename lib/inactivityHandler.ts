import { useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { handleLogout } from "./utils";

const TRACKED_EVENTS = [
  "mousedown",
  "mousemove",
  "keydown",
  "scroll",
  "touchstart",
  "click",
  "focus",
] as const;

function isHomepage() {
  if (typeof window === "undefined") return false;
  return (
    window.location.pathname === "/"
  );
}

export function useInactivityHandler(warningTime = 5, logoutTime = 10) {
  const resetActivity = useCallback(() => {
    if (typeof window === "undefined") return;

    if (isHomepage()) {
      if ((window as any).__inactivityWarningTimer)
        clearTimeout((window as any).__inactivityWarningTimer);
      if ((window as any).__inactivityLogoutTimer)
        clearTimeout((window as any).__inactivityLogoutTimer);
      return;
    }

    if ((window as any).__inactivityWarningTimer)
      clearTimeout((window as any).__inactivityWarningTimer);
    if ((window as any).__inactivityLogoutTimer)
      clearTimeout((window as any).__inactivityLogoutTimer);

    (window as any).__inactivityWarningTimer = setTimeout(() => {
      toast.warn(
        `You have been inactive for ${warningTime} minute(s). You will be logged out in ${logoutTime - warningTime} minute(s) if no activity is detected.`
      );
    }, warningTime * 60 * 1000);

    (window as any).__inactivityLogoutTimer = setTimeout(() => {
      toast.info("You have been logged out due to inactivity");
      handleLogout();
    }, logoutTime * 60 * 1000);
  }, [warningTime, logoutTime]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    resetActivity();

    const handleActivity = () => resetActivity();

    TRACKED_EVENTS.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      TRACKED_EVENTS.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      if ((window as any).__inactivityWarningTimer)
        clearTimeout((window as any).__inactivityWarningTimer);
      if ((window as any).__inactivityLogoutTimer)
        clearTimeout((window as any).__inactivityLogoutTimer);
    };
  }, [resetActivity]);
}
