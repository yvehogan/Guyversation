import { endpoints } from '@/components/config/endpoints';
import { axios } from '@/lib/axios';
import axiosDefault from 'axios';

export interface ResetPasswordProps {
  email: string;
  newPassword: string;
  otp: string;
}

export interface ResetPasswordResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  metaData: null;
  data: null | {
    email: string;
  };
}

const ResetPasswordMutation = async (
  payload: ResetPasswordProps
): Promise<ResetPasswordResponse> => {
  try {
    const response = await axios.post<ResetPasswordResponse>(
      endpoints().auth.reset_password,
      payload
    );

    return {
      isSuccess: response.status === 200,
      statusCode: response.status.toString(),
      message: response.data.message || "Password reset successful",
      metaData: response.data.metaData || null,
      data: response.data.data,
    };
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "Failed to reset password",
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

export { ResetPasswordMutation };
