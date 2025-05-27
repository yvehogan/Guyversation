import { endpoints } from '@/components/config/endpoints';
import { axios } from '@/lib/axios';
import axiosDefault from 'axios';

export interface DeleteCommunityResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  metaData: null;
  data: null;
}

/**
 * Deletes a community by its ID
 * @param communityId The ID of the community to delete
 * @returns API response
 */
const DeleteCommunityMutation = async (
  communityId: string
): Promise<DeleteCommunityResponse> => {
  try {
    const response = await axios.delete<DeleteCommunityResponse>(
      endpoints().communities.delete(communityId)
    );

    return {
      isSuccess: response.data.isSuccess,
      statusCode: response.data.statusCode,
      message: response.data.message || 'Community deleted successfully.',
      metaData: null,
      data: null,
    };
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || 'Failed to delete community.',
        metaData: null,
        data: null,
      };
    }

    const errorMessage =
      (error as any)?.response?.data?.message || 'An unexpected error occurred.';
    return {
      isSuccess: false,
      statusCode: '500',
      message: errorMessage,
      metaData: null,
      data: null,
    };
  }
};

export { DeleteCommunityMutation };
