import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/components/lib/axios";
import { HttpResponse } from "@/components/types";
import axiosDefault from "axios";

export interface ResetPasswordProps {
  emailAddress: string;
  resetCode: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  data: string;
}

const ResetPasswordMutation = async (payload: ResetPasswordProps) => {
  try {
    const { emailAddress, resetCode, ...payloadData } = payload;
    const response = await axios.post<HttpResponse<ResetPasswordResponse>>(
      `${endpoints().auth.resetPassword}?emailAddress=${emailAddress}&resetCode=${resetCode}`,
      payloadData
    );

    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        "Network error. Please check your connection.";
      throw new Error(errorMessage);
    }

    // Handle other unexpected error types
    throw new Error("An unexpected error occurred.");
  }
};

export { ResetPasswordMutation };
