import { endpoints } from '@/components/config/endpoints';
import { axios } from '@/lib/axios';
import axiosDefault from 'axios';

export type CommunityPrivacy = 'Open' | 'Closed';
export type CommunityAudience = 'Everyone' | 'Mentees' | 'Mentors';

export interface CreateCommunityProps {
  name: string;
  description: string;
  banner: File | null;
  privacy: CommunityPrivacy;
  audience: CommunityAudience;
  rules: string;
  limit: number;
}

export interface CreateCommunityResponse {
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
    createdAt: string;
  } | null;
}

const CreateCommunityMutation = async (
  payload: CreateCommunityProps
): Promise<CreateCommunityResponse> => {
  try {
    const formData = new FormData();
    formData.append('name', payload.name);
    
    if (payload.description) {
      formData.append('description', payload.description);
    }
    
    if (payload.banner) {
      formData.append('banner', payload.banner);
    }
    
    formData.append('privacy', payload.privacy);
    formData.append('audience', payload.audience);
    
    if (payload.rules) {
      formData.append('rules', payload.rules);
    }
    
    formData.append('limit', payload.limit.toString());

    const response = await axios.post<CreateCommunityResponse>(
      endpoints().communities.create,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return {
      isSuccess: response.data.isSuccess,
      statusCode: response.data.statusCode,
      message: response.data.message,
      metaData: response.data.metaData,
      data: response.data.data,
    };
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || 'An error occurred.',
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

export { CreateCommunityMutation };
