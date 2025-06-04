"use client"

import { Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { usePathname } from "next/navigation"
import { getUserInfo, getDisplayName } from "@/lib/user-utils"
import { useEffect, useState } from "react"

export function Appbar() {
  const pathname = usePathname()
  const isCommunitiesPage = pathname?.startsWith("/dashboard/communities")
  const [userName, setUserName] = useState("User")
  const [userRole, setUserRole] = useState("")
  const [userInitials, setUserInitials] = useState("U")
  
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

  return (
    <header className={`flex justify-between w-full items-center gap-x-10 px-10 mt-7 ${
      isCommunitiesPage ? 'h-24 md:h-10' : 'h-38 md:h-20'
    }`}>
      {!isCommunitiesPage && (
        <div>
          <h1 className="text-4xl font-medium tracking-tight">Welcome back, {userName}!</h1>
          <p className="text-neutral-200 mt-2">Let&apos;s see what&apos;s on your plate today.</p>
        </div>
      )}
      
      <div className={`flex items-center gap-4 ${isCommunitiesPage ? "w-full justify-between" : ""}`}>
        <div className="relative">
          <Search className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search" 
            className={`w-full min-w-[200px] rounded-full pl-10 bg-white ${
              isCommunitiesPage ? 'md:w-[500px]' : 'md:w-[300px]'
            }`}
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
    </header>
  )
}