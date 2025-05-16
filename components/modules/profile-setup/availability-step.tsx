"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { ProfileData } from "./profile-setup"

interface AvailabilityStepProps {
  profileData: ProfileData
  updateProfileData: (data: Partial<ProfileData>) => void
  onNext: () => void
  onPrevious: () => void
}

export function AvailabilityStep({ profileData, updateProfileData, onNext, onPrevious }: AvailabilityStepProps) {
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [timeFrom, setTimeFrom] = useState("9:00am")
  const [timeTo, setTimeTo] = useState("4:00pm")

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const timeOptions = [
    "9:00am",
    "10:00am",
    "11:00am",
    "12:00pm",
    "1:00pm",
    "2:00pm",
    "3:00pm",
    "4:00pm",
    "5:00pm",
    "6:00pm",
  ]

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

      // Reset selection
      setSelectedDays([])
    }
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
              {time}
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
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
</div>

      <button
        onClick={addAvailability}
        className="flex items-center gap-2 border-none"
      >
        <Plus className="h-6 w-6 bg-primary-400 text-white p-1 rounded-full" /> Add availability
      </button>

      {profileData.availability.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-gray-100">
          {profileData.availability.map((slot, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-neutral-100 font-medium">When are you available?</h2>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map((day) => (
                  <Button
                    key={`${index}-${day}`}
                    type="button"
                    variant={slot.days.includes(day) ? "default" : "outline"}
                    className={slot.days.includes(day) ? "bg-primary-400 hover:bg-primary-400" : "border-gray-200"}
                    disabled
                  >
                    {day}
                  </Button>
                ))}
              </div>

              <h2 className="text-neutral-100 font-medium">What time are you available?</h2>
              <div className="flex items-center gap-4">
                <div className="w-full">
                  <Select value={slot.timeFrom} disabled>
                    <SelectTrigger className="w-full">
                      <SelectValue>{slot.timeFrom}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <span className="text-gray-500">to</span>

                <div className="w-full">
                  <Select value={slot.timeTo} disabled>
                    <SelectTrigger className="w-full">
                      <SelectValue>{slot.timeTo}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
        <Button onClick={onNext} className=" flex items-center gap-2">
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
