import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

interface ConfirmRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ConfirmRequestDialog({
  open,
  onOpenChange,
  onConfirm,
}: ConfirmRequestDialogProps) {
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
            Are you sure you want to add this user?
          </h2>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size='lg'
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
          size='lg'
            className="flex-1"
            onClick={onConfirm}
          >
            Accept Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface SuccessRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SuccessRequestDialog({
  open,
  onOpenChange,
}: SuccessRequestDialogProps) {
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
              Request Accepted
            </DialogTitle>
        </div>
      </DialogContent>
    </Dialog>
  );
}
