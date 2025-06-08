import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmAndAddUserDialog, SuccessAddUserDialog } from "./confirm-and-add-user-dialog";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUser?: (email: string, role: string) => void;
}

export function AddUserDialog({
  open,
  onOpenChange,
  onAddUser,
}: AddUserDialogProps) {
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleSubmit = () => {
    setError("");

    if (!email || !userRole) {
      setError("Email and role are required.");
      return;
    }

    setShowConfirmDialog(true);
  };

  const handleSuccess = () => {
    setShowSuccessDialog(true);
    
    setEmail("");
    setUserRole("");
    
    onOpenChange(false);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="right-0 mt-5 mr-8 h-auto max-h-[90vh] w-[90%] overflow-scroll rounded-lg border-0 p-0 px-6 py-4 sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-4xl font-medium">
              Add New User
            </SheetTitle>
          </SheetHeader>

          <div className="grid gap-2 py-6">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                {error}
              </div>
            )}
            <div className="grid gap-2 mb-5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2 w-full">
              <Label htmlFor="role">User Role</Label>
              <Select value={userRole} onValueChange={setUserRole}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Select User Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Mentor">Mentor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <SheetFooter className="mt-auto pb-6">
            <Button
              size="lg"
              className="w-full"
              onClick={handleSubmit}
            >
              Add User
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <ConfirmAndAddUserDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onSuccess={handleSuccess}
        email={email}
        role={userRole}
      />

      <SuccessAddUserDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
    </>
  );
}
