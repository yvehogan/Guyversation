"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react"
import { ProfileData } from "./profile-setup"

interface AvailabilityStepProps {
  profileData: ProfileData
  updateProfileData: (data: Partial<ProfileData>) => void
  onNext: () => void
  onPrevious: () => void
}

export function AvailabilityStep({ profileData, updateProfileData, onNext, onPrevious }: AvailabilityStepProps) {
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [timeFrom, setTimeFrom] = useState("09:00")
  const [timeTo, setTimeTo] = useState("16:00")

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const timeOptions = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ]

  const formatTimeForDisplay = (time24h: string): string => {
    const [hours, minutes] = time24h.split(':').map(Number);
    const period = hours >= 12 ? 'pm' : 'am';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')}${period}`;
  };

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day))
    } else {
      setSelectedDays([...selectedDays, day])
    }
  }

  const addAvailability = () => {
    if (selectedDays.length > 0) {
      const newAvailability = {
        days: [...selectedDays],
        timeFrom,
        timeTo,
      }

      updateProfileData({
        availability: [...profileData.availability, newAvailability],
      })

      setSelectedDays([])
    }
  }
  
  const removeAvailability = (index: number) => {
    const updatedAvailability = [...profileData.availability];
    updatedAvailability.splice(index, 1);
    updateProfileData({ availability: updatedAvailability });
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-neutral-100 font-medium">When are you available?</h2>
        <div className="flex flex-wrap gap-2">
          {daysOfWeek.map((day) => (
            <Button
              key={day}
              type="button"
              variant={selectedDays.includes(day) ? "default" : "outline"}
              className={selectedDays.includes(day) ? "bg-primary-400 hover:bg-primary-400 rounded-lg" : "border-[#AD66E6] text-neutral-100 rounded-lg"}
              onClick={() => toggleDay(day)}
            >
              {day}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-neutral-100 font-medium">What time are you available?</h2>
        <div className="flex items-center gap-4">
          <div className="w-full">
            <Select value={timeFrom} onValueChange={setTimeFrom}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {formatTimeForDisplay(time)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <span className="text-gray-500">to</span>

          <div className="w-full">
            <Select value={timeTo} onValueChange={setTimeTo}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {formatTimeForDisplay(time)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <button
        onClick={addAvailability}
        disabled={selectedDays.length === 0}
        className={`flex items-center gap-2 border-none ${selectedDays.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Plus className="h-6 w-6 bg-primary-400 text-white p-1 rounded-full" /> Add availability
      </button>

      {profileData.availability.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="text-lg font-medium text-neutral-100">Your Availability Slots</h3>
          {profileData.availability.map((slot, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
                onClick={() => removeAvailability(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              
              <div className="mb-3">
                <h4 className="text-sm font-medium text-neutral-100 mb-2">Days:</h4>
                <div className="flex flex-wrap gap-2">
                  {slot.days.map((day, dayIndex) => (
                    <span 
                      key={dayIndex}
                      className="bg-primary-50 text-primary-600 px-2 py-1 rounded text-sm"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-neutral-100 mb-2">Time:</h4>
                <p className="text-sm">
                  {formatTimeForDisplay(slot.timeFrom)} to {formatTimeForDisplay(slot.timeTo)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 border-none text-primary-400"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>
        <Button onClick={onNext} className="flex items-center gap-2">
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
