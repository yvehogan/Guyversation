import { UserDetails } from "@/components/queries/users/get-user-details";

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

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-neutral-200 text-sm mb-1">
            Completed Sessions
          </h3>
          <p className="text-4xl font-medium text-neutral-100">14</p>
        </div>
        <div>
          <h3 className="text-neutral-200 text-sm mb-1">
            Cancelled Sessions
          </h3>
          <p className="text-4xl font-medium text-neutral-100">14</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-neutral-200 text-sm mb-1">
            Pending Sessions
          </h3>
          <p className="text-4xl font-medium text-neutral-100">14</p>
        </div>
        <div>
          <h3 className="text-neutral-200 text-sm mb-1">-</h3>
          <p className="text-4xl font-medium text-neutral-100">10</p>
        </div>
      </div>

      <div>
        <h3 className="text-base font-medium mb-4 text-neutral-100">
          Available days
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {availableDays.slice(0, 4).map((day) => (
            <div
              key={day}
              className="border border-secondary-500 bg-secondary-800 rounded-md p-3 text-center"
            >
              <div className="font-medium text-neutral-100">{day}</div>
              <div className="text-xs text-secondary-500">
                {availabilityByDay[day]?.length || 0} slot{availabilityByDay[day]?.length !== 1 ? 's' : ''}
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
        {allTimeSlots.length > 0 ? (
          <>
            <div className="grid grid-cols-4 gap-4 mb-4">
              {allTimeSlots.slice(0, 4).map((time, i) => (
                <div
                  key={i}
                  className="border rounded-full py-2 px-4 text-center"
                >
                  <div className="text-sm">{time}</div>
                </div>
              ))}
            </div>
            {allTimeSlots.length > 4 && (
              <div className="grid grid-cols-4 gap-4">
                {allTimeSlots.slice(4, 8).map((time, i) => (
                  <div
                    key={i + 4}
                    className="border rounded-full py-2 px-4 text-center"
                  >
                    <div className="text-sm">{time}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-500 py-4">
            No time slots available
          </div>
        )}
      </div>
    </div>
  );
}
