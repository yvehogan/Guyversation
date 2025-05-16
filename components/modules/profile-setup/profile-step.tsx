"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera } from "lucide-react"
import { ProfileData } from "./profile-setup"

interface ProfileStepProps {
  profileData: ProfileData
  updateProfileData: (data: Partial<ProfileData>) => void
  onNext: () => void
}

export function ProfileStep({ profileData, updateProfileData, onNext }: ProfileStepProps) {
  const [profileImage, setProfileImage] = useState<string | null>(profileData.profileImage)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setProfileImage(imageUrl)
        updateProfileData({ profileImage: imageUrl })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img src={profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
            ) : null}
          </div>
          <label
            htmlFor="profile-image"
            className="absolute bottom-0 right-0 bg-primary-400 text-white p-2 rounded-full cursor-pointer"
          >
            <Camera className="h-5 w-5" />
            <input id="profile-image" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="Your First Name"
            value={profileData.firstName}
            onChange={(e) => updateProfileData({ firstName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Your Last Name"
            value={profileData.lastName}
            onChange={(e) => updateProfileData({ lastName: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder="Phone Number"
              value={profileData.phoneNumber}
              onChange={(e) => updateProfileData({ phoneNumber: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="areaOfExpertise">Area of Expertise</Label>
            <Select
              value={profileData.areaOfExpertise}
              onValueChange={(value) => updateProfileData({ areaOfExpertise: value })}
            >
              <SelectTrigger id="areaOfExpertise" className="w-full">
                <SelectValue placeholder="Select Area of Expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech-leadership">Tech Leadership</SelectItem>
                <SelectItem value="product-design">Product Design</SelectItem>
                <SelectItem value="software-development">Software Development</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            placeholder="Your Summary"
            className="min-h-[120px] h-full"
            value={profileData.summary}
            onChange={(e) => updateProfileData({ summary: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="preferredChannel">Preferred Channel</Label>
          <Select
            value={profileData.preferredChannel}
            onValueChange={(value) => updateProfileData({ preferredChannel: value })}
          >
            <SelectTrigger id="preferredChannel" className="w-full">
              <SelectValue placeholder="Select Preferred Channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="video-call">Video Call</SelectItem>
              <SelectItem value="chat">Chat</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="languages">Languages</Label>
          <Select value={profileData.languages} onValueChange={(value) => updateProfileData({ languages: value })}>
            <SelectTrigger id="languages" className="w-full">
              <SelectValue placeholder="Select Languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="yoruba">Yoruba</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="credentialLink">Upload Credential</Label>
          <Input
            id="credentialLink"
            placeholder="Your credential link"
            value={profileData.credentialLink}
            onChange={(e) => updateProfileData({ credentialLink: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="socialMediaLink">
            Social Media <span className="text-gray-400">(optional)</span>
          </Label>
          <Input
            id="socialMediaLink"
            placeholder="Your social media link"
            value={profileData.socialMediaLink}
            onChange={(e) => updateProfileData({ socialMediaLink: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={onNext} className="w-32">
          Next
        </Button>
      </div>
    </div>
  )
}