import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="sm:max-w-[450px] flex flex-col overflow-y-auto w-full"
          style={{
            height: "calc(100vh - 2rem)",
            maxHeight: "100vh",
            width: "100vw",
            top: "98%",
            left: "98%",
            transform: "translate(-50%, -50%)",
            position: "fixed",
            margin: 0,
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-4xl font-medium">
              Add New User
            </DialogTitle>
          </DialogHeader>

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

          <DialogFooter className="mt-auto pb-6">
            <Button
              size="lg"
              className="w-full"
              onClick={handleSubmit}
            >
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
