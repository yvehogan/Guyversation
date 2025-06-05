"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, PlusCircle, Trash2 } from "lucide-react"
import { ProfileData, SocialMediaEntry } from "./profile-setup"
import Image from "next/image"
import { UtilityItem } from "@/components/queries/utilities/get-utilities"

interface ProfileStepProps {
  profileData: ProfileData
  updateProfileData: (data: Partial<ProfileData>) => void
  onNext: () => void
  languages: UtilityItem[]
  expertises: UtilityItem[]
  channels: UtilityItem[]
}

export function ProfileStep({ 
  profileData, 
  updateProfileData, 
  onNext,
  languages,
  expertises,
  channels
}: ProfileStepProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    typeof profileData.profileImage === 'string' ? profileData.profileImage : null
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateProfileData({ profileImage: file });
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setImagePreview(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSocialMedia = () => {
    updateProfileData({ 
      socialMedia: [...profileData.socialMedia, { socialMediaType: "Facebook", handle: "", url: "" }] 
    });
  };

  const updateSocialMedia = (index: number, field: keyof SocialMediaEntry, value: string) => {
    const updated = [...profileData.socialMedia];
    updated[index] = { ...updated[index], [field]: value };
    updateProfileData({ socialMedia: updated });
  };

  const removeSocialMedia = (index: number) => {
    updateProfileData({ 
      socialMedia: profileData.socialMedia.filter((_, i) => i !== index) 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {imagePreview ? (
              <Image 
                src={imagePreview} 
                alt="Profile" 
                width={128} 
                height={128} 
                className="w-full h-full object-cover" 
              />
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

      <div className="grid md:grid-cols-2 gap-3 md:gap-6">
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

      <div className="grid md:grid-cols-2 gap-3 md:gap-6">
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
              value={profileData.areaOfExpertiseId}
              onValueChange={(value) => updateProfileData({ areaOfExpertiseId: value })}
            >
              <SelectTrigger id="areaOfExpertise" className="w-full">
                <SelectValue placeholder="Select Area of Expertise" />
              </SelectTrigger>
              <SelectContent>
                {expertises.map((expertise) => (
                  <SelectItem key={expertise.id} value={expertise.id}>
                    {expertise.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2 my-3 md:my-0">
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

      <div className="grid md:grid-cols-2 gap-3 md:gap-6">
        <div className="space-y-3">
          <Label htmlFor="preferredChannel">Preferred Channel</Label>
          <Select
            value={profileData.preferredChannelId}
            onValueChange={(value) => updateProfileData({ preferredChannelId: value })}
          >
            <SelectTrigger id="preferredChannel" className="w-full">
              <SelectValue placeholder="Select Preferred Channel" />
            </SelectTrigger>
            <SelectContent>
              {channels.map((channel) => (
                <SelectItem key={channel.id} value={channel.id}>
                  {channel.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="languages">Languages</Label>
          <Select 
            value={profileData.languageId} 
            onValueChange={(value) => updateProfileData({ languageId: value })}
          >
            <SelectTrigger id="languages" className="w-full">
              <SelectValue placeholder="Select Languages" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.id} value={language.id}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
          <Label>Credential Type</Label>
          <Select
            defaultValue="Link"
            onValueChange={(value) => {/* Optional credential type handling */}}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Credential Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Link">Link</SelectItem>
              <SelectItem value="Certificate">Certificate</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="credentialLink">Upload Credential</Label>
          <Input
            id="credentialLink"
            placeholder="Your credential link"
            value={profileData.credentialLink}
            onChange={(e) => updateProfileData({ credentialLink: e.target.value })}
          />
        </div>
        
       
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Social Media Profiles</Label>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={addSocialMedia}
            className="flex items-center text-primary-600"
          >
            <PlusCircle className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        {profileData.socialMedia.length === 0 ? (
          <div className="text-sm text-gray-500 italic">No social media profiles added</div>
        ) : (
          <div className="space-y-3">
            {profileData.socialMedia.map((social, index) => (
              <div key={index} className="grid grid-cols-6 md:grid-cols-12 gap-2 items-center">
                <div className="col-span-3">
                  <Select
                    value={social.socialMediaType}
                    onValueChange={(value) => updateSocialMedia(index, 'socialMediaType', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="X">X</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="col-span-4">
                  <Input
                    placeholder="Username"
                    value={social.handle}
                    onChange={(e) => updateSocialMedia(index, 'handle', e.target.value)}
                  />
                </div>
                
                <div className="col-span-4">
                  <Input
                    placeholder="URL"
                    value={social.url}
                    onChange={(e) => updateSocialMedia(index, 'url', e.target.value)}
                  />
                </div>
                
                <div className="col-span-1 text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSocialMedia(index)}
                    className="text-red-500 p-0 h-auto"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={onNext} className="w-32">
          Next
        </Button>
      </div>
    </div>
  )
}