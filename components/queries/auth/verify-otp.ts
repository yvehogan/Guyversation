import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/components/lib/axios";
import { HttpResponse } from "@/components/types";
import axiosDefault from "axios";

export interface VerifyOTPProps {
  email: string;
  otp: string;
}

export interface VerifyOTPResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  metaData: any;
}

export const VerifyOTPMutation = async (payload: VerifyOTPProps) => {
  try {
    const response = await axios.post<HttpResponse<VerifyOTPResponse>>(
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