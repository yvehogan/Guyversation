import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ConfirmRevokeAccessDialog, SuccessRevokeAccessDialog } from "./revoke-access-dialog";
import { RevokeUserAccessMutation } from "@/components/queries/admin/revoke-user-access";
import { GetUserDetailsQuery, UserDetails } from "@/components/queries/users/get-user-details";

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
  onViewProfile: (user: UserDetails) => void; // Changed to accept UserDetails
  onRevokeAccess: (user: UserInterface) => void;
}

export function UsersTable({
  users,
  onViewProfile,
  onRevokeAccess,
}: UsersTableProps) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const [userToRevoke, setUserToRevoke] = useState<UserInterface | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isRevoking, setIsRevoking] = useState(false);
  const [revokedUser, setRevokedUser] = useState<UserInterface | null>(null);
  const [loadingProfileId, setLoadingProfileId] = useState<string | null>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (tableRef.current) {
        const { scrollWidth, clientWidth } = tableRef.current;
        setShowScrollIndicator(scrollWidth > clientWidth);
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (openDropdownId && !((event.target as HTMLElement).closest('.dropdown-container'))) {
        setOpenDropdownId(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownId]);

  const handleScroll = () => {
    if (tableRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tableRef.current;
      setShowScrollIndicator(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const handleViewProfile = async (user: UserInterface) => {
    try {
      setLoadingProfileId(user.id);
      const response = await GetUserDetailsQuery(user.id);
      
      if (!response.isSuccess) {
        console.error("Failed to fetch user details:", response.message);
        return;
      }
      
      if (response.data) {
        onViewProfile(response.data);
      } else {
        console.error("No user details data available");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoadingProfileId(null);
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
                      {user.image ? (
                        <AvatarImage
                          src={user.image}
                          alt={`${user.firstName} ${user.lastName}`}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="Default profile"
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      )}
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
                    onClick={() => handleViewProfile(user)}
                    disabled={loadingProfileId === user.id}
                  >
                    {loadingProfileId === user.id ? "Loading..." : "View Profile"}
                  </Button>
                </td>
                <td className="py-4 px-4">
                  <div className="dropdown-container relative">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 p-0 hover:bg-neutral-100 transition-colors"
                      onClick={() => {
                        setOpenDropdownId(prev => prev === user.id ? null : user.id);
                      }}
                    >
                      <MoreVertical className="h-5 w-5" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                    
                    {openDropdownId === user.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white z-[1000]">
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => {
                              setOpenDropdownId(null);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                            role="menuitem"
                            onClick={() => {
                              setUserToRevoke(user);
                              setOpenDropdownId(null);
                            }}
                          >
                          Revoke access
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
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

      {/* Revoke Access Modal */}
      <ConfirmRevokeAccessDialog
        open={!!userToRevoke}
        onOpenChange={(open) => {
          if (!open) setUserToRevoke(null);
        }}
        onConfirm={async () => {
          if (userToRevoke) {
            try {
              setIsRevoking(true);
              const response = await RevokeUserAccessMutation({
                userId: userToRevoke.id,
              });
              
              if (!response.isSuccess) {
                throw new Error(response.message || 'Failed to revoke access');
              }
              setRevokedUser(userToRevoke);
              onRevokeAccess(userToRevoke);
              setShowSuccess(true);
            } catch (error) {
              console.error('Error revoking access:', error);
            } finally {
              setIsRevoking(false);
              setUserToRevoke(null);
            }
          }
        }}
        isLoading={isRevoking}
      />

      {/* Success Modal */}
      <SuccessRevokeAccessDialog
        open={showSuccess}
        onOpenChange={setShowSuccess}
        user={revokedUser}
      />
    </div>
  );
}