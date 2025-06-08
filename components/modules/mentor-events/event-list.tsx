"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PiMapPinFill } from "react-icons/pi";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GetEventsQuery } from "@/components/queries/events/get-events";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type EventType = "all" | "workshop" | "webinar" | "fireside";

export default function EventsList() {
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<EventType>("all");
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await GetEventsQuery();
      if (!response.isSuccess) {
        throw new Error(response.message || "Failed to fetch events");
      }
      return response.data || [];
    }
  });

  const handleCreateEvent = () => {
    setCreateEventOpen(false);
    queryClient.invalidateQueries({ queryKey: ['events'] });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate().toString();
    return { month, day };
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const filteredEvents = !data ? [] : activeTab === "all" 
    ? data 
    : data.filter(event => {
        const typeMap: Record<number, EventType> = {
          1: "workshop",
          2: "webinar", 
          3: "fireside"
        };
        return typeMap[event.eventType] === activeTab;
      });

  return (
    <>
      <div className="flex-1 overflow-y-auto pb-16 mt-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-4xl font-medium mb-4">Events</h1>

        </div>

        <div className="bg-white rounded-[30px] p-4 h-[calc(100%-50px)] overflow-y-auto mb-8">
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
            {isLoading ? "Loading events..." : `${filteredEvents.length} events found`}
          </div>
          
          {error && (
            <div className="text-red-500 mb-4">Error: {(error as Error).message}</div>
          )}

          <div className="space-y-5 pr-2">
            {isLoading ? (
              <div>Loading events...</div>
            ) : filteredEvents.length === 0 ? (
              <div>No events found</div>
            ) : (
              filteredEvents.map((event) => {
                const date = formatDate(event.startDate);
                const time = formatTime(event.startTime);
                
                const eventTypeMap: Record<number, string> = {
                  1: "workshop",
                  2: "webinar",
                  3: "fireside"
                };
                const eventTypeDisplay = eventTypeMap[event.eventType] || "event";
                
                return (
                  <div
                    key={event.id}
                    className="border-b border-[#DADADA] pb-6 last:border-b-0"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative flex-shrink-0 flex flex-col items-center justify-center bg-primary-100 p-3 rounded-lg w-[75px] h-[100px]">
                        <div className="text-sm text-neutral-100">
                          {date.month}
                        </div>
                        <div className="text-2xl font-semibold mb-6">
                          {date.day}
                        </div>
                        <div className="absolute bottom-0 flex items-center justify-center text-xs bg-primary-300 text-white w-[75px] h-7 rounded-br-xl rounded-bl-xl">
                          {time}
                        </div>
                      </div>
                      <div className="flex-grow ">
                        <div className="text-xs text-secondary-400 bg-[#FB5B3E12] w-24 py-2 text-center rounded-full">
                          {eventTypeDisplay}
                        </div>
                        <h3 className="text-xl font-medium my-2">{event.title}</h3>
                        <div className="flex gap-5 items-center">
                          <div className="flex items-center text-gray-500 mb-2">
                            <PiMapPinFill className="h-4 w-4 mr-1 text-primary-300" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-black">
                              {event.attendeeCount} attendees
                            </span>
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
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

    </>
  );
}
