"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { RequestDetailsDialog } from "./request-details-dialog";
import { AcceptRequestDialog } from "./accept-request-dialog";
import { DeclineRequestDialog } from "./decline-request-dialog";
import { DeclineReasonDialog } from "./decline-reason-dialog";
import { RequestResultDialog } from "./request-result-dialog";

type RequestItem = {
  id: string;
  name: string;
  age: number;
  location: string;
  time: string;
  avatar: string;
  goal: string;
  interests: string[];
  careerPath: string;
  socials: { twitter?: string; linkedin?: string };
};
const requestItems: RequestItem[] = [
  {
    id: "1",
    name: "John Adams",
    age: 14,
    location: "Lagos, Nigeria",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    goal: "Become a software engineer",
    careerPath: "Technology",
    interests: ["Coding", "Gaming"],
    socials: { linkedin: "john adams", twitter: "jane doe" },
  },
  {
    id: "2",
    name: "Jane Doe",
    age: 16,
    location: "Abuja, Nigeria",
    time: "3 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    goal: "Start a tech company",
    careerPath: "Entrepreneurship",
    interests: ["Startups", "Innovation"],
    socials: { linkedin: "john adams", twitter: "jane doe" },
  },
  {
    id: "3",
    name: "Jane Tsesss",
    age: 16,
    location: "Abuja, Nigeria",
    time: "3 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    goal: "Start a tech company",
    careerPath: "Entrepreneurship",
    interests: ["Startups", "Innovation"],
    socials: { linkedin: "john adams", twitter: "jane doe" },
  },
  {
    id: "4",
    name: "Jane Test",
    age: 16,
    location: "Abuja, Nigeria",
    time: "3 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    goal: "Start a tech company",
    careerPath: "Entrepreneurship",
    interests: ["Startups", "Innovation"],
    socials: { linkedin: "john adams", twitter: "jane doe" },
  },
  {
    id: "5",
    name: "Jane Test",
    age: 16,
    location: "Abuja, Nigeria",
    time: "3 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    goal: "Start a tech company",
    careerPath: "Entrepreneurship",
    interests: ["Startups", "Innovation"],
    socials: { linkedin: "john adams", twitter: "jane doe" },
  },
  {
    id: "6",
    name: "Jane Testing",
    age: 16,
    location: "Abuja, Nigeria",
    time: "3 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    goal: "Start a tech company",
    careerPath: "Entrepreneurship",
    interests: ["Startups", "Innovation"],
    socials: { linkedin: "john adams", twitter: "jane doe" },
  }
];

export function RequestNotifications() {
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(
    null
  );
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const [showDeclineReasonDialog, setShowDeclineReasonDialog] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [resultType, setResultType] = useState<"accepted" | "declined">(
    "accepted"
  );
  const [declineReason, setDeclineReason] = useState("");

  const handleViewRequest = (request: RequestItem) => {
    setSelectedRequest(request);
    setShowDetailsDialog(true);
  };

  const handleAcceptRequest = () => {
    setShowDetailsDialog(false);
    setShowAcceptDialog(true);
  };

  const handleDeclineRequest = () => {
    setShowDetailsDialog(false);
    setShowDeclineDialog(true);
  };

  const confirmAccept = () => {
    setShowAcceptDialog(false);
    setResultType("accepted");
    setShowResultDialog(true);
  };

  const confirmDecline = () => {
    setShowDeclineDialog(false);
    setShowDeclineReasonDialog(true);
  };

  const submitDeclineReason = () => {
    setShowDeclineReasonDialog(false);
    setResultType("declined");
    setShowResultDialog(true);
  };

  const closeAllDialogs = () => {
    setShowDetailsDialog(false);
    setShowAcceptDialog(false);
    setShowDeclineDialog(false);
    setShowDeclineReasonDialog(false);
    setShowResultDialog(false);
    setDeclineReason("");
  };

  return (
    <div className="flex flex-col">
      <Card className="flex overflow-hidden flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <h3 className="text-xl font-medium">
              Request Notifications
              <span className="text-sm text-grey-500 mx-2">(7)</span>
            </h3>
          </div>
          <Button variant="link" className="text-primary-400 text-sm">
            See all
          </Button>
        </CardHeader>
        <CardContent className="max-h-[400px] overflow-y-auto pr-2 pt-2">
          <div className="space-y-4">
            {requestItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-[#DADADA] py-3 whitespace-nowrap gap-5 overflow-x-auto"
              >
                <div className="w-1/3 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="profile image"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="font-medium text-sm">{item.name}</p>
                </div>
                <span className="text-neutral-100 text-xs">{item.age}</span>
                <span className="text-neutral-100 text-xs">
                  {item.location}
                </span>
                <span className="text-neutral-100 text-xs">{item.time}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs font-normal"
                  onClick={() => handleViewRequest(item)}
                >
                  View Request
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {selectedRequest && (
        <>
          <RequestDetailsDialog
            request={selectedRequest}
            open={showDetailsDialog}
            onOpenChange={setShowDetailsDialog}
            onAccept={handleAcceptRequest}
            onDecline={handleDeclineRequest}
          />

          <AcceptRequestDialog
            request={selectedRequest}
            open={showAcceptDialog}
            onOpenChange={setShowAcceptDialog}
            onConfirm={confirmAccept}
          />

          <DeclineRequestDialog
            request={selectedRequest}
            open={showDeclineDialog}
            onOpenChange={setShowDeclineDialog}
            onConfirm={confirmDecline}
          />

          <DeclineReasonDialog
            open={showDeclineReasonDialog}
            onOpenChange={setShowDeclineReasonDialog}
            reason={declineReason}
            onReasonChange={setDeclineReason}
            onSubmit={submitDeclineReason}
          />

          <RequestResultDialog
            request={selectedRequest}
            type={resultType}
            open={showResultDialog}
            onOpenChange={setShowResultDialog}
            onClose={closeAllDialogs}
          />
        </>
      )}
    </div>
  );
}
