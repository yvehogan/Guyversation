
export const getInitials = (value?: string) => {
    if (!value) return "";
    return value
      .split(" ")
      .map((word) => word.substring(0, 1))
      .join("");
  };
  
  export const normalize = (path: string): string => {
    if (!path) return "";
    if (path.length <= 3) return path;
  
    let firstPart = "";
    let secondPart = "";
    let partCount = 0;
    const start = path.startsWith("/") ? 1 : 0;
  
    for (let i = start; i < path.length; i++) {
      if (path[i] === "/") {
        if (partCount === 0 && firstPart) {
          partCount++;
          continue;
        }
        if (partCount === 1 && secondPart) {
          break;
        }
        continue;
      }
  
      if (partCount === 0) {
        firstPart += path[i];
      } else if (partCount === 1) {
        secondPart += path[i];
      }
    }
  
    if (!firstPart) return "";
    if (!secondPart) return `/${firstPart}`;
    return `/${firstPart}/${secondPart}`;
  };
  
  export const getPastDuration = (date: Date | string) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  };
  
  export const copyContent = (data: string, callback?: () => void) => {
    window.navigator.clipboard.writeText(data).then(() => {
      callback?.();
    });
  };