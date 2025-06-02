import { endpoints } from '@/components/config/endpoints';
import { axios } from '@/lib/axios';
import axiosDefault from 'axios';
import { CommunityPrivacy, CommunityAudience } from './create-community';

export interface UpdateCommunityProps {
  id: string;
  name?: string;
  description?: string;
  banner?: File | null;
  privacy?: CommunityPrivacy;
  audience?: CommunityAudience;
  rules?: string;
  limit?: number;
}

export interface UpdateCommunityResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  metaData: null;
  data: {
    id: string;
    name: string;
    description: string;
    bannerUrl: string;
    privacy: string;
    audience: string;
    rules: string;
    limit: number;
    updatedAt: string;
  } | null;
}

const UpdateCommunityMutation = async (
  payload: UpdateCommunityProps
): Promise<UpdateCommunityResponse> => {
  try {
    const formData = new FormData();
    formData.append('id', payload.id);
    
    if (payload.name) {
      formData.append('name', payload.name);
    }
    
    if (payload.description) {
      formData.append('description', payload.description);
    }
    
    if (payload.banner) {
      formData.append('banner', payload.banner);
    }
    
    if (payload.privacy) {
      // Use the capitalized value directly (remove toLowerCase)
      formData.append('privacy', payload.privacy);
    }
    
    if (payload.audience) {
      // Use the capitalized value directly (remove toLowerCase)
      formData.append('audience', payload.audience);
    }
    
    if (payload.rules) {
      formData.append('rules', payload.rules);
    }
    
    if (payload.limit) {
      formData.append('limit', payload.limit.toString());
    }

    const response = await axios.put<UpdateCommunityResponse>(
      endpoints().communities.update(payload.id),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || 'Failed to update community.',
        metaData: null,
        data: null,
      };
    }

    const errorMessage =
      // (error as any)?.response?.data?.message || 'An unexpected error occurred.';
      ((error as unknown) as { response?: { data?: { message?: string } } })?.response?.data?.message || "An unexpected error occurred.";
    return {
      isSuccess: false,
      statusCode: '500',
      message: errorMessage,
      metaData: null,
      data: null,
    };
  }
};

export { UpdateCommunityMutation };
