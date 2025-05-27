import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface UserInterface {
  id: string; // Updated to match the
  firstName: string;
  lastName: string;
  type: "Mentee" | "Mentor" | "School" | "Anonymous" | "-"; // Mapped from userType
  status: "Active" | "Pending" | "-"; // Add logic to derive this if needed
  location?: string; // Optional, as it's not in the API response
  time?: string; // Optional, as it's not in the API response
  image?: string; // Mapped from profilePictureUrl
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
  return (
    <div className="w-full rounded-[20px] bg-white overflow-hidden border border-grey-200">
      <table className="w-full bg-white">
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
              <td className="py-4 px-4">{user.type}</td>
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
  );
}