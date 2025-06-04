import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { InviteUserMutation } from "@/components/queries/admin/invite-user";

// Update the interface to support both new and old prop patterns
interface ConfirmAddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  role: string;
  // Make this optional and add onConfirm as an alternative
  onSuccess?: () => void;
  onConfirm?: () => void;
}

export function ConfirmAddUserDialog({
  open,
  onOpenChange,
  email,
  role,
  onSuccess,
  onConfirm,
}: ConfirmAddUserDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleConfirmClick = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      
      const response = await InviteUserMutation({
        email,
        role,
      });
      
      onOpenChange(false);
      
      if (response.isSuccess) {
        // Support both callback patterns
        if (onSuccess) onSuccess();
        if (onConfirm) onConfirm();
      } else {
        setErrorMessage(response.message || "Failed to invite user");
        setShowErrorDialog(true);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred");
      setShowErrorDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="flex flex-col items-center justify-center py-6">
              <Image
                src="/svgs/question.svg"
                width={130}
                height={130}
                alt="Confirm Request"
                className="mx-auto mb-4"
              />
              <h2 className="text-xl font-bold mb-2 text-center">
                Are you sure you want to add this user?
              </h2>
            </div>
            <div className="bg-purple-50 text-primary-400 px-4 py-2 rounded-md mb-2">
              {email}
            </div>
            <div className="text-purple-600">{role}</div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              size="lg"
              className="min-w-[190px]"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              className="min-w-[190px]" 
              size="lg" 
              onClick={handleConfirmClick}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ErrorDialog 
        open={showErrorDialog} 
        onOpenChange={setShowErrorDialog}
        errorMessage={errorMessage}
      />
    </>
  );
}

export const ConfirmAndAddUserDialog = ConfirmAddUserDialog;

interface SuccessAddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SuccessAddUserDialog({
  open,
  onOpenChange,
}: SuccessAddUserDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center py-6">
          <Image
            src="/svgs/awesome.svg"
            width={150}
            height={150}
            alt="Confirm Request"
            className="mx-auto"
          />
          <DialogTitle className="mt-4 text-4xl font-medium">
              Awesome!
            </DialogTitle>
          <DialogDescription className="text-base mt-1">
            You have just added a new user.
            </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  errorMessage: string;
}

export function ErrorDialog({
  open,
  onOpenChange,
  errorMessage,
}: ErrorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center py-6">
          <Image
            src="/svgs/error.svg"
            width={130}
            height={130}
            alt="Error"
            className="mx-auto mb-4"
          />
          <DialogTitle className="mt-4 text-2xl font-medium text-red-600">
            Error
          </DialogTitle>
          <DialogDescription className="text-base mt-1 text-center">
            {errorMessage}
          </DialogDescription>
        </div>
        <DialogFooter>
          <Button 
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
