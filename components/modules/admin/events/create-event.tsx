import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { CreateEventMutation, CreateEventProps } from "@/components/queries/events/create-event";
import { toast } from "react-toastify";

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateEvent: () => void;
}

export interface EventFormData {
  title: string;
  description: string;
  location: string;
  category: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

export function CreateEventDialog({
  open,
  onOpenChange,
  onCreateEvent,
}: CreateEventDialogProps) {
  const queryClient = useQueryClient();
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  // Create mutation for API call
  const { mutate: createEvent, isPending } = useMutation({
    mutationFn: (data: CreateEventProps) => CreateEventMutation(data),
    onSuccess: (response) => {
      if (response.isSuccess) {
        toast.success(response.message || "Event created successfully!");

        queryClient.invalidateQueries({ queryKey: ['events'] });

        onCreateEvent();
        resetForm();
        onOpenChange(false);
      } else {
        toast.error(response.message || "Failed to create event");
      }
    },
    onError: (error: any) => {
      console.error("Error creating event:", error);
      toast.error(error.message || "An error occurred while creating the event");
    },
  });

  const resetForm = () => {
    setEventTitle("");
    setEventDescription("");
    setEventLocation("");
    setEventCategory("");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
  };

  const handleCreateEvent = () => {
    if (!eventTitle || eventTitle.trim() === "") {
      toast.warning("Please enter an event title");
      return;
    }

    if (!startDate || !startTime) {
      toast.warning("Please enter a start date and time");
      return;
    }

    const finalEndDate = endDate || startDate;
    const finalEndTime = endTime || startTime;

    const eventData: CreateEventProps = {
      title: eventTitle.trim(),
      description: eventDescription || "",
      eventType: eventCategory || "General",
      location: eventLocation || "",
      startDate: startDate,
      startTime: startTime,
      endDate: finalEndDate,
      endTime: finalEndTime,
    };

    console.log("Submitting event with data:", eventData);
    console.log("Title field:", eventData.title);

    createEvent(eventData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl rounded-[30px]">
        <DialogHeader className="border-b border-grey-500 pb-4">
          <DialogTitle className="text-4xl font-medium">
            Create Event
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="event-title">Event Title</Label>
            <Input
              id="event-title"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Lagos, Nigeria"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="col-span-2 sm:col-span-1 mt-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className="mt-1 h-full min-h-[150px]"
            />
          </div>
          <div className="flex flex-col justify-between gap-4">
            <div className="gap-7 mt-3">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={eventCategory} onValueChange={setEventCategory}>
                  <SelectTrigger id="category" className="mt-1 w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="webinar">Webinar</SelectItem>
                    <SelectItem value="FiresideChat">Fireside chat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="col-span-2">
              <Label className="font-medium">Start Date & Time</Label>
              <div className="grid grid-cols-2 gap-4 mt-1">
                <div className="relative">
                  <Input
                    id="start-date"
                    type="date"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="pl-10"
                  />
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <div className="relative">
                  <Input
                    id="start-time"
                    type="time"
                    placeholder="Start Time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="pl-10"
                  />
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <Label className="font-medium">End Date & Time</Label>
              <div className="grid grid-cols-2 gap-4 mt-1">
                <div className="relative">
                  <Input
                    id="end-date"
                    type="date"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="pl-10"
                  />
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <div className="relative">
                  <Input
                    id="end-time"
                    type="time"
                    placeholder="End Time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="pl-10"
                  />
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={handleCreateEvent}
          className="w-1/2 mx-auto mt-8"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Event"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
