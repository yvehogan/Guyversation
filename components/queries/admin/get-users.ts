import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface GetUsersProps {
  userType?: "Anonymous" | "Mentee" | "Mentor"; // Optional filter
}

export interface User {
  id: string; // Matches the API response
  firstName: string;
  lastName: string;
  userType: number; // 0 = Mentee, 1 = Mentor, etc.
  profilePictureUrl: string | null;
  email: string;
  middleName?: string | null;
  summary?: string | null;
  isModerator: boolean;
  availabilities: any[];
  socialMedia: any[];
  credentials: any[];
  expertises: any[];
  languages: any[];
  channels: any[];
}

export interface GetUsersResponse {
    isSuccess: boolean;
    statusCode: string;
    message: string;
    metaData: {
      totalCount: number;
      pageSize: number;
      currentPage: number;
      totalPages: number;
      hasNext: boolean;
      hasPrevious: boolean;
    } | null;
    data: User[];
  }

const GetUsersQuery = async (
  params?: GetUsersProps
): Promise<GetUsersResponse> => {
  try {
    const response = await axios.get<{
      isSuccess: boolean;
      statusCode: string;
      message: string;
      metaData: null;
      data: User[];
    }>(
      endpoints().admin.users,
      {
        params,
      }
    );

    // Ensure we're returning the exact structure expected by GetUsersResponse
    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "An error occurred.",
        metaData: null,
        data: [],
      };
    }

    const errorMessage =
      (error as any)?.response?.data?.message || "An unexpected error occurred.";
    return {
      isSuccess: false,
      statusCode: "500",
      message: errorMessage,
      metaData: null,
      data: [],
    };
  }
};

export { GetUsersQuery };
