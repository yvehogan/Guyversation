"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { ProfileData } from "./profile-setup";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { UpdateProfileMutation } from "@/components/queries/profile/update-profile";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface UtilityItem {
  id: string;
  name: string;
}

interface ReviewStepProps {
  profileData: ProfileData;
  userId: string;
  onPrevious: () => void;
  languages: UtilityItem[];
  expertises: UtilityItem[];
  channels: UtilityItem[];
}

export function ReviewStep({ 
  profileData, 
  userId, 
  onPrevious, 
  languages,
  expertises,
  channels 
}: ReviewStepProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [actualUserId, setActualUserId] = useState(userId);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      const userIdFromCookie = Cookies.get("GUYVERSATION_USER_ID");
      if (userIdFromCookie) {
        setActualUserId(userIdFromCookie);
      } else {
        toast.error("User ID not found. Please log in again.");
        console.error("No user ID found in cookie");
      }
    } else {
    }

    if (profileData.profileImage instanceof File) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(profileData.profileImage);
    } else if (typeof profileData.profileImage === 'string') {
      setImagePreview(profileData.profileImage);
    }
  }, [userId, profileData.profileImage]);

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: () => UpdateProfileMutation({ userId: actualUserId, profileData }),
    onSuccess: (response) => {
      setApiResponse(response);

      if (response.isSuccess) {
        Cookies.set("GUYVERSATION_USER_FIRSTNAME", profileData.firstName);
        Cookies.set("GUYVERSATION_USER_LASTNAME", profileData.lastName);

        toast.success(response.message || "Profile updated successfully!");
        setIsSubmitted(true);

        Cookies.set("GUYVERSATION_PROFILE_COMPLETED", "true");

        setTimeout(() => {
          router.push('/mentor');
        }, 2000);
      } else {
        toast.error(response.message || "Failed to update profile.");
        console.error("API returned error:", response);
      }
    },
    onError: (error: Error) => {
      console.error("Profile update error:", error);
      toast.error(error.message || "An unexpected error occurred.");
    },
  });

  const handleSubmit = () => {
    if (!actualUserId) {
      toast.error("User ID not found. Please log in again.");
      return;
    }
    
    // Simple validation
    if (!profileData.firstName || !profileData.lastName) {
      toast.warning("First name and last name are required.");
      return;
    }
    updateProfile();
  };

  const getLanguageName = (languageId: string) => {
    const language = languages.find(lang => lang.id === languageId);
    return language ? language.name : "Not specified";
  };

  const getExpertiseName = (expertiseId: string) => {
    const expertise = expertises.find(exp => exp.id === expertiseId);
    return expertise ? expertise.name : "Not specified";
  };

  const getChannelName = (channelId: string) => {
    const channel = channels.find(chan => chan.id === channelId);
    return channel ? channel.name : "Not specified";
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-medium">Review your profile information</h2>

      {/* Show loading indicator while submitting */}
      {isPending && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400 mx-auto"></div>
            <p className="text-center mt-4">Submitting your profile...</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center space-x-6 pb-6 border-b border-gray-100">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-500">No image</span>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium">
              {profileData.firstName} {profileData.lastName}
            </h3>
            <p className="text-gray-500">{profileData.email}</p>
            <p className="text-gray-500">
              {profileData.phoneNumber || "No phone number provided"}
            </p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <h4 className="font-medium">Summary</h4>
            <p className="text-gray-600 mt-1">
              {profileData.summary || "No summary provided"}
            </p>
          </div>

          <div>
            <h4 className="font-medium">Area of Expertise</h4>
            <p className="text-gray-600 mt-1">
              {getExpertiseName(profileData.areaOfExpertiseId)}
            </p>
          </div>

          <div>
            <h4 className="font-medium">Preferred Channel</h4>
            <p className="text-gray-600 mt-1">
              {getChannelName(profileData.preferredChannelId)}
            </p>
          </div>

          <div>
            <h4 className="font-medium">Languages</h4>
            <p className="text-gray-600 mt-1">
              {getLanguageName(profileData.languageId)}
            </p>
          </div>

          <div>
            <h4 className="font-medium">Credential Link</h4>
            <p className="text-gray-600 mt-1 truncate">
              {profileData.credentialLink ? (
                <a
                  href={profileData.credentialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {profileData.credentialLink}
                </a>
              ) : (
                "Not provided"
              )}
            </p>
          </div>

          <div>
            <h4 className="font-medium">Social Media</h4>
            {profileData.socialMedia.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-1">
                {profileData.socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {social.socialMediaType}
                    {social.handle && <span className="ml-1 text-gray-500">@{social.handle}</span>}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-1">No social media profiles provided</p>
            )}
          </div>
        </div>

        {/* Moderation Section */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-medium mb-2">Moderation</h4>
          <p className="text-gray-600">
            {profileData.isModerator
              ? "Yes, will be a moderator"
              : "No, will not be a moderator"}
          </p>

          {profileData.isModerator && profileData.channelIds.length > 0 && (
            <div className="mt-2">
              <h5 className="font-medium text-sm mb-1">Channels:</h5>
              <div className="flex flex-wrap gap-2">
                {profileData.channelIds.map((channelId, index) => (
                  <span
                    key={index}
                    className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm"
                  >
                    {getChannelName(channelId)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Availability Section */}
        {profileData.availability.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <h4 className="font-medium mb-2">Availability</h4>
            <div className="grid gap-3 md:grid-cols-2">
              {profileData.availability.map((slot, index) => (
                <div key={index} className="mb-3 bg-gray-50 p-3 rounded-md">
                  <div className="flex flex-wrap gap-1 mb-1">
                    {slot.days.map((day, dayIndex) => (
                      <span
                        key={dayIndex}
                        className="bg-primary-50 text-primary-600 px-2 py-1 rounded text-sm"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mt-2">
                    <span className="font-medium">Time:</span> {slot.timeFrom}{" "}
                    to {slot.timeTo}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isSubmitted && apiResponse && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md overflow-auto max-h-60">
          <h4 className="font-medium mb-2">Submission Result:</h4>
          <pre className="text-xs">
            {JSON.stringify(apiResponse.data, null, 2)}
          </pre>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mt-8">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 border-none text-primary-400 mb-3 md:mb-0"
          disabled={isPending || isSubmitted}
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>

        {isSubmitted ? (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md flex items-center">
            Profile submitted successfully!
          </div>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isPending || !actualUserId}
            className="px-8 py-2"
            title={!actualUserId ? "User ID not available" : ""}
          >
            {isPending ? "Submitting..." : "Submit Profile"}
          </Button>
        )}
      </div>
    </div>
  );
}
