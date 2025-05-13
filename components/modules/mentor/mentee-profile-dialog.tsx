"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type MenteeItem = {
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

interface MenteeProfileDialogProps {
  mentee: MenteeItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
  onSendMessage: () => void;
}

export function MenteeProfileDialog({
  mentee,
  open,
  onOpenChange,
  onSendMessage,
}: MenteeProfileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[450px] overflow-y-auto"
        style={{
          transform: "translateX(100%)",
          marginTop: "0vh",
          marginBottom: "5vh",
          height: "97vh",
        }}
      >
        <DialogHeader className="relative border-b pb-10">
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
              <DialogTitle className="text-4xl">{mentee.name}</DialogTitle>
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
        </DialogHeader>
        <div className="mt-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-base">Age</h3>
              <p className="font-light">{mentee.age}</p>
            </div>
            <div>
              <h3 className="font-medium text-base">Location</h3>
              <p className="font-light">{mentee.location}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-base">Goal</h3>
            <p className="font-light mt-1">{mentee.goal}</p>
          </div>

          <div>
            <h3 className="font-medium text-base">Career Path</h3>
            <p className="font-light mt-1">{mentee.careerPath}</p>
          </div>

          <div>
            <h3 className="font-medium">Interest(s)</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {mentee.interests.map((interest) => (
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
              {mentee.socials.twitter && (
                <div className="flex items-center gap-2">
                  <BsTwitterX className="h-5 w-5 bg-primary-400 text-white p-1 rounded-md" />
                  <span className="font-light">{mentee.socials.twitter}</span>
                </div>
              )}
              {mentee.socials.linkedin && (
                <div className="flex items-center gap-2">
                  <FaLinkedinIn className="h-5 w-5 bg-primary-400 text-white p-1 rounded-md" />
                  <span className="font-light">{mentee.socials.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
           <Button
           variant='outline'
            className="w-full"
            onClick={onSendMessage}
          >
           Send a message
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
