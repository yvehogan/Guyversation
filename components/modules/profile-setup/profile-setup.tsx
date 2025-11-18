"use client"

import { useState, useEffect } from "react"
import { ProfileHeader } from "./header"
import { StepIndicator } from "./step-indicator"
import { ProfileStep } from "./profile-step"
import { ModerationStep } from "./moderation-step"
import { AvailabilityStep } from "./availability-step"
import { ReviewStep } from "./review-step"
import Cookies from "js-cookie"
import { useQuery } from "@tanstack/react-query"
import { getLanguages, getExpertises, getChannels } from "@/components/queries/utilities/get-utilities"

export type SocialMediaEntry = {
  socialMediaType: string;
  handle: string;
  url: string;
}

export type ProfileData = {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  summary: string
  areaOfExpertiseId: string
  preferredChannelId: string
  languageId: string
  credentialLink: string
  socialMedia: SocialMediaEntry[]
  profileImage: string | File | null
  isModerator: boolean
  channelIds: string[]
  availability: {
    days: string[]
    timeFrom: string
    timeTo: string
  }[]
}

export function ProfileSetup() {
  const [userId, setUserId] = useState<string>("")
  const [currentStep, setCurrentStep] = useState(0)
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    summary: "",
    areaOfExpertiseId: "",
    preferredChannelId: "",
    languageId: "",
    credentialLink: "",
    socialMedia: [],
    profileImage: null,
    isModerator: false,
    channelIds: [],
    availability: [],
  })

  const { data: languagesData } = useQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
  })

  const { data: expertisesData } = useQuery({
    queryKey: ["expertises"],
    queryFn: getExpertises,
  })

  const { data: channelsData } = useQuery({
    queryKey: ["channels"],
    queryFn: getChannels,
  })

  const languages = languagesData?.data || []
  const expertises = expertisesData?.data || []
  const channels = channelsData?.data || []

  useEffect(() => {
    const userIdFromCookie = Cookies.get("GUYVERSATION_USER_ID")
    const userEmailFromCookie = Cookies.get("GUYVERSATION_USER_EMAIL")
    
    if (userIdFromCookie) {
      setUserId(userIdFromCookie)
    }
    
    if (userEmailFromCookie) {
      setProfileData(prev => ({
        ...prev,
        email: userEmailFromCookie
      }))
    }
  }, [])

  const steps = [
    { id: "profile", label: "Profile" },
    { id: "moderation", label: "Moderation" },
    { id: "availability", label: "Setup availability" },
    { id: "review", label: "Review" },
  ]

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const updateProfileData = (data: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...data }))
  }

  return (
    <div className="min-h-screen bg-[#F3E9FD] relative">
      <div
        className="absolute top-0 left-0 right-0 h-[350px] z-0"
        style={{
          backgroundImage: "url('/svgs/gradient-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10">
        <ProfileHeader email={profileData.email} />

        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-4xl font-medium text-neutral-100">Welcome to MyGuy</h1>
            <p className="text-neutral-200">Let&apos;s set up your mentor profile</p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex gap-6 max-w-6xl mx-auto">
            <div className="hidden md:block bg-white rounded-3xl p-8 w-80 shadow-sm">
              <StepIndicator steps={steps} currentStep={currentStep} />
            </div>

            <div className="bg-white rounded-3xl p-8 flex-1 shadow-sm">
              {currentStep === 0 && (
                <ProfileStep 
                  profileData={profileData} 
                  updateProfileData={updateProfileData} 
                  onNext={handleNext} 
                  languages={languages}
                  expertises={expertises}
                  channels={channels}
                />
              )}
              {currentStep === 1 && (
                <ModerationStep
                  profileData={profileData}
                  updateProfileData={updateProfileData}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  channels={channels}
                />
              )}
              {currentStep === 2 && (
                <AvailabilityStep
                  profileData={profileData}
                  updateProfileData={updateProfileData}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
              )}
              {currentStep === 3 && (
                <ReviewStep 
                  profileData={profileData} 
                  userId={userId} 
                  onPrevious={handlePrevious}
                  languages={languages}
                  expertises={expertises}
                  channels={channels}
                />
              )}
            </div>
          </div>
        </div>
        <div className="py-16"></div>
      </div>
    </div>
  )
}
