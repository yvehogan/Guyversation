import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface UpcomingSession {
  id: string;
  title: string;
  sessionDate: string;
  isCompleted: boolean;
}

export interface GetUpcomingSessionsResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: UpcomingSession[];
}

export const GetUpcomingSessionsQuery = async (): Promise<GetUpcomingSessionsResponse> => {
  try {
    const url = endpoints().mentor.my_sessions;
    const response = await axios.get<GetUpcomingSessionsResponse>(url);
    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "An error occurred.",
        data: [],
      };
    }
    const errorMessage =
      ((error as unknown) as { response?: { data?: { message?: string } } })?.response?.data?.message || "An unexpected error occurred.";
    return {
      isSuccess: false,
      statusCode: "500",
      message: errorMessage,
      data: [],
    };
  }
};
