import { endpoints } from '@/components/config/endpoints';
import { axios } from '@/lib/axios';
import axiosDefault from 'axios';

export interface ForgotPasswordProps {
  email: string;
}

export interface ForgotPasswordResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  metaData: null;
  data: null | {
    email: string;
  };
}

/**
 * Mutation function to request a password reset
 */
const ForgotPasswordMutation = async (
  payload: ForgotPasswordProps
): Promise<ForgotPasswordResponse> => {
  try {
    const response = await axios.post<ForgotPasswordResponse>(
      endpoints().auth.forgot_password,
      payload
    );

    return {
      isSuccess: response.status === 200,
      statusCode: response.status.toString(),
      message: response.data.message || "Reset link sent to your email",
      metaData: response.data.metaData || null,
      data: response.data.data,
    };
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "Failed to send reset link",
        metaData: null,
        data: null,
      };
    }
    return {
      isSuccess: false,
      statusCode: "500",
      message: "An error occurred while connecting to the server",
      metaData: null,
      data: null,
    };
  }
};

export { ForgotPasswordMutation };
