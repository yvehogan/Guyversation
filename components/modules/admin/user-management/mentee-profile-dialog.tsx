"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ConfirmRequestDialog, SuccessRequestDialog } from "./request-dialog";
import { BsTwitterX } from "react-icons/bs";
import { LinkIcon } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

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
  email?: string;
};

interface RequestProfileDialogProps {
  request: RequestItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
  onDecline: () => void;
}

export function RequestProfileDialog({
  request,
  open,
  onOpenChange,
  onDecline,
}: RequestProfileDialogProps) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const handleAcceptClick = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmAccept = () => {
    setIsConfirmDialogOpen(false);
    setIsSuccessDialogOpen(true);
  };

  const handleSuccessDialogClose = () => {
    setIsSuccessDialogOpen(false);
    onOpenChange(false);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="right-0 mt-5 mr-8 h-auto max-h-[95vh] w-[90%] overflow-scroll rounded-lg border-0 p-0 px-6 py-4 sm:max-w-md">
          <SheetHeader className="relative border-b pb-10">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="profile image"
                  className="border-3 rounded-full border-secondary-400"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-4xl">{request.name}</SheetTitle>
                <Badge variant="outline" className="mt-1">
                  Mentee
                </Badge>
              </div>
            </div>

            <div className="absolute -bottom-[1px] left-0">
              <div className="relative">
                <span className="text-primary-400 bg-white px-2 relative z-10">
                  Profile
                </span>

                <div className="w-12 h-[1px] bg-primary-400 mt-1"></div>
              </div>
            </div>
          </SheetHeader>
          <div className="space-y-8">
            <div>
              <h3 className="text-base font-medium mb-2">About</h3>
              <p className="text-black font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim adLorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed diam nonummy nibh euismod
                tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
                enim adLorem ipsum dolor sit amet, consectetur adipiscing
              </p>
            </div>

            {/* Profile details content */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium mb-2">Preferred Channel</h3>
                <p className="text-black font-light">Chat, Video call</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Language</h3>
                <p className="text-black font-light">English, French</p>
              </div>
            </div>

            <div>
              <h3 className="text-black font-medium mb-2">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-sm border border-secondary-500 text-teal-600 bg-secondary-800">
                  Boy-Child Advocate
                </span>
                <span className="px-3 py-1 rounded-full text-sm border border-secondary-500 text-teal-600 bg-secondary-800">
                  Therapist
                </span>
                <span className="px-3 py-1 rounded-full text-sm border border-secondary-500 text-teal-600 bg-secondary-800">
                  Tech Executive
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Credentials</h3>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="px-3 py-2 rounded-full text-sm border border-primary-400 text-black bg-primary-200 flex items-center"
                >
                  <LinkIcon className="h-3 w-3 mr-1" />
                  https://www.magnuscarlsen.com
                </a>
                <a
                  href="#"
                  className="px-3 py-2 rounded-full text-sm border border-primary-400 text-black bg-primary-200 flex items-center"
                >
                  <LinkIcon className="h-3 w-3 mr-1" />
                  https://www.carlsenmagnus.com
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Socials</h3>
              <div className="flex gap-2">
                <a href="#" className="flex gap-1 items-center">
                  <FaLinkedinIn className="h-5 w-5 bg-primary-400 text-white p-1 rounded-md" />
                  Magnus
                </a>
                <a href="#" className="flex gap-1 items-center ml-4">
                  <BsTwitterX className="h-5 w-5 bg-primary-400 text-white p-1 rounded-md" />
                  Magnus
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between gap-4">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 border-warning-200 text-warning-200 hover:bg-red-50 hover:text-red-600"
              onClick={onDecline}
            >
              Decline request
            </Button>
            <Button size="lg" className="flex-1" onClick={handleAcceptClick}>
              Accept Request
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Mentorship Confirmation Dialog */}
      <ConfirmRequestDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        onConfirm={handleConfirmAccept}
        email={request.email || ""}
        role={"Mentee"}
      />

      {/* Mentorship Success Dialog */}
      <SuccessRequestDialog
        open={isSuccessDialogOpen}
        onOpenChange={handleSuccessDialogClose}
      />
    </>
  );
}
