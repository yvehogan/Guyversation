import { UserDetails } from "@/components/queries/users/get-user-details";
import { useEffect, useState } from "react";
import { GetMentorDashboardQuery, MentorDashboardStats } from "@/components/queries/mentor/get-dashboard";
import React from "react";

interface ProfileTabProps {
  user: UserDetails | null;
}

export default function SessionsTab({ user }: ProfileTabProps) {
  if (!user) return <div>No user data available</div>;
  
  const getDayName = (dayNumber: number): string => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[dayNumber % 7];
  };
  
  const availabilityByDay = user.availabilities?.reduce((acc, availability) => {
    const dayName = getDayName(availability.day);
    if (!acc[dayName]) {
      acc[dayName] = [];
    }
    acc[dayName].push(availability);
    return acc;
  }, {} as Record<string, typeof user.availabilities[0][]>) || {};
  
  const availableDays = Object.keys(availabilityByDay);
  
  const getTimeSlots = (availabilities: typeof user.availabilities) => {
    if (!availabilities) return [];
    
    const timeSlots: string[] = [];
    availabilities.forEach(availability => {
      const startTime = new Date(`2000-01-01T${availability.startTime}`);
      const endTime = new Date(`2000-01-01T${availability.endTime}`);
      
      let currentTime = new Date(startTime);
      while (currentTime < endTime) {
        timeSlots.push(
          currentTime.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
          })
        );
        currentTime.setHours(currentTime.getHours() + 1);
      }
    });
    
    return [...new Set(timeSlots)];
  };
  
  const allTimeSlots = getTimeSlots(user.availabilities);

  const [mentorStats, setMentorStats] = useState<MentorDashboardStats | null>(null);

  useEffect(() => {
    if (user?.id) {
      (async () => {
        const res = await GetMentorDashboardQuery(user.id);
        if (res.isSuccess && res.data) setMentorStats(res.data);
      })();
    }
  }, [user?.id]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-neutral-200 text-sm mb-1">
            Completed Sessions
          </h3>
          <p className="text-4xl font-medium text-neutral-100">
            {mentorStats?.totalCompletedSessions ?? 0}
          </p>
        </div>
        <div>
          <h3 className="text-neutral-200 text-sm mb-1">
            Cancelled Sessions
          </h3>
          <p className="text-4xl font-medium text-neutral-100">
            {mentorStats?.totalCancelledSessions ?? 0}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-neutral-200 text-sm mb-1">
            Booked Sessions
          </h3>
          <p className="text-4xl font-medium text-neutral-100">
            {mentorStats?.totalBookedSessions ?? 0}
          </p>
        </div>
        <div>
          <h3 className="text-neutral-200 text-sm mb-1">Total Sessions</h3>
          <p className="text-4xl font-medium text-neutral-100">
            {mentorStats?.totalSessions ?? 0}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-base font-medium mb-4 text-neutral-100">
          Available days
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {availableDays.slice(0, 4).map((day) => (
            <div
              key={day}
              className="border border-secondary-500 bg-secondary-800 rounded-md p-3 text-center"
            >
              <div className="font-medium text-neutral-100">{day}</div>
              <div className="text-xs text-secondary-500">
                {availabilityByDay[day]?.length || 0} slot{availabilityByDay[day]?.length !== 1 ? 's' : ''}
              </div>
              <div className="mt-2 space-y-1">
                {availabilityByDay[day]?.map((slot, idx) => (
                  <div key={idx} className="text-xs text-neutral-100">
                    {slot.startTime?.slice(0,5)} - {slot.endTime?.slice(0,5)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {availableDays.length > 4 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availableDays.slice(4).map((day) => (
              <div
                key={day}
                className="border rounded-md p-3 text-center"
              >
                <div className="font-medium">{day}</div>
                <div className="text-xs text-gray-500">
                  {availabilityByDay[day]?.length || 0} slot{availabilityByDay[day]?.length !== 1 ? 's' : ''}
                </div>
                <div className="mt-2 space-y-1">
                  {availabilityByDay[day]?.map((slot, idx) => (
                    <div key={idx} className="text-xs text-neutral-100">
                      {slot.startTime?.slice(0,5)} - {slot.endTime?.slice(0,5)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {availableDays.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No availability information provided
          </div>
        )}
      </div>

      <div>
        <h3 className="text-base font-medium mb-4">
          Available time slots
        </h3>
        {availableDays.length > 0 ? (
          <div className="space-y-4">
            {availableDays.map((day) => (
              <div key={day}>
                <div className="font-medium text-neutral-100 mb-1">{day}</div>
                <div className="flex flex-wrap gap-2">
                  {availabilityByDay[day]?.flatMap((slot, idx) => {
                    const slots = [];
                    const start = slot.startTime?.slice(0,5) || "00:00";
                    const end = slot.endTime?.slice(0,5) || "00:00";
                    const [startHour, startMin] = start.split(":").map(Number);
                    const [endHour, endMin] = end.split(":").map(Number);
                    let current = new Date(2000, 0, 1, startHour, startMin);
                    const endDate = new Date(2000, 0, 1, endHour, endMin);

                    while (current < endDate) {
                      const next = new Date(current);
                      next.setHours(next.getHours() + 1);
                      if (next > endDate) break;
                      const from = current.toTimeString().slice(0,5);
                      const to = next.toTimeString().slice(0,5);
                      slots.push(
                        <span
                          key={from + "-" + to + idx}
                          className="border rounded-full py-2 px-4 text-center text-sm text-black border-gray-100"
                        >
                          {from} - {to}
                        </span>
                      );
                      current = next;
                    }
                    return slots;
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-4">
            No time slots available
          </div>
        )}
      </div>
    </div>
  );
}
