import Cookies from "js-cookie";

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isProfileComplete: boolean;
}

export function getUserInfo(): UserInfo {
  const firstName = Cookies.get("GUYVERSATION_USER_FIRSTNAME") || "";
  const lastName = Cookies.get("GUYVERSATION_USER_LASTNAME") || "";
  const email = Cookies.get("GUYVERSATION_USER_EMAIL") || "";
  const role = Cookies.get("GUYVERSATION_USER_TYPE") || "";
  const isProfileComplete = Cookies.get("GUYVERSATION_PROFILE_COMPLETED") === "true";

  return {
    firstName,
    lastName,
    email,
    role,
    isProfileComplete,
  };
}

export function getDisplayName(): string {
  const { firstName, lastName, email } = getUserInfo();
  
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  
  if (email) {
    const emailName = email.split('@')[0];
    return emailName.charAt(0).toUpperCase() + emailName.slice(1);
  }
  
  return "User";
}
