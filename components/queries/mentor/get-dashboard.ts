import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface MentorDashboardStats {
  totalSessions: number;
  totalCommunities: number;
  totalMentees: number;
}

export interface GetMentorDashboardResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: MentorDashboardStats | null;
}

export const GetMentorDashboardQuery = async (): Promise<GetMentorDashboardResponse> => {
  try {
    const url = endpoints().admin.mentor_dashboard;
    const response = await axios.get<GetMentorDashboardResponse>(url);
    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "An error occurred.",
        data: null,
      };
    }
    const errorMessage =
      ((error as unknown) as { response?: { data?: { message?: string } } })?.response?.data?.message || "An unexpected error occurred.";
    return {
      isSuccess: false,
      statusCode: "500",
      message: errorMessage,
      data: null,
    };
  }
};
