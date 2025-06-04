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
  role: string;
  isDefaultPassword?: boolean;
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
      // Log the exact error response for debugging
      console.log('Login API error response:', error.response.data);
      
      // Return the exact error response format from the server
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "Authentication failed",
        metaData: null,
        data: null,
      };
    }

    // Fallback for non-Axios errors
    return {
      isSuccess: false,
      statusCode: "500",
      message: "An error occurred while connecting to the server",
      metaData: null,
      data: null,
    };
  }
};

export { LoginMutation };
