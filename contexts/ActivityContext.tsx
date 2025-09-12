"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface ActivityContextType {
  resetActivity: () => void;
  logout: () => void;
}

const ActivityContext = createContext<ActivityContextType | null>(null);

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("useActivity must be used within an ActivityProvider");
  }
  return context;
};

const isHomepage = () => {
  if (typeof window === "undefined") return false;
  return (
    window.location.pathname === "/" || window.location.pathname === "/home"
  );
};

interface ActivityProviderProps {
  children: React.ReactNode;
  warningTime?: number;
  logoutTime?: number;
}

export function ActivityProvider({
  children,
  warningTime = 10,
  logoutTime = 15,
}: ActivityProviderProps) {
  const [, setIsOnHomepage] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsOnHomepage(isHomepage());

    const handleRouteChange = () => {
      setIsOnHomepage(isHomepage());
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const logout = useCallback(() => {
    Cookies.remove("GUYVERSATION_USER_ID");
    Cookies.remove("GUYVERSATION_ACCESS_TOKEN");
    Cookies.remove("GUYVERSATION_REFRESH_TOKEN");
    Cookies.remove("GUYVERSATION_USER_TYPE");
    window.location.href = "/";
  }, []);

  const resetActivity = useCallback(() => {
    if (typeof window === "undefined") return;

    if (isHomepage()) {
      const warningTimer = (window as any).__inactivityWarningTimer;
      const logoutTimer = (window as any).__inactivityLogoutTimer;

      if (warningTimer) clearTimeout(warningTimer);
      if (logoutTimer) clearTimeout(logoutTimer);
      return;
    }

    const warningTimer = (window as any).__inactivityWarningTimer;
    const logoutTimer = (window as any).__inactivityLogoutTimer;

    if (warningTimer) clearTimeout(warningTimer);
    if (logoutTimer) clearTimeout(logoutTimer);

    (window as any).__inactivityWarningTimer = setTimeout(
      () => {
        toast.warning(
          "You will be logged out in 5 minutes due to inactivity",
          { autoClose: 5000 },
        );
      },
      warningTime * 60 * 1000,
    );

    (window as any).__inactivityLogoutTimer = setTimeout(
      () => {
        toast.info("You have been logged out due to inactivity");
        logout();
      },
      logoutTime * 60 * 1000,
    );
  }, [warningTime, logoutTime, logout]);

  return (
    <ActivityContext.Provider value={{ resetActivity, logout }}>
      {children}
    </ActivityContext.Provider>
  );
}
