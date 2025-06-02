"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProfileData } from "./profile-setup";
import Link from "next/link";
import Image from "next/image";

interface ReviewStepProps {
  profileData: ProfileData;
  onPrevious: () => void;
}

export function ReviewStep({ profileData, onPrevious }: ReviewStepProps) {
  return (
    <div className="space-y-8">
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {profileData.profileImage ? (
              <Image
                src={profileData.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">First Name</h3>
          <p className="mt-1">{profileData.firstName || "Magnus"}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
          <p className="mt-1">{profileData.lastName || "Carlsen"}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
          <p className="mt-1">{profileData.phoneNumber || "+2348123456789"}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Summary</h3>
          <p className="mt-1">
            {profileData.summary ||
              "Experienced mentor with a strong background in Tech Leadership and Product Design. Passionate about guiding aspiring professionals to achieve their goals. Available for video calls and chat sessions. Fluent in English, French, and Yoruba."}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">
            Area of Expertise
          </h3>
          <p className="mt-1">
            {profileData.areaOfExpertise || "Tech Leadership, Product Design"}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">
            Preferred Channel
          </h3>
          <p className="mt-1">
            {profileData.preferredChannel || "Video Call, Chat"}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Languages</h3>
          <p className="mt-1">
            {profileData.languages || "English, French, Yoruba"}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Credential</h3>
          <p className="mt-1">
            {profileData.credentialLink || "https://www.magnuscarlsen.com"}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Social Media</h3>
          <p className="mt-1">
            {profileData.socialMediaLink || "@magnuscarlsen"}
          </p>
        </div>
      </div>

      {profileData.isModerator && profileData.channels.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Moderation Channels
          </h3>
          <div className="flex flex-wrap gap-2">
            {profileData.channels.map((channel, index) => (
              <Badge
                key={index}
                className="bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                {channel === "health-wellness"
                  ? "Health and Wellness"
                  : channel === "technology-updates"
                  ? "Technology Updates"
                  : channel}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {profileData.availability.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Availability
          </h3>
          <div className="space-y-2">
            {profileData.availability.map((slot, index) => (
              <div key={index} className="flex justify-between">
                <span>{slot.days.join(", ")}</span>
                <span>
                  {slot.timeFrom} - {slot.timeTo}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 text-primary-400 border-none"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>
        <Link href="/dashboard">
          <Button className="bg-primary-400 hover:bg-primary-500">
            Go to dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
