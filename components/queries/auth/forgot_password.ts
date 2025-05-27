import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/components/lib/axios";
import { HttpResponse } from "@/components/types";
import axiosDefault from "axios";

export interface ForgotPasswordProps {
  email: string;
}

export interface ForgotPasswordResponse {
  data: string;
}

const ForgotPasswordMutation = async (payload: ForgotPasswordProps) => {
  try {
    const response = await axios.post<HttpResponse<ForgotPasswordResponse>>(
      endpoints().auth.forgot_password,
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


export { ForgotPasswordMutation };
