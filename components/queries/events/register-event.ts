import { endpoints } from '@/components/config/endpoints';
import { axios } from '@/lib/axios';
import axiosDefault from 'axios';

export interface RegisterEventResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: boolean;
  metaData: null;
}

export const RegisterEventMutation = async (eventId: string): Promise<RegisterEventResponse> => {
  try {
    const url = endpoints().events.register(eventId);
    const response = await axios.post<RegisterEventResponse>(url);
    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || 'Failed to register for event.',
        data: false,
        metaData: null,
      };
    }

    const errorMessage =
      ((error as unknown) as { response?: { data?: { message?: string } } })?.response?.data?.message || "An unexpected error occurred.";
    return {
      isSuccess: false,
      statusCode: '500',
      message: errorMessage,
      data: false,
      metaData: null,
    };
  }
};
