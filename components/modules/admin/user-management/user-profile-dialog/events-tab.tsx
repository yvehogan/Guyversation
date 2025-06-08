import { useState, useEffect } from "react";
import { EventInterface, GetEventsQuery } from "@/components/queries/events/get-events";

interface EventsTabProps {
  open: boolean;
}

export default function EventsTab({ open }: EventsTabProps) {
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetchEvents();
    }
  }, [open]);
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await GetEventsQuery();

      if (!response.isSuccess) {
        throw new Error(response.message || "Failed to fetch events");
      }

      setEvents(response.data || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching events"
      );
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (date: string, time: string) => {
    const eventDate = new Date(`${date.split("T")[0]}T${time}`);
    return eventDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  if (loading) {
    return <p className="text-neutral-100">Loading events...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (events.length === 0) {
    return <p className="text-neutral-100">No events found.</p>;
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <h3 className="text-lg font-medium">Upcoming Events</h3>
      
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="border border-secondary-500 rounded-lg p-4"
          >
            <h4 className="font-medium text-lg">{event.title}</h4>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <p className="text-sm text-neutral-200">Date & Time</p>
                <p className="text-neutral-100">
                  {formatDateTime(event.startDate, event.startTime)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-200">Location</p>
                <p className="text-neutral-100">{event.location}</p>
              </div>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm text-neutral-200">
                {event.attendeeCount}{" "}
                {event.attendeeCount === 1 ? "attendee" : "attendees"}
              </span>
              <button className="text-xs bg-primary-400 text-white px-3 py-1 rounded-full">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
