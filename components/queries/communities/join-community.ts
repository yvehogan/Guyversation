import { endpoints } from '@/components/config/endpoints';
import { axios } from '@/lib/axios';
import axiosDefault from 'axios';

export interface JoinCommunityResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: boolean;
  metaData: null;
}

export const JoinCommunityMutation = async (communityId: string): Promise<JoinCommunityResponse> => {
  try {
    const url = endpoints().communities.join(communityId);
    const response = await axios.post<JoinCommunityResponse>(url);
    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || 'Failed to join community.',
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
