import { endpoints } from "@/components/config/endpoints";
import { ProfileData } from "@/components/modules/profile-setup/profile-setup";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

interface ApiProfileData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  summary: string;
  isModerator: boolean;
  expertiseId: string;
  channelId: string;
  languageId: string;
  credential: Array<{
    type: string;
    value: string;
  }>;
  social: Array<{
    socialMediaType: string;
    handle: string;
    url: string;
  }>;
  availability: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;
  profileImage?: string;
}

const transformProfileData = async (profileData: ProfileData): Promise<ApiProfileData> => {
  let profileImageStr = undefined;
  if (profileData.profileImage instanceof File) {
    const reader = new FileReader();
    profileImageStr = await new Promise<string>((resolve) => {
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(profileData.profileImage as File);
    });
  } else if (typeof profileData.profileImage === 'string') {
    profileImageStr = profileData.profileImage;
  }
  
  const social = profileData.socialMedia.map(item => ({
    socialMediaType: item.socialMediaType,
    handle: item.handle,
    url: item.url
  }));
  
  const availability = profileData.availability.flatMap(slot => 
    slot.days.map(day => ({
      day,
      startTime: slot.timeFrom,
      endTime: slot.timeTo
    }))
  );

  return {
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    phoneNumber: profileData.phoneNumber,
    summary: profileData.summary,
    isModerator: profileData.isModerator,
    expertiseId: profileData.areaOfExpertiseId,
    channelId: profileData.preferredChannelId,
    languageId: profileData.languageId,
    credential: profileData.credentialLink ? [{ type: "Link", value: profileData.credentialLink }] : [],
    social,
    availability,
    profileImage: profileImageStr
  };
};

export interface UpdateProfileProps {
  userId: string;
  profileData: ProfileData;
}

export interface UpdateProfileResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: any;
}

export const UpdateProfileMutation = async ({
  userId,
  profileData,
}: UpdateProfileProps): Promise<UpdateProfileResponse> => {
  try {
    const apiProfileData = await transformProfileData(profileData);
    
    const response = await axios.put(
      `${endpoints().admin.users}?userId=${userId}`,
      apiProfileData,
      { headers: { "Content-Type": "application/json" } }
    );

    return {
      isSuccess: true,
      statusCode: response.status.toString(),
      message: "Profile updated successfully",
      data: response.data,
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      isSuccess: false,
      statusCode: axiosDefault.isAxiosError(error) ? error.response?.status.toString() || "500" : "500",
      message: axiosDefault.isAxiosError(error) ? error.response?.data?.message || "Failed to update profile" : "An unexpected error occurred",
      data: null,
    };
  }
};
