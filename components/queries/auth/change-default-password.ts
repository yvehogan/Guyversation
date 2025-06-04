import { endpoints } from '@/components/config/endpoints';
import { axios } from '@/lib/axios';
import axiosDefault from 'axios';

export interface ChangeDefaultPasswordProps {
  email: string;              // User's email
  defaultPassword: string;    // The default/current password
  newPassword: string;        // The new password to set
  confirmPassword: string;    // Confirmation of the new password
}

export interface ChangeDefaultPasswordResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  metaData: null;
  data: null | {
    userId: string;
  };
}

/**
 * Mutation function to change the default password
 * This is used for first-time logins where users need to change their default password
 */
const ChangeDefaultPasswordMutation = async (
  payload: ChangeDefaultPasswordProps
): Promise<ChangeDefaultPasswordResponse> => {
  try {
    const response = await axios.post<ChangeDefaultPasswordResponse>(
      endpoints().auth.change_default_password,
      payload
    );

    return {
      isSuccess: response.status === 200,
      statusCode: response.status.toString(),
      message: response.data.message || "Password changed successfully",
      metaData: response.data.metaData || null,
      data: response.data.data,
    };
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      // Log the exact error response for debugging
      console.log('Change Default Password API error response:', error.response.data);
      
      // Return the exact error response format from the server
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "Failed to change password",
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

export { ChangeDefaultPasswordMutation };
