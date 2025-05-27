import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/components/lib/axios";
import { HttpResponse } from "@/components/types";
import axiosDefault from "axios";

export interface LogoutResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

const LogoutMutation = async () => {
  try {
    const response = await axios.post<HttpResponse<LogoutResponse>>(
      endpoints().auth.logout
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

export { LogoutMutation };
