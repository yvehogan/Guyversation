"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PiMapPinFill } from "react-icons/pi";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { CreateEventDialog } from "@/components/modules/admin/events/create-event";
import { GetEventsQuery, EventInterface } from "@/components/queries/events/get-events";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pagination } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type EventType = "all" | "workshop" | "webinar" | "fireside";

export default function EventManagementPage() {
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<EventType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedEvent, setSelectedEvent] = useState<EventInterface | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkForSearchUpdates = () => {
      const savedSearch = localStorage.getItem("search-events") || "";
      if (savedSearch !== search) {
        setSearch(savedSearch);
        
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }
        searchTimeoutRef.current = setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['events', activeTab, currentPage, pageSize] });
        }, 300);
      }
    };
    
    checkForSearchUpdates();
    
    const interval = setInterval(checkForSearchUpdates, 500);
    
    return () => {
      clearInterval(interval);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search, activeTab, currentPage, pageSize, queryClient]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['events', activeTab, currentPage, pageSize, search],
    queryFn: async () => {
      const response = await GetEventsQuery(
        activeTab !== "all" ? activeTab : undefined, 
        currentPage, 
        pageSize,
        search || undefined
      );
      if (!response.isSuccess) {
        throw new Error(response.message || "Failed to fetch events");
      }
      return response;
    },
    refetchOnWindowFocus: false,
  });

  const events = data?.data || [];
  
  const emptyMetadata = {
    totalCount: 0,
    pageSize: pageSize,
    currentPage: currentPage,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false
  };

  const paginationMetadata = data?.metaData || emptyMetadata;

  const handleCreateEvent = () => {
    setCreateEventOpen(false);
    queryClient.invalidateQueries({ queryKey: ['events'] });
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const filteredEvents = !events ? [] : activeTab === "all" 
    ? events 
    : events.filter(event => {
        const typeMap: Record<number, EventType> = {
          1: "workshop",
          2: "webinar", 
          3: "fireside"
        };
        return typeMap[event.eventType] === activeTab;
      });

  const handleViewDetails = (event: EventInterface) => {
    setSelectedEvent(event);
    setDetailsOpen(true);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto pb-16 mt-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-4xl font-medium mb-4">Events</h1>

          <Button onClick={() => setCreateEventOpen(true)} className="">
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        </div>

        <div className="bg-white rounded-[30px] p-4 overflow-y-auto mb-8">
          <Tabs
            defaultValue="all"
            onValueChange={(value) => {
              setActiveTab(value as EventType);
              setCurrentPage(1);
            }}
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
              <>
                {filteredEvents.map((event) => {
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
                      <div className="flex flex-col sm:flex-row justify-between  gap-6">
                        <div className="flex  gap-5">
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
                        </div>
                        <div className="flex flex-col md:flex-row gap-2 md:items-center w-full md:max-w-[150px]">
                          <Button 
                            variant="outline" 
                            className="text-primary-400"
                            onClick={() => handleViewDetails(event)}
                          >
                            View details
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {/* Add pagination component */}
                {filteredEvents.length > 0 && (
                  <Pagination 
                    metadata={paginationMetadata}
                    onPageChange={handlePageChange}
                    className="mt-6"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <CreateEventDialog
        open={createEventOpen}
        onOpenChange={setCreateEventOpen}
        onCreateEvent={handleCreateEvent}
      />

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedEvent?.title}</DialogTitle>
            <div className="mt-2 mb-4">
              <span className="text-xs text-secondary-400 bg-[#FB5B3E12] px-3 py-1 rounded-full">
                {selectedEvent?.eventType === 1 ? "Workshop" : 
                 selectedEvent?.eventType === 2 ? "Webinar" : 
                 selectedEvent?.eventType === 3 ? "Fireside chat" : "Event"}
              </span>
            </div>
          </DialogHeader>
          <div className="grid gap-4">
            <div>
              <h4 className="font-medium mb-1">Description</h4>
              <p className="text-sm text-gray-600">{selectedEvent?.description || "No description available."}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <h4 className="font-medium mb-1">Date</h4>
                <p className="text-sm text-gray-600">
                  {selectedEvent ? new Date(selectedEvent.startDate).toLocaleDateString() : "-"}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Time</h4>
                <p className="text-sm text-gray-600">
                  {selectedEvent ? `${formatTime(selectedEvent.startTime)} - ${formatTime(selectedEvent.endTime)}` : "-"}
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Location</h4>
              <div className="flex items-center text-gray-600">
                <PiMapPinFill className="h-4 w-4 mr-1 text-primary-300" />
                <span className="text-sm">{selectedEvent?.location || "-"}</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Attendees</h4>
              <p className="text-sm text-gray-600">{selectedEvent?.attendeeCount || 0} people</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
