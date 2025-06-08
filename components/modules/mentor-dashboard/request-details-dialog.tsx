"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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

interface RequestDetailsDialogProps {
  request: RequestItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
  onDecline: () => void;
}

export function RequestDetailsDialog({
  request,
  open,
  onOpenChange,
  onAccept,
  onDecline,
}: RequestDetailsDialogProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="right-0 mt-5 mr-8 h-auto max-h-[90vh] w-[90%] overflow-scroll rounded-lg border-0 p-0 px-6 py-4 sm:max-w-md">
        <SheetHeader className="relative border-b">
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
              <SheetTitle className="text-2xl  md:text-4xl">{request.name}</SheetTitle>
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
        <div className="mt-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-base">Age</h3>
              <p className="font-light">{request.age}</p>
            </div>
            <div>
              <h3 className="font-medium text-base">Location</h3>
              <p className="font-light">{request.location}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-base">Goal</h3>
            <p className="font-light mt-1">{request.goal}</p>
          </div>

          <div>
            <h3 className="font-medium text-base">Career Path</h3>
            <p className="font-light mt-1">{request.careerPath}</p>
          </div>

          <div>
            <h3 className="font-medium">Interest(s)</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {request.interests.map((interest) => (
                <Badge
                  key={interest}
                  variant="secondary"
                  className="rounded-full"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium">Socials</h3>
            <div className="mt-2 flex gap-2 items-center">
              {request.socials.twitter && (
                <div className="flex items-center gap-2">
                  <BsTwitterX className="h-5 w-5 bg-primary-400 text-white p-1 rounded-md" />
                  <span className="font-light">{request.socials.twitter}</span>
                </div>
              )}
              {request.socials.linkedin && (
                <div className="flex items-center gap-2">
                  <FaLinkedinIn className="h-5 w-5 bg-primary-400 text-white p-1 rounded-md" />
                  <span className="font-light">{request.socials.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between gap-4">
          <Button
            variant="outline"
            className="flex-1 border-warning-200 text-warning-200 hover:bg-red-50 hover:text-red-600"
            onClick={onDecline}
          >
            Decline request
          </Button>
          <Button className="flex-1 " onClick={onAccept}>
            Accept Request
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
