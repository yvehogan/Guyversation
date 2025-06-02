import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface VerifyProps {
  email: string;
}

export interface EmailResponse {
  data: {
    data: {
      response: string;
    };
  };
}

const VerifyEmailMutation = async (payload: VerifyProps) => {
  try {
    const response = await axios.post<EmailResponse>(
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

export { VerifyEmailMutation };
