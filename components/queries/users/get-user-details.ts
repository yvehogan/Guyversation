import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface UserDetailsResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  metaData: null;
  data: UserDetails | null;
}

export interface UserDetails {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  email: string;
  phoneNumber?: string | null;
  userType?: number;
  userTypeName: string;
  summary?: string | null;
  profilePictureUrl?: string | null;
  isModerator?: boolean;
  hasUpdatedProfile?: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
  availabilities?: {
    id: string;
    day: number;
    startTime: string;
    endTime: string;
  }[];
  socialMedia?: {
    id: string;
    socialMediaType: number;
    handle: string;
    url: string;
  }[];
  credentials?: {
    id: string;
    type: string;
    value: string;
  }[];
  expertises?: {
    id: string;
    name: string;
  }[];
  languages?: {
    id: string;
    name: string;
  }[];
  channels?: {
    id: string;
    name: string;
  }[];
}

export const GetUserDetailsQuery = async (userId: string): Promise<UserDetailsResponse> => {
  try {
    const response = await axios.get<UserDetailsResponse>(
      `${endpoints().admin.user_details}/${userId}`
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
