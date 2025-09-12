"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { StartChatQuery } from "@/components/queries/chat/start-chat";
import { toast } from "react-toastify";
import { useState } from "react";

type MenteeItem = {
  id: string;
  menteeUserId?: string;
  firstName: string;
  lastName: string;
  age: number | string;
  location: string;
  time?: string;
  avatar?: string;
  goal?: string;
  careerPath?: string;
  interests?: { id: string; name: string }[];
  socialMedia?: {
    id: string;
    handle: string;
    url?: string;
    socialMediaType?: number;
  }[];
  educations?: { id: string; status: number; fieldOfStudy: string }[];
  summary?: string;
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
  const [isStartingChat, setIsStartingChat] = useState(false);

  const handleSendMessage = async () => {
    setIsStartingChat(true);
    try {
      const response = await StartChatQuery({
        peerUserId: mentee.menteeUserId || mentee.id,
      });

      if (response.isSuccess) {
        onOpenChange(false);
        onSendMessage();
      } else {
        toast.error(response.message || "Failed to start chat");
      }
    } catch (error) {
      toast.error("Failed to start chat");
      console.error("Chat initialization error:", error);
    } finally {
      setIsStartingChat(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="right-0 mt-3 mr-3 md:mr-5 h-auto max-h-[97vh] w-[95%] overflow-hidden rounded-lg border-0 p-0 px-6 py-4 sm:max-w-md flex flex-col">
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
              <SheetTitle className="text-2xl md:text-3xl">
                {mentee.firstName} {mentee.lastName}
              </SheetTitle>
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
        <div className="flex-1 overflow-y-auto mt-4 space-y-6">
          {mentee.summary && (
            <div>
              <h3 className="font-medium text-base">Summary</h3>
              <p className="font-light mt-1">{mentee.summary}</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-base">Age</h3>
              <p className="font-light">{mentee?.age}</p>
            </div>
            <div>
              <h3 className="font-medium text-base">Location</h3>
              <p className="font-light">{mentee?.location}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-base">Goal</h3>
            <p className="font-light mt-1">{mentee?.goal}</p>
          </div>

          <div>
            {Array.isArray(mentee.educations) &&
              mentee.educations.length > 0 && (
                <div>
                  <h3 className="font-medium text-base">Education</h3>
                  <ul className="mt-1 list-disc">
                    {mentee.educations.map((edu) => (
                      <li key={edu.id} className="font-light">
                        {edu.fieldOfStudy}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          <div>
            <h3 className="font-medium">Interest(s)</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {Array.isArray(mentee?.interests)
                ? mentee.interests.map((interest: any) => (
                    <Badge
                      key={interest.id || interest.name}
                      variant="secondary"
                      className="rounded-full"
                    >
                      {interest.name || interest}
                    </Badge>
                  ))
                : null}
            </div>
          </div>

          <div>
            <h3 className="font-medium">Socials</h3>
            <div className="mt-2 flex gap-2 items-center">
              {Array.isArray(mentee?.socialMedia)
                ? mentee.socialMedia.map((social: any) => (
                    <div
                      className="flex items-center gap-2"
                      key={social.id || social.handle}
                    >
                      <span className="font-light">{social.handle}</span>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 bg-white p-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleSendMessage}
            disabled={isStartingChat}
          >
            {isStartingChat ? "Loading..." : "Send a message"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
