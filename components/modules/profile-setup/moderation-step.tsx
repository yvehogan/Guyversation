"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { ProfileData } from "./profile-setup"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { UtilityItem } from "@/components/queries/utilities/get-utilities"

interface ModerationStepProps {
  profileData: ProfileData
  updateProfileData: (data: Partial<ProfileData>) => void
  onNext: () => void
  onPrevious: () => void
  channels: UtilityItem[]
}

export function ModerationStep({ 
  profileData, 
  updateProfileData, 
  onNext, 
  onPrevious,
  channels
}: ModerationStepProps) {
  const handleModeratorChange = (value: string) => {
    updateProfileData({ isModerator: value === "yes" })
    
    if (value === "no") {
      updateProfileData({ channelIds: [] })
    }
  }

  const handleChannelChange = (value: string) => {
    if (!profileData.channelIds.includes(value)) {
      updateProfileData({ channelIds: [...profileData.channelIds, value] })
    }
  }
  
  const removeChannel = (channelToRemove: string) => {
    updateProfileData({
      channelIds: profileData.channelIds.filter(channel => channel !== channelToRemove)
    })
  }
  
  const getChannelName = (channelId: string) => {
    const channel = channels.find(c => c.id === channelId);
    return channel ? channel.name : channelId;
  };

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
              {channels.map(channel => (
                <SelectItem key={channel.id} value={channel.id}>
                  {channel.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {profileData.channelIds.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Selected Channels:</p>
              <div className="flex flex-wrap gap-2">
                {profileData.channelIds.map((channelId, index) => (
                  <div key={index} className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full flex items-center">
                    {getChannelName(channelId)}
                    <button 
                      className="ml-2 text-primary-400 hover:text-primary-600"
                      onClick={() => removeChannel(channelId)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
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
        <Button onClick={onNext} className="flex items-center gap-2">
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
