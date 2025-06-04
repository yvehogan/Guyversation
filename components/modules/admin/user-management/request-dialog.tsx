import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

interface MentorRequestConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  email?: string;
  role?: string;
}

export function ConfirmRequestDialog({
  open,
  onOpenChange,
  onConfirm,
  email = "",
  role = "",
}: MentorRequestConfirmDialogProps) {
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
              Are you sure you want to accept this mentorship request?
            </h2>
          </div>
          {email && (
            <div className="bg-purple-50 text-primary-400 px-4 py-2 rounded-md mb-2">
              {email}
            </div>
          )}
          {role && <div className="text-purple-600">{role}</div>}
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
              Awesome!
            </DialogTitle>
          <DialogDescription className="text-base mt-1">
            You have just accepted a mentorship request.
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}
