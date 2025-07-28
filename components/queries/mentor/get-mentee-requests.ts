import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface MenteeRequest {
  id: string;
  menteeUserId: string;
  menteeAge: number | null;
  name: string;
  menteeAvatarUrl: string | null;
  menteeLocation: string | null;
  createdDate: string;
  goal?: string;
  careerPath?: string;
  interests?: string[];
  socials?: {
    twitter?: string;
    linkedin?: string;
  };
}

export interface GetMenteeRequestsResponse {
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
  data: {
    mentees: MenteeRequest[];
  };
}

export const GetMenteeRequestsQuery = async (): Promise<GetMenteeRequestsResponse> => {
  try {
    const response = await axios.get<GetMenteeRequestsResponse>(
      endpoints().mentees.list
    );

    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "An error occurred.",
        metaData: null,
        data: {
          mentees: []
        }
      };
    }

    const errorMessage =
      ((error as unknown) as { response?: { data?: { message?: string } } })?.response?.data?.message || "An unexpected error occurred.";
    return {
      isSuccess: false,
      statusCode: "500",
      message: errorMessage,
      metaData: null,
      data: {
        mentees: []
      }
    };
  }
};
