import { endpoints } from '@/components/config/endpoints';
import { axios } from '@/lib/axios';
import axiosDefault from 'axios';

export interface LoginProps {
  email: string;
  password: string;
}

export interface LoginResponseData {
  email: string;
  accessToken: string;
  refreshToken: string;
  expiry: string;
  userId: string;
}

export interface LoginResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  metaData: null;
  data: LoginResponseData | null;
}

const LoginMutation = async (
  payload: LoginProps
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      endpoints().auth.login,
      payload
    );

    return {
      isSuccess: response.status === 200,
      statusCode: response.status.toString(),
      message: response.data.message,
      metaData: response.data.metaData || null,
      data: response.data.data,
    };
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "An error occurred.",
        metaData: null,
        data: null,
      };
    }

    const errorMessage =
      // (error as unknown)?.response?.data?.message || "An unexpected error occurred.";
      ((error as unknown) as { response?: { data?: { message?: string } } })?.response?.data?.message || "An unexpected error occurred.";
    return {
      isSuccess: false,
      statusCode: "500",
      message: errorMessage,
      metaData: null,
      data: null,
    };
  }
};

export { LoginMutation };
