"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PiMapPinFill } from "react-icons/pi";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GetEventsQuery } from "@/components/queries/events/get-events";
import { RegisterEventMutation } from "@/components/queries/events/register-event";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Pagination } from "@/components/ui/pagination";
import { toast } from "react-toastify";

type EventType = "all" | "workshop" | "webinar" | "FiresideChat";

export default function EventsList() {
  const [activeTab, setActiveTab] = useState<EventType>("all");
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [search, setSearch] = useState("");
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [paginationMetadata, setPaginationMetadata] = useState({
    totalCount: 0,
    pageSize: pageSize,
    currentPage: currentPage,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false
  });
  const [registering, setRegistering] = useState<string | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set());

  useEffect(() => {
    const checkForSearchUpdates = () => {
      const savedSearch = localStorage.getItem("search-mentor-events") || "";
      if (savedSearch !== search) {
        setSearch(savedSearch);
        if (currentPage !== 1) {
          setCurrentPage(1);
        } else {
          if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
          }
          searchTimeoutRef.current = setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['events', activeTab, currentPage, pageSize] });
          }, 300);
        }
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
        search && search.trim() !== "" ? search : undefined
      );
      if (!response.isSuccess) {
        throw new Error(response.message || "Failed to fetch events");
      }
      
      if (response.metaData) {
        setPaginationMetadata(response.metaData);
      }
      
      return response.data || [];
    }
  });

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
          3: "FiresideChat"
        };
        return typeMap[event.eventType] === activeTab;
      });

  const handleViewDetails = (event: any) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) setSelectedEvent(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegisterForEvent = async (eventId: string) => {
    if (registering || registeredEvents.has(eventId)) return;
    
    setRegistering(eventId);
    try {
      const response = await RegisterEventMutation(eventId);
      
      if (response.isSuccess) {
        toast.success(response.message || "Successfully registered for the event");
        setRegisteredEvents(prev => new Set(prev).add(eventId));
      } else {
        toast.error(response.message || "Failed to register for the event");
      }
    } catch (error) {
      toast.error("An error occurred while registering for the event");
      console.error("Event registration error:", error);
    } finally {
      setRegistering(null);
    }
  };

  return (
    <>
      {isLoading && <LoadingOverlay text="Loading events..." />}
    
      {/* Dialog for event details */}
      <Dialog open={open} onOpenChange={handleDialogChange}>
        <DialogContent className="sm:max-w-lg max-h-[500px] overflow-y-auto">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEvent.title}</DialogTitle>
                <DialogDescription>
                  {selectedEvent.description}
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="flex-1 overflow-y-auto pb-16">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-medium mb-4">Events</h1>
        </div>

        <div className="bg-white rounded-[30px] p-4 h-[calc(100%-50px)] overflow-y-auto mb-8">
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
              <TabsTrigger value="FiresideChat" className="">
                Fireside chat
              </TabsTrigger>
              </TabsList>
          </Tabs>

          <div className="mb-6 text-sm text-gray-500 mt-4">
            {isLoading ? "Loading events..." : `${paginationMetadata.totalCount} events found`}
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
                  const isRegistered = registeredEvents.has(event.id);
                  const isRegistering = registering === event.id;
                  
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
                          <Button
                            variant="link"
                            className="text-primary-400"
                            onClick={() => handleViewDetails(event)}
                          >
                            View details
                          </Button>
                          
                          {isRegistered ? (
                            <Button 
                              size="lg" 
                              variant="outline" 
                              className="bg-green-50 text-green-600 border-green-200" 
                              disabled
                            >
                              Registered
                            </Button>
                          ) : (
                            <Button 
                              size="lg" 
                              className=""
                              onClick={() => {
                                if (event.eventUrl) {
                                  window.open(event.eventUrl, '_blank');
                                } else {
                                  handleRegisterForEvent(event.id);
                                }
                              }}
                              disabled={isRegistering}
                            >
                              {isRegistering ? "Registering..." : "Register to attend"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {paginationMetadata.totalCount > 0 && (
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
    </>
  );
}
