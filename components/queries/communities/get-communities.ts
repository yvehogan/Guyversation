import { endpoints } from '@/components/config/endpoints';
import { axios } from '@/lib/axios';
import axiosDefault from 'axios';

export interface GetCommunitiesProps {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  bannerUrl: string | null;
  privacy: 'Open' | 'Closed';
  audience: 'Everyone' | 'Mentees' | 'Mentors';
  rules: string;
  limit: number;
  memberCount: number;
  createdAt: string;
  createdBy: string;
  isJoined?: boolean;
}

export interface GetCommunitiesResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  metaData: {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  } | null;
  data: Community[];
}

const GetCommunitiesQuery = async (
  params?: GetCommunitiesProps
): Promise<GetCommunitiesResponse> => {
  try {
    const response = await axios.get<GetCommunitiesResponse>(
      endpoints().communities.list,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || 'An error occurred.',
        metaData: null,
        data: [],
      };
    }

    const errorMessage =
      (error as any)?.response?.data?.message || 'An unexpected error occurred.';
    return {
      isSuccess: false,
      statusCode: '500',
      message: errorMessage,
      metaData: null,
      data: [],
    };
  }
};

export { GetCommunitiesQuery };
