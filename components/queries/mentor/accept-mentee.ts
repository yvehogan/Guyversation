import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface AcceptMenteeRequest {
  menteeUserId: string;
}

export interface AcceptMenteeResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  metaData: null;
  data: null;
}

export const AcceptMenteeQuery = async (
  data: AcceptMenteeRequest
): Promise<AcceptMenteeResponse> => {
  try {
    const response = await axios.post<AcceptMenteeResponse>(
      endpoints().mentees.acceptMentee,
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
