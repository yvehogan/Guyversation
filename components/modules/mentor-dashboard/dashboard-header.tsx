"use client"

import { Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { usePathname } from "next/navigation"
import { getUserInfo, getDisplayName } from "@/lib/user-utils"
import { useEffect, useState, useRef } from "react"

export function Appbar() {
  const pathname = usePathname()
  const isCommunitiesPage = pathname?.startsWith("/dashboard/communities")
  const [userName, setUserName] = useState("User")
  const [userRole, setUserRole] = useState("")
  const [userInitials, setUserInitials] = useState("U")
  const [searchTerm, setSearchTerm] = useState("")
  const previousPathnameRef = useRef<string | null>(null);
  
  const getCurrentContext = () => {
    if (!pathname) return null;
    if (pathname?.startsWith("/mentor/communities")) return "mentor-communities"
    if (pathname?.includes("/communities")) return "mentor-communities"
    if (pathname?.includes("/events")) return "mentor-events"
    
    // Add detection for mentors page with mentees/requests tabs
    if (pathname?.includes("/mentors")) {
      // Check URL for active tab - default to mentees
      return pathname?.includes("requests") ? "mentor-requests" : "mentor-mentees"
    }
    
    return null
  }
  
  const getPlaceholderText = () => {
    const context = getCurrentContext()
    if (context === "mentor-communities") return "Search communities..."
    if (context === "mentor-mentees") return "Search mentees..."
    if (context === "mentor-requests") return "Search requests..."
    if (context === "mentor-events") return "Search events..."
    return "Search..."
  }
  
  const handleSearch = (value: string) => {
    const context = getCurrentContext();
    if (context) {
      localStorage.setItem(`search-${context}`, value);
      
      if (value === "") {
        setTimeout(() => {
          const storedValue = localStorage.getItem(`search-${context}`);
          if (storedValue !== "") {
            localStorage.setItem(`search-${context}`, "");
          }
        }, 50);
      }
    }
    setSearchTerm(value);
  }
  
  useEffect(() => {
    const currentContext = getCurrentContext();
    const previousPathname = previousPathnameRef.current;
    
    if (previousPathname && previousPathname !== pathname) {
      const getPreviousContext = (path: string) => {
        if (path?.startsWith("/mentor/communities")) return "mentor-communities";
        if (path?.startsWith("/mentor/mentors")) return "mentor-mentors";
        if (path?.startsWith("/mentor/events")) return "mentor-events";
        return null;
      };
      
      const previousContext = getPreviousContext(previousPathname);
      
      if (previousContext && previousContext !== currentContext) {
      }
    }
    
    if (currentContext) {
      const savedSearch = localStorage.getItem(`search-${currentContext}`) || "";
      setSearchTerm(savedSearch);
    } else {
      setSearchTerm("");
    }
    
    previousPathnameRef.current = pathname;
  }, [pathname]);
  
  useEffect(() => {
    const userInfo = getUserInfo();
    const displayName = getDisplayName();
    
    setUserName(displayName);
    setUserRole(userInfo.role || "Mentor");
    
    if (userInfo.firstName && userInfo.lastName) {
      setUserInitials(`${userInfo.firstName.charAt(0)}${userInfo.lastName.charAt(0)}`.toUpperCase());
    } else if (displayName) {
      const nameParts = displayName.split(' ');
      if (nameParts.length > 1) {
        setUserInitials(`${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase());
      } else {
        setUserInitials(displayName.charAt(0).toUpperCase());
      }
    }
  }, []);

  const shouldShowSearch = getCurrentContext() !== null;

  return (
    <header className={`flex flex-col md:flex-row justify-between w-full items-center gap-x-10 px-5 md:px-10 mt-7 mb-5 ${
      isCommunitiesPage ? 'h-24 md:h-10' : 'h-38 md:h-20'
    }`}>
      {!isCommunitiesPage && (
        <div>
          <h1 className="text-2xl md:text-4xl font-medium tracking-tight">Welcome back, {userName}!</h1>
          <p className="text-neutral-200 mt-2">Let&apos;s see what&apos;s on your plate today.</p>
        </div>
      )}
      
      <div className={`flex items-center gap-4 ${isCommunitiesPage ? "w-full justify-between" : ""}`}>
        {shouldShowSearch && (
          <div className="relative">
            <Search className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder={getPlaceholderText()}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className={`w-full md:min-w-[200px] rounded-full pl-10 bg-white ${
                isCommunitiesPage ? 'md:w-[500px]' : 'md:w-[300px]'
              }`}
            />
          </div>
        )}
        <div className="md:flex items-center gap-2 hidden">
          <Avatar>
            <AvatarImage src="" alt="profile image" />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-base font-medium">{userName}</p>
            <p className="text-xs text-neutral-200">{userRole}</p>
          </div>
        </div>
      </div>
    </header>
  )
}