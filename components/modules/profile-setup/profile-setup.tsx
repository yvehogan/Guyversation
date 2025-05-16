"use client"

import { useState } from "react"
import { ProfileHeader } from "./header"
import { StepIndicator } from "./step-indicator"
import { ProfileStep } from "./profile-step"
import { ModerationStep } from "./moderation-step"
import { AvailabilityStep } from "./availability-step"
import { ReviewStep } from "./review-step"

export type ProfileData = {
  firstName: string
  lastName: string
  phoneNumber: string
  summary: string
  areaOfExpertise: string
  preferredChannel: string
  languages: string
  credentialLink: string
  socialMediaLink: string
  profileImage: string | null
  isModerator: boolean
  channels: string[]
  availability: {
    days: string[]
    timeFrom: string
    timeTo: string
  }[]
}

export function ProfileSetup() {
  const [currentStep, setCurrentStep] = useState(0)
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    summary: "",
    areaOfExpertise: "",
    preferredChannel: "",
    languages: "",
    credentialLink: "",
    socialMediaLink: "",
    profileImage: null,
    isModerator: false,
    channels: [],
    availability: [],
  })

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
        <ProfileHeader email="magnusCarlsen@gmail.com" />

        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-medium text-neutral-100">Welcome to Guyversation</h1>
            <p className="text-neutral-200">Let&apos;s set up your mentor profile</p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl p-8 w-80 shadow-sm">
              <StepIndicator steps={steps} currentStep={currentStep} />
            </div>

            <div className="bg-white rounded-3xl p-8 flex-1 shadow-sm">
              {currentStep === 0 && (
                <ProfileStep profileData={profileData} updateProfileData={updateProfileData} onNext={handleNext} />
              )}
              {currentStep === 1 && (
                <ModerationStep
                  profileData={profileData}
                  updateProfileData={updateProfileData}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
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
              {currentStep === 3 && <ReviewStep profileData={profileData} onPrevious={handlePrevious} />}
            </div>
          </div>
        </div>
        <div className="py-16"></div>
      </div>
    </div>
  )
}
