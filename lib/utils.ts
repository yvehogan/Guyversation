import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleLogout = async () => {
  try {
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove("GUYVERSATION_USER_ID");
    Cookies.remove("GUYVERSATION_ACCESS_TOKEN");
    Cookies.remove("GUYVERSATION_REFRESH_TOKEN");
    Cookies.remove("GUYVERSATION_USER_TYPE");
  } catch (error) {
    toast.error("Error logging out");
  }
};
