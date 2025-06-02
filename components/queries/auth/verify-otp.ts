import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface VerifyOTPProps {
  email: string;
  otp: string;
}

export interface VerifyOTPResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  metaData: unknown;
}

export const VerifyOTPMutation = async (payload: VerifyOTPProps) => {
  try {
    const response = await axios.post<VerifyOTPResponse>(
      endpoints().auth.verify_email,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        "Network error. Please check your connection.";
      throw new Error(errorMessage);
    }
    throw new Error("An unexpected error occurred.");
  }
};