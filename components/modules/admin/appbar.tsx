"use client"

import { Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { usePathname } from "next/navigation"
import { getUserInfo, getDisplayName } from "@/lib/user-utils"
import { useEffect, useState, useRef } from "react"

export function Appbar() {
  const pathname = usePathname()
  const isDashboardPage = pathname === "/admin/dashboard"
  
  const [userName, setUserName] = useState("User")
  const [userRole, setUserRole] = useState("")
  const [userInitials, setUserInitials] = useState("U")
  const [searchTerm, setSearchTerm] = useState("")
  const previousPathnameRef = useRef<string | null>(null);
  
  const getCurrentContext = () => {
    if (!pathname) return null;
    if (pathname.includes("/user-management")) return "users"
    if (pathname.includes("/community")) return "communities"
    if (pathname.includes("/event-management")) return "events"
    return null
  }
  
  const getPlaceholderText = () => {
    const context = getCurrentContext()
    if (context === "users") return "Search users..."
    if (context === "communities") return "Search communities..."
    if (context === "events") return "Search events..."
    return "Search..."
  }
  
  const handleSearch = (value: string) => {
    const context = getCurrentContext();
    if (context) {
      if (value) {
        localStorage.setItem(`search-${context}`, value);
      } else {
        localStorage.removeItem(`search-${context}`);
      }
    }
    setSearchTerm(value);
  }
  
  useEffect(() => {
    const currentContext = getCurrentContext();
    const previousPathname = previousPathnameRef.current;
    
    if (previousPathname && previousPathname !== pathname) {
      const getPreviousContext = (path: string) => {
        if (path.includes("/user-management")) return "users";
        if (path.includes("/community")) return "communities";
        if (path.includes("/event-management")) return "events";
        return null;
      };
      
      const previousContext = getPreviousContext(previousPathname);
      
      if (previousContext && previousContext !== currentContext) {
        localStorage.removeItem(`search-${previousContext}`);
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
    setUserRole(userInfo.role || "User");
    
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
  
  const shouldShowSearch = getCurrentContext() !== null && !isDashboardPage;
  
  return (
    <header className={`w-full px-4 sm:px-6 md:px-10 mt-7 mb-4 ${
      isDashboardPage ? 'h-auto' : 'h-auto md:h-10'
    }`}>
      {isDashboardPage && (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-10">
          <div className="flex flex-col text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-medium tracking-tight">Welcome back, {userName}!</h1>
            <p className="text-neutral-200 mt-2">Let&apos;s see what&apos;s on your plate today.</p>
          </div>
          
          {/* <div className=" md:flex items-center gap-4">
            <div className=" md:flex items-center gap-2">
              <Avatar>
                <AvatarImage src="" alt="profile image" />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-base font-medium">{userName}</p>
                <p className="text-xs text-neutral-200">{userRole}</p>
              </div>
            </div>
          </div> */}
        </div>
      )}
      
      {!isDashboardPage && (
        <div className="flex flex-col-reverse md:flex-row items-center gap-4 w-full justify-between">
          {shouldShowSearch && (
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder={getPlaceholderText()}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-full pl-10 bg-white md:w-[500px] min-w-0"
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="" alt="profile image" />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div className=" md:block">
              <p className="text-base font-medium">{userName}</p>
              <p className="text-xs text-neutral-200">{userRole}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}