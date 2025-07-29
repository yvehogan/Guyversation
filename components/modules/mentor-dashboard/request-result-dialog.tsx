"use client";

import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";

type RequestItem = {
  id: string;
  name: string;
  age: number;
  location: string;
  time: string;
  avatar: string;
  goal: string;
  careerPath: string;
  interests: string[];
  socials: {
    twitter?: string;
    linkedin?: string;
  };
};

interface RequestResultDialogProps {
  request: RequestItem;
  type: "accepted" | "declined";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

export function RequestResultDialog({
  request,
  type,
  open,
  onOpenChange,
  onClose,
}: RequestResultDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] text-center py-16">
        <DialogClose className="absolute right-4 top-4" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        {type === "accepted" ? (
          <>
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
            <DialogDescription className="text-base">
              You now have <span className="font-medium">{request.name}</span>{" "}
              as a mentee
            </DialogDescription>
          </>
        ) : (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF2F0]">
              <Image
                src="/svgs/request_denied.svg"
                width={130}
                height={130}
                alt="Decline Request"
                className="mx-auto mb-4"
              />
            </div>
            <DialogTitle className="mt-4 text-3xl font-medium">
              Request declined
            </DialogTitle>
            <DialogDescription className="mt-2 text-base">
              You declined to have{""}
              <span className="font-medium">{request.name}</span> as a mentee.
            </DialogDescription>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
