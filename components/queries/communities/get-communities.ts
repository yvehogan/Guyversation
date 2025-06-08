import { endpoints } from '@/components/config/endpoints';
import { axios } from '@/lib/axios';
import axiosDefault from 'axios';

export interface GetCommunitiesProps {
  page?: number;
  pageSize?: number;
  search?: string;
}

export enum PrivacyEnums {
  Open = 1,
  Closed = 2,
}

export enum AudienceEnums {
  Everyone = 0,
  Mentees = 1,
  Mentors = 2,
}

export interface Community {
  id: string;
  name: string;
  description: string;
  bannerUrl: string | null;
  privacy: number;
  audience: number;
  createdDate: string;
  memberCount: number;
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
  data: {
    totalCommunityCount: number;
    communities: Community[];
  };
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
        data: {
          totalCommunityCount: 0,
          communities: [],
        },
      };
    }

    const errorMessage =
      ((error as unknown) as { response?: { data?: { message?: string } } })?.response?.data?.message || "An unexpected error occurred.";
    return {
      isSuccess: false,
      statusCode: '500',
      message: errorMessage,
      metaData: null,
      data: {
        totalCommunityCount: 0,
        communities: [],
      },
    };
  }
};

export { GetCommunitiesQuery };
