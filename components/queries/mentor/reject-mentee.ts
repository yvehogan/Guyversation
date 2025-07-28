import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface RejectMenteeRequest {
  menteeUserId: string;
}

export interface RejectMenteeResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  metaData: null;
  data: null;
}

export const RejectMenteeQuery = async (
  data: RejectMenteeRequest
): Promise<RejectMenteeResponse> => {
  try {
    const response = await axios.post<RejectMenteeResponse>(
      endpoints().mentees.rejectMentee,
      data
    );

    return response.data;
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
