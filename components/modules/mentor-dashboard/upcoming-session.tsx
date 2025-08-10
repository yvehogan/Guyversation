"use client";

import { useEffect, useState } from "react";
import { MoreVertical, Radio } from "lucide-react";
import { FaCalendar } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GetUpcomingSessionsQuery, UpcomingSession } from "@/components/queries/mentor/get-upcoming-sessions";
import { GetPersonalDetailsQuery } from "@/components/queries/users/get-personal-details";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JournalDialog } from "./write-journal";

type SessionItem = {
  id: string;
  name: string;
  date: string;
  time: string;
  avatar: string;
};

const sessionItems: SessionItem[] = [
  {
    id: "1",
    name: "David",
    date: "Wed, 20 Apr",
    time: "11 AM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "David",
    date: "Wed, 03 Apr",
    time: "11 AM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "David",
    date: "Wed, 20 Apr",
    time: "11 AM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "David",
    date: "Wed, 20 Apr",
    time: "11 AM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Michael",
    date: "Thu, 21 Apr",
    time: "2 PM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Sarah",
    date: "Fri, 22 Apr",
    time: "10 AM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "James",
    date: "Mon, 25 Apr",
    time: "3 PM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    name: "Emma",
    date: "Tue, 26 Apr",
    time: "1 PM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export function UpcomingSessions() {
  const [sessions, setSessions] = useState<UpcomingSession[]>([]);
  const [meetingLink, setMeetingLink] = useState<string>("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [journalReason, setJournalReason] = useState("");

  useEffect(() => {
    (async () => {
      const sessionRes = await GetUpcomingSessionsQuery();
      if (sessionRes.isSuccess && sessionRes.data) {
        setSessions(sessionRes.data);
      }
      const meRes = await GetPersonalDetailsQuery();
      if (meRes.isSuccess && meRes.data?.meetingLink) {
        setMeetingLink(meRes.data.meetingLink);
      }
    })();
  }, []);

  const handleJournalSubmit = () => {
    setIsJournalOpen(false);
    setJournalReason("");
  };

  const radioColorSchemes = [
    { bg: "bg-purple-100", icon: "text-purple-700" },
    { bg: "bg-red-100", icon: "text-red-500" },
    { bg: "bg-green-100", icon: "text-green-500" },
    { bg: "bg-blue-100", icon: "text-blue-500" },
    { bg: "bg-amber-100", icon: "text-amber-500" },
    { bg: "bg-purple-100", icon: "text-purple-500" },
    { bg: "bg-teal-100", icon: "text-teal-500" },
    { bg: "bg-pink-100", icon: "text-pink-500" },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-medium">
          Upcoming Sessions{" "}
          <span className="text-sm text-grey-500">({sessions.length})</span>
        </h3>
        <Button variant="link" className="text-primary-400 text-sm">
          See all
        </Button>
      </div>
      <Card className="flex- flex flex-col overflow-hidden">
        <CardContent className="h-screen md:max-h-[620px] overflow-y-auto pr-2 pt-2 pb-40 md:pb-24">
          <div className="space-y-6">
            {sessions.map((item, index) => {
              const colorScheme =
                radioColorSchemes[index % radioColorSchemes.length];
              const sessionDate = new Date(item.sessionDate);
              const dateStr = sessionDate.toLocaleDateString(undefined, {
                weekday: "short",
                day: "2-digit",
                month: "short",
              });
              const timeStr = sessionDate.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <div key={item.id} className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div
                        className={`mt-3 flex h-8 w-8 items-center justify-center rounded-lg ${colorScheme.bg}`}
                      >
                        <Radio className={`h-5 w-5 ${colorScheme.icon}`} />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-100">
                          {item.title}
                        </p>
                        <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <FaCalendar className="h-4 w-4 text-neutral-200" />
                            <span className="text-xs">{dateStr}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaClock className="h-4 w-4 text-neutral-200" />
                            <span className="text-xs">{timeStr}</span>
                          </div>
                        </div>
                        <a
                          href={meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 font-normal text-xs"
                          >
                            Join meeting
                          </Button>
                        </a>
                      </div>
                    </div>
                    {/* <DropdownMenu
                      open={activeDropdown === item.id}
                      onOpenChange={(open) =>
                        setActiveDropdown(open ? item.id : null)
                      }
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-12 w-12 border-none focus:bg-primary-200 hover:bg-primary-200/80 active:bg-primary-200 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus:outline-none"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px] p-4 space-y-2">
                        <DropdownMenuItem className="flex items-center gap-2 text-primary-400 bg-primary-200 py-4">
                          <IoMdRefresh className="h-4 w-4 text-primary-400" />
                          <span>Reschedule Session</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 text-warning-200 py-4">
                          <FaTimes className="h-4 w-4 text-warning-200" />
                          <span>Cancel Session</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu> */}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <JournalDialog
        open={isJournalOpen}
        onOpenChange={setIsJournalOpen}
        reason={journalReason}
        onReasonChange={setJournalReason}
        onSubmit={handleJournalSubmit}
      />
    </div>
  );
}
