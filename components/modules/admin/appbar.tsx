"use client"

import { Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { usePathname } from "next/navigation"
import { getUserInfo, getDisplayName } from "@/lib/user-utils"
import { useEffect, useState } from "react"

export function Appbar() {
  const pathname = usePathname()
  const isDashboardPage = pathname === "/admin/dashboard"
  const [userName, setUserName] = useState("User")
  const [userRole, setUserRole] = useState("")
  const [userInitials, setUserInitials] = useState("U")
  
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
  
  return (
    <header className={`w-full px-4 sm:px-6 md:px-10 mt-7 mb-4 ${
      isDashboardPage ? 'h-auto' : 'h-auto md:h-10'
    }`}>
      {isDashboardPage && (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-10">
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-4xl font-medium tracking-tight">Welcome back, {userName}!</h1>
            <p className="text-neutral-200 mt-2">Let&apos;s see what&apos;s on your plate today.</p>
          </div>
          
          <div className="w-full md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search" 
                className="w-full rounded-full pl-10 bg-white"
              />
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search" 
                className={`w-full min-w-[200px] rounded-full pl-10 bg-white md:w-[300px]`}
              />
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Avatar>
                <AvatarImage src="" alt="profile image" />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-base font-medium">{userName}</p>
                <p className="text-xs text-neutral-200">{userRole}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!isDashboardPage && (
        <div className="flex items-center gap-4 w-full justify-between">
          <div className="relative">
            <Search className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search" 
              className="w-full min-w-[200px] rounded-full pl-10 bg-white md:w-[500px]"
            />
          </div>
          <div className="flex items-center gap-2">
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
      )}
    </header>
  )
}