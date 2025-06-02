import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

// Confirm Add User Dialog
interface ConfirmAddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  email: string;
  role: string;
}

export function ConfirmAddUserDialog({
  open,
  onOpenChange,
  onConfirm,
  email,
  role,
}: ConfirmAddUserDialogProps) {
  return (
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
          >
            Cancel
          </Button>
          <Button className="min-w-[190px]" size="lg" onClick={onConfirm}>
            Add User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Success Add User Dialog
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
