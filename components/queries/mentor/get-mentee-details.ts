import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface MenteeDetailsResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  metaData: null;
  data: MenteeDetails | null;
}

export interface MenteeDetails {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  email: string;
  age?: string;
  location?: string;
  avatar?: string;
  goal?: string;
  careerPath?: string;
  interests?: string[];
  socials?: {
    twitter?: string;
    linkedin?: string;
  };
}

export const GetMenteeDetailsQuery = async (menteeId: string): Promise<MenteeDetailsResponse> => {
  try {
    const response = await axios.get<MenteeDetailsResponse>(
      `${endpoints().mentees.profile_details(menteeId)}`
    );

    return {
      isSuccess: response.status === 200,
      statusCode: response.status.toString(),
      message: response.data.message,
      metaData: null,
      data: response.data.data,
    };
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "An error occurred.",
        metaData: null,
        data: null,
      };
    }

    const errorMessage =
      ((error as unknown) as { response?: { data?: { message?: string } } })?.response?.data?.message || "An unexpected error occurred.";
    return {
      isSuccess: false,
      statusCode: "500",
      message: errorMessage,
      metaData: null,
      data: null,
    };
  }
};
