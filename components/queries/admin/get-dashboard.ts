import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface AdminDashboardStats {
  totalUsers: number;
  totalMentors: number;
  totalMentees: number;
  pendingVerification: number;
  totalBookedSessions: number;
  sessionsAccepted: number;
  totalCancelledSessions: number;
  totalCompletedSessions: number;
  totalCommunities: number;
  totalOpenCommunities: number;
  totalClosedCommunities: number;
  pendingRequest: number;
  totalEvents: number;
  totalPastEvents: number;
  totalUpcomingEvents: number;
}

export interface GetAdminDashboardResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: AdminDashboardStats | null;
}

export const GetAdminDashboardQuery = async (): Promise<GetAdminDashboardResponse> => {
  try {
    const url = endpoints().admin.dashboard;
    const response = await axios.get<GetAdminDashboardResponse>(url);
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
