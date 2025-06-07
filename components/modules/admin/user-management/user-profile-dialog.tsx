import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UserDetails } from "@/components/queries/users/get-user-details";
import ProfileHeader from "./user-profile-dialog/profile-header";
import ProfileTab from "./user-profile-dialog/profile-tab";
import SessionsTab from "./user-profile-dialog/sessions-tab";
import StatsTab from "./user-profile-dialog/stats-tab";
import ReviewTab from "./user-profile-dialog/review-tab";
import EventsTab from "./user-profile-dialog/events-tab";

interface UserProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserDetails | null;
  isRequest?: boolean;
  onAcceptRequest?: () => void;
}

export function UserProfileDialog({
  open,
  onOpenChange,
  user,
}: UserProfileDialogProps) {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[550px] flex flex-col overflow-y-auto max-h-[85vh] w-[90vw]"
        style={{
          position: "absolute",
          top: "95%",
          left: "98%",
          transform: "translate(-50%, -50%)",
          margin: "20px 0",
          maxHeight: "calc(100vh - 40px)"
        }}
      >
        <div className="pb-6">
          <ProfileHeader user={user} />

          <div className="border-b mb-6 overflow-x-auto">
            <div className="flex space-x-6 sm:space-x-8 min-w-max">
              <button
                className={`pb-2 px-1 ${
                  activeTab === "profile"
                    ? "text-primary-400 border-b-2 border-primary-400"
                    : "text-neutral-100"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
              <button
                className={`pb-2 px-1 ${
                  activeTab === "sessions"
                    ? "text-primary-400 border-b-2 border-primary-400"
                    : "text-neutral-100"
                }`}
                onClick={() => setActiveTab("sessions")}
              >
                Sessions
              </button>
              <button
                className={`pb-2 px-1 ${
                  activeTab === "stats"
                    ? "text-primary-400 border-b-2 border-primary-400"
                    : "text-neutral-100"
                }`}
                onClick={() => setActiveTab("stats")}
              >
                Stats
              </button>
              <button
                className={`pb-2 px-1 ${
                  activeTab === "review"
                    ? "text-primary-400 border-b-2 border-primary-400"
                    : "text-neutral-100"
                }`}
                onClick={() => setActiveTab("review")}
              >
                Review
              </button>
              <button
                className={`pb-2 px-1 ${
                  activeTab === "events"
                    ? "text-primary-400 border-b-2 border-primary-400"
                    : "text-neutral-100"
                }`}
                onClick={() => setActiveTab("events")}
              >
                Events
              </button>
            </div>
          </div>

          {activeTab === "profile" && <ProfileTab user={user} />}
          {activeTab === "sessions" && <SessionsTab user={user} />}
          {activeTab === "stats" && <StatsTab />}
          {activeTab === "review" && <ReviewTab />}
          {activeTab === "events" && <EventsTab open={open} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
