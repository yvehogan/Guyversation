"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { MenteeRequest } from "@/components/queries/mentor/get-mentee-requests";
import Image from "next/image";

interface AcceptRequestDialogProps {
  request?: Partial<MenteeRequest>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function AcceptRequestDialog({
  request,
  open,
  onOpenChange,
  onConfirm,
}: AcceptRequestDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] text-center py-5">
          <Image
            src="/svgs/question.svg"
            width={130}
            height={130}
            alt="Confirm Request"
            className="mx-auto mb-4"
          />

        <DialogTitle className="text-xl font-semibold">
          Are you sure you want to accept this mentorship request?
        </DialogTitle>

        <DialogFooter className="mt-6 flex justify-center gap-4 sm:justify-center">
          <Button
            size='lg'
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="min-w-[170px]"
          >
            Cancel
          </Button>
          <Button
            size='lg'
            onClick={onConfirm}
            className="min-w-[170px]"
          >
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
