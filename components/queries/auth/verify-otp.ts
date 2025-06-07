import { endpoints } from '@/components/config/endpoints';
import { axios } from '@/lib/axios';
import axiosDefault from 'axios';

export interface ValidateCodeProps {
  email: string;
  otp: string;
}

export interface ValidateCodeResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  metaData: null;
  data: null | {
    isValid: boolean;
    email: string;
  };
}

/**
 * Mutation function to validate a password reset code
 */
const ValidateCodeMutation = async (
  payload: ValidateCodeProps
): Promise<ValidateCodeResponse> => {
  try {
    const response = await axios.post<ValidateCodeResponse>(
      endpoints().auth.verify_otp,
      payload
    );

    return {
      isSuccess: response.status === 200,
      statusCode: response.status.toString(),
      message: response.data.message || "Code validated successfully",
      metaData: response.data.metaData || null,
      data: response.data.data,
    };
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "Invalid verification code",
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

export { ValidateCodeMutation };
