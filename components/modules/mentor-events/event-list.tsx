"use client";

import { useState } from "react";
import { PiMapPinFill } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type EventType = "all" | "workshop" | "webinar" | "fireside";

interface Event {
  id: string;
  title: string;
  type: Exclude<EventType, "all">;
  date: {
    month: string;
    day: string;
  };
  time: string;
  location: string;
  attendees: {
    count: number;
    avatars: string[];
  };
}

const events: Event[] = [
  {
    id: "1",
    title: "2025 Boys International Summit",
    type: "workshop",
    date: {
      month: "JUN",
      day: "13",
    },
    time: "7:00 PM",
    location: "Landmark Event Center",
    attendees: {
      count: 245,
      avatars: [
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
      ],
    },
  },
  {
    id: "2",
    title: "2025 Boys International Summit",
    type: "workshop",
    date: {
      month: "JUN",
      day: "13",
    },
    time: "7:00 PM",
    location: "Landmark Event Center",
    attendees: {
      count: 245,
      avatars: [
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
      ],
    },
  },
  {
    id: "3",
    title: "2025 Boys International Summit",
    type: "workshop",
    date: {
      month: "JUN",
      day: "13",
    },
    time: "7:00 PM",
    location: "Landmark Event Center",
    attendees: {
      count: 245,
      avatars: [
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
      ],
    },
  },
  {
    id: "4",
    title: "2025 Boys International Summit",
    type: "workshop",
    date: {
      month: "JUN",
      day: "13",
    },
    time: "7:00 PM",
    location: "Landmark Event Center",
    attendees: {
      count: 245,
      avatars: [
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
      ],
    },
  },
  {
    id: "5",
    title: "2025 Boys International Summit",
    type: "workshop",
    date: {
      month: "JUN",
      day: "13",
    },
    time: "7:00 PM",
    location: "Landmark Event Center",
    attendees: {
      count: 245,
      avatars: [
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
      ],
    },
  },
  {
    id: "6",
    title: "2025 Boys International Summit",
    type: "workshop",
    date: {
      month: "JUN",
      day: "13",
    },
    time: "7:00 PM",
    location: "Landmark Event Center",
    attendees: {
      count: 245,
      avatars: [
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
      ],
    },
  },
  {
    id: "7",
    title: "2025 Boys child Summit",
    type: "workshop",
    date: {
      month: "JUN",
      day: "13",
    },
    time: "7:00 PM",
    location: "Landmark Event Center",
    attendees: {
      count: 245,
      avatars: [
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
      ],
    },
  },
];

export function EventsList() {
  const [activeTab, setActiveTab] = useState<EventType>("all");

  const filteredEvents =
    activeTab === "all"
      ? events
      : events.filter((event) => event.type === activeTab);

  const totalEvents = filteredEvents.length;

  return (
    <div className="bg-white rounded-[30px] p-4 h-full overflow-y-auto">
      <Tabs
        defaultValue="all"
        onValueChange={(value) => setActiveTab(value as EventType)}
        className="border-b border-[#DADADA] overflow-x-auto"
      >
        <TabsList className="mb-3 bg-transparent p-1">
          <TabsTrigger value="all" className="">
            All Events
          </TabsTrigger>
          <TabsTrigger value="workshop" className="">
            Workshop
          </TabsTrigger>
          <TabsTrigger value="webinar" className="">
            Webinar
          </TabsTrigger>
          <TabsTrigger value="fireside" className="">
            Fireside chat
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mb-6 text-sm text-gray-500 mt-4">
        {totalEvents} events found
      </div>
      <div className="space-y-5 pr-2">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="border-b border-[#DADADA] pb-6 last:border-b-0 flex flex-col md:flex-row justify-between"
          >
            <div className="flex flex-co md:flex-row gap-6">
              <div className="relative flex-shrink-0 flex flex-col items-center justify-center bg-primary-100 p-3 rounded-lg w-[50px] md:w-[62px] h-[85px]">
                <div className="text-sm text-neutral-100">
                  {event.date.month}
                </div>
                <div className="text-2xl font-semibold mb-6">
                  {event.date.day}
                </div>
                <div className="absolute bottom-0 flex items-center justify-center text-xs bg-primary-300 text-white w-[50px] md:w-[62px] h-7 rounded-br-xl rounded-bl-xl">
                  {event.time}
                </div>
              </div>
              <div className="flex-grow ">
                <div className="text-xs text-secondary-400 bg-[#FB5B3E12] w-24 py-2 text-center rounded-full">
                  {event.type}
                </div>
                <h3 className="text-xl font-medium my-2">{event.title}</h3>
                <div className="flex gap-5 items-center">
                <div className="flex items-center text-gray-500 mb-2">
                  <PiMapPinFill className="h-4 w-4 mr-1 text-primary-300" />
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-2">
                    {event.attendees.avatars.map((avatar, index) => (
                      <Avatar
                        key={index}
                        className="border-2 border-white h-6 w-6"
                      >
                        <AvatarImage
                          src={avatar || "/placeholder.svg"}
                          alt="Attendee"
                        />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-xs text-black">
                    {event.attendees.count} attendees
                  </span>
                </div>
              </div>
              </div>

            </div>
              <div className="flex flex-col md:flex-row gap-2 md:items-center">
                <Button variant="link" className="text-primary-400">
                  View details
                </Button>
                <Button size="lg" className="">
                  Register to attend
                </Button>
              </div>
          </div>
        ))}
      </div>
      {/* <EventPagination currentPage={currentPage} totalPages={6} onPageChange={setCurrentPage} /> */}
    </div>
  );
}
