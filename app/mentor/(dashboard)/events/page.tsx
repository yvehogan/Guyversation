import { EventsList } from "@/components/modules/mentor-events/event-list";

export default function EventsPage() {
  return (
    <div className="py-6 w-full h-full">
      <h1 className="text-4xl font-medium mb-4">Events</h1>
      <EventsList />
    </div>
  )
}
