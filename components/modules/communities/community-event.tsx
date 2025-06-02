"use client";

import { useState } from "react";
import { Clock, Check, Radio } from "lucide-react";
import { LuCalendarDays } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CommunityEventProps {
  event: {
    id: string;
    title: string;
    type: string;
    date: string;
    time: string;
    day: string;
    month: string;
    attendees: number;
    interested: boolean;
  };
}

export function CommunityEvent({ event }: CommunityEventProps) {
  const [interested, setInterested] = useState(event.interested);

  return (
    <div className="flex items-start justify-between mb-8 border-b border-gray-200 pb-4">
  <div className="flex-1">
    <Badge className="bg-secondary-100 text-secondary-400 hover:bg-red-100 mb-2 font-normal">
      <span className="mr-1">
        <Radio className="h-5 w-5" />
      </span>
      {event.type}
    </Badge>
    <h3 className="text-xl font-medium mb-2">{event.title}</h3>

    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
      <div className="flex items-center gap-1">
        <LuCalendarDays className="h-5 w-5" />
        <span className="text-sm">{event.date}</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="h-4 w-4" />
        <span className="text-sm">{event.time}</span>
      </div>
    </div>

    <div className="flex items-center justify-between w-full">
      <Button
        variant="outline"
        className={`rounded-full ${
          interested
            ? "bg-[#AD66E6]/10 border-[#AD66E6] text-[#AD66E6]"
            : "border-[#AD66E6] text-[#AD66E6] hover:bg-[#AD66E6]/10"
        }`}
        onClick={() => setInterested(!interested)}
      >
        {interested ? (
          <>
            <Check className="h-4 w-4 mr-2" /> Interested
          </>
        ) : (
          "Interested"
        )}
      </Button>
    </div>
  </div>
  
<div className="flex flex-col h-full min-h-[120px] ml-4 relative">
  {/* Date at top */}
  <div className="flex-shrink-0 bg-gray-100 rounded-xl p-2 text-center w-14 h-18 flex flex-col justify-center">
    <div className="text-xl font-medium mb-1">{event.day}</div>
    <div className="text-sm text-neutral-100">{event.month}</div>
  </div>
  
  {/* Attendees at bottom */}
  <div className="flex items-center absolute -bottom-5 right-0 whitespace-nowrap">
    <div className="flex -space-x-2 mr-2">
      {[1, 2, 3].map((i) => (
        <Avatar key={i} className="border-2 border-white h-6 w-6">
          <AvatarImage
            src={`/placeholder.svg?height=24&width=24`}
            alt="Attendee"
          />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      ))}
    </div>
    <span className="text-xs text-gray-600">
      {event.attendees} attendees
    </span>
  </div>
</div>
</div>
  );
}
