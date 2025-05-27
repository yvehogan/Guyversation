import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface UserManagementHeaderProps {
  onAddUser: () => void;
}

export function UserManagementHeader({ onAddUser }: UserManagementHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8 border-b border-grey-300 pb-2">
      <h1 className="text-2xl md:text-[36px] font-medium">User Management</h1>
      <Button onClick={onAddUser} className="">
        <Plus className="h-4 w-4" />
        Add New User
      </Button>
    </div>
  );
}