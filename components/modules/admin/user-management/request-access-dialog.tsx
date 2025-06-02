import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import Image from "next/image";
import { UserInterface } from "./user-table";

interface ConfirmRevokeAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ConfirmRevokeAccessDialog({
  open,
  onOpenChange,
  onConfirm
}: ConfirmRevokeAccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center py-6">
          <Image
            src="/svgs/question.svg"
            width={130}
            height={130}
            alt="Confirm Request"
            className="mx-auto mb-4"
          />
          <h2 className="text-xl font-bold mb-2 text-center">
            Are you sure you want to revoke access?
          </h2>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-warning-200 hover:bg-red-700 text-white"
            onClick={onConfirm}
            size="lg"
          >
            Revoke access
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface SuccessRevokeAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserInterface | null;
}

export function SuccessRevokeAccessDialog({
  open,
  onOpenChange,
  user
}: SuccessRevokeAccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center py-6">
          <Image
            src="/svgs/request_denied.svg"
            width={130}
            height={130}
            alt="Decline Request"
            className="mx-auto mb-4"
          />
          <h2 className="text-[36px] font-medium mb-2">Access Revoked</h2>
          <p className="text-neutral-200">
            You revoked <span className="font-medium">
              {user?.firstName || user?.name?.split(" ")[0] || "User"}{" "}
              {user?.lastName || user?.name?.split(" ")[1] || ""}
            </span> access.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}