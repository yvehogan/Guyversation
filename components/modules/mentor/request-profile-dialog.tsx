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
import { MenteeRequest } from "@/components/queries/mentor/get-mentee-requests";

interface RequestProfileDialogProps {
  request: MenteeRequest;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export function RequestProfileDialog({
  request,
  open,
  onOpenChange,
  onAccept,
  onDecline,
}: RequestProfileDialogProps) {
  const formattedDate = request.createdDate 
    ? new Date(request.createdDate).toLocaleDateString() 
    : 'Unknown date';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="right-0 mt-3 mr-3 h-auto max-h-[97vh] w-[95%] overflow-hidden rounded-[20px] border-0 p-0 sm:max-w-md flex flex-col"
      >
        <div className="flex-1 overflow-y-auto px-6 py-4 pb-24">
          <SheetHeader className="relative border-b">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={request.menteeAvatarUrl || "https://github.com/shadcn.png"}
                  alt={request.name || "profile image"}
                  className="border-3 rounded-full border-secondary-400"
                />
                <AvatarFallback>{request.name ? request.name.charAt(0) : "M"}</AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-4xl">{request.name || "Unknown"}</SheetTitle>
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
                <p className="font-light">{request.menteeAge || "Not specified"}</p>
              </div>
              <div>
                <h3 className="font-medium text-base">Location</h3>
                <p className="font-light">{request.menteeLocation || "Not specified"}</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-base">Request Date</h3>
              <p className="font-light mt-1">{formattedDate}</p>
            </div>

            {request.goal && (
              <div>
                <h3 className="font-medium text-base">Goal</h3>
                <p className="font-light mt-1">{request.goal}</p>
              </div>
            )}

            {request.careerPath && (
              <div>
                <h3 className="font-medium text-base">Career Path</h3>
                <p className="font-light mt-1">{request.careerPath}</p>
              </div>
            )}

            {request.interests && request.interests.length > 0 && (
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
            )}

            {request.socials && (
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
            )}
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 bg-white p-6 flex justify-between gap-4">
          <Button
            variant="outline"
            size='lg'
            className="flex-1 border-grey-300 text-warning-200 hover:text-red-600"
            onClick={() => onDecline(request.id)}
          >
            Decline request
          </Button>
          <Button 
            size='lg' 
            className="flex-1" 
            onClick={() => onAccept(request.id)}
          >
            Accept Request
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
