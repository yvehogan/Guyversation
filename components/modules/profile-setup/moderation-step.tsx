"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProfileData } from "./profile-setup"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ModerationStepProps {
  profileData: ProfileData
  updateProfileData: (data: Partial<ProfileData>) => void
  onNext: () => void
  onPrevious: () => void
}

export function ModerationStep({ profileData, updateProfileData, onNext, onPrevious }: ModerationStepProps) {
  const handleModeratorChange = (value: string) => {
    updateProfileData({ isModerator: value === "yes" })
  }

  const handleChannelChange = (value: string) => {
    updateProfileData({ channels: [...profileData.channels, value] })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-medium">Do you want to be a moderator in a channel?</h2>
        <RadioGroup
          value={profileData.isModerator ? "yes" : "no"}
          onValueChange={handleModeratorChange}
          className="flex gap-8"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" className="border-primary-400 text-primary-400" />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" className="border-primary-400 text-primary-400" />
            <Label htmlFor="no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {profileData.isModerator && (
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Channels</h2>
          <Select onValueChange={handleChannelChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="health-wellness">Health and Wellness</SelectItem>
              <SelectItem value="technology-updates">Technology Updates</SelectItem>
              <SelectItem value="career-advice">Career Advice</SelectItem>
              <SelectItem value="personal-finance">Personal Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        <Button onClick={onNext} className=" flex items-center gap-2">
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
