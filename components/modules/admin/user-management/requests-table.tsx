import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserInterface } from "./user-table";
import { useState } from "react";
import { RequestProfileDialog } from "./mentee-profile-dialog";

interface RequestsTableProps {
  users: UserInterface[];
  onViewRequest: (user: UserInterface) => void;
}

export function RequestsTable({ users, onViewRequest }: RequestsTableProps) {
  // Add state for dialog control
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null);

  // Handler for view request button
  const handleViewRequest = (user: UserInterface) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  // Handlers for dialog actions
  const handleAccept = () => {
    // Add your accept logic here
    setIsDialogOpen(false);
    // Optionally call the parent handler
    if (selectedUser) onViewRequest(selectedUser);
  };

  const handleDecline = () => {
    // Add your decline logic here
    setIsDialogOpen(false);
  };

  // Convert UserInterface to RequestItem format
  const mapUserToRequest = (user: UserInterface | null) => {
    if (!user) return null;
    
    return {
      id: user.id.toString(),
      name: `${user.firstName} ${user.lastName}` || user.name || "Unknown User", // Ensure name is always a string
      age: 25, // Default or get from user if available
      location: user.location || "",
      time: user.time || "",
      avatar: "https://github.com/shadcn.png",
      goal: "Career advancement", // Default or get from user if available
      careerPath: user.type || "",
      interests: ["Technology", "Mentorship"], // Default or get from user if available
      socials: {
        twitter: "@user",
        linkedin: "user-profile"
      }
    };
  };

  return (
    <>
      <div className="w-full rounded-[20px] bg-white overflow-hidden border border-grey-200">
        <table className="w-full bg-white">
          <thead className="bg-neutral-100 text-white">
            <tr>
              <th className="py-4 px-4 text-left w-12"></th>
              <th className="py-4 px-4 text-left">Name</th>
              <th className="py-4 px-4 text-left">Type</th>
              <th className="py-4 px-4 text-left">Location</th>
              <th className="py-4 px-4 text-left">Time</th>
              <th className="py-4 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={`request-${user.id}`} className="border-b">
                <td className="py-4 px-4">{user.id}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="profile image"
                        className="rounded-full"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4">{user.type}</td>
                <td className="py-4 px-4">{user.location}</td>
                <td className="py-4 px-4">{user.time}</td>
                <td className="py-4 px-4">
                  {user.type !== "Anonymous" ? (
                    <Button
                      variant="outline"
                      className=""
                      onClick={() => handleViewRequest(user)}
                    >
                      View Request
                    </Button>
                  ) : (
                    <Button variant="outline" className="rounded-full">
                      Assign
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render dialog when a user is selected */}
      {selectedUser && (
        <RequestProfileDialog
          request={mapUserToRequest(selectedUser)!}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
    </>
  );
}