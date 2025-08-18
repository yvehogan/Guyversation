"use client";
import { useState, useEffect } from "react";
import { OverviewCards } from "@/components/modules/mentor-dashboard/overview-cards";
import { RequestNotifications } from "@/components/modules/mentor-dashboard/request-notifications";
import { UpcomingSessions } from "@/components/modules/mentor-dashboard/upcoming-session";
import { RequestProfileDialog } from "@/components/modules/mentor/request-profile-dialog";
import { MenteeRequest, GetMenteeRequestsQuery } from "@/components/queries/mentor/get-mentee-requests";

export default function DashboardPage() {
  const [requests, setRequests] = useState<MenteeRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<MenteeRequest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await GetMenteeRequestsQuery({
        pageNumber: 1,
        pageSize: 1000,
        userId: "",
      });
      if (response.isSuccess && response.data.mentees) {
        setRequests(response.data.mentees);
      }
    };
    fetchRequests();
  }, []);

  const handleViewRequest = (request: MenteeRequest) => {
    setSelectedRequest(request);
    setDialogOpen(true);
  };

  const handleAccept = (id: string) => {
    setDialogOpen(false);
  };

  const handleDecline = (id: string) => {
    setDialogOpen(false);
  };

  return (
    <div className="py- w-full flex flex-col h-screen ">
      <div className="flex flex-col lg:flex-row gap-8 flex-1">
        <div className="lg:w-[70%] space-y-4 flex flex-col">
          <h2 className="text-xl font-medium">Overview</h2>
          <OverviewCards />
          <div className="">
            <RequestNotifications
              requests={requests}
              onViewRequest={handleViewRequest}
              onAccept={handleAccept}
              onDecline={handleDecline}
            />
          </div>
        </div>
        <div className="lg:w-[30%] flex flex-col">
          <UpcomingSessions />
        </div>
      </div>
      {selectedRequest && (
        <RequestProfileDialog
          request={selectedRequest}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
    </div>
  );
}