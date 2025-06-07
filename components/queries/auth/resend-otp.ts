import { endpoints } from '@/components/config/endpoints';
import { axios } from '@/lib/axios';
import axiosDefault from 'axios';

export interface ResendOtpProps {
  email: string;
}

export interface ResendOtpResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  metaData: null;
  data: null | {
    email: string;
  };
}

/**
 * Mutation function to resend a verification code
 */
const ResendOtpMutation = async (
  payload: ResendOtpProps
): Promise<ResendOtpResponse> => {
  try {
    const response = await axios.post<ResendOtpResponse>(
      endpoints().auth.resend_otp,
      payload
    );

    return {
      isSuccess: response.status === 200,
      statusCode: response.status.toString(),
      message: response.data.message || "Verification code resent successfully",
      metaData: response.data.metaData || null,
      data: response.data.data,
    };
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "Failed to resend verification code",
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

export { ResendOtpMutation };
