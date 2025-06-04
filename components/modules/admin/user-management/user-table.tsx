import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect, useRef } from "react";

export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  userTypeName: string;
  status: string;
  image?: string;
  email?: string;
}

interface UsersTableProps {
  users: UserInterface[];
  onViewProfile: (user: UserInterface) => void;
  onRevokeAccess: (user: UserInterface) => void;
}

export function UsersTable({ 
  users, 
  onViewProfile, 
  onRevokeAccess 
}: UsersTableProps) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (tableRef.current) {
        const { scrollWidth, clientWidth } = tableRef.current;
        setShowScrollIndicator(scrollWidth > clientWidth);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleScroll = () => {
    if (tableRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tableRef.current;
      setShowScrollIndicator(scrollLeft + clientWidth < scrollWidth);
    }
  };

  return (
    <div className="w-full rounded-[20px] bg-white overflow-hidden border border-grey-200 relative">
      <div className="px-4 py-2 text-xs text-neutral-500 italic bg-neutral-50 md:hidden">
        Swipe horizontally to view all columns
      </div>
      
      <div 
        ref={tableRef}
        className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-neutral-300"
        onScroll={handleScroll}
      >
        <table className="w-full min-w-[800px] bg-white">
          <thead className="bg-neutral-100 text-white">
            <tr>
              <th className="py-4 px-4 text-left w-12">#</th>
              <th className="py-4 px-4 text-left">Name</th>
              <th className="py-4 px-4 text-left">Type</th>
              <th className="py-4 px-4 text-left">Status</th>
              <th className="py-4 px-4 text-left"></th>
              <th className="py-4 px-4 text-left w-12"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="border-b">
                <td className="py-4 px-4">{index + 1}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={user.image || "https://github.com/shadcn.png"}
                        alt="profile image"
                        className="rounded-full"
                      />
                      <AvatarFallback>
                        {user.firstName?.charAt(0) || "?"}
                        {user.lastName?.charAt(0) || ""}
                      </AvatarFallback>
                    </Avatar>
                    <span>{`${user.firstName} ${user.lastName}`}</span>
                  </div>
                </td>
                <td className="py-4 px-4">{user.userTypeName}</td>
                <td className="py-4 px-4">
                  {user.status !== "-" && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  )}
                  {user.status === "-" && "-"}
                </td>
                <td className="py-4 px-4">
                  <Button
                    variant="outline"
                    className=""
                    onClick={() => onViewProfile(user)}
                  >
                    View Profile
                  </Button>
                </td>
                <td className="py-4 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => onRevokeAccess(user)}
                      >
                        Revoke access
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Scroll indicator */}
      {showScrollIndicator && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-400 rounded-full p-1 animate-pulse shadow-md">
          <ChevronRight className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  );
}