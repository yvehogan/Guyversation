import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface CommunityPost {
  id: string;
  content: string;
  createdDate: string;
  author: {
    name: string;
    avatarUrl: string | null;
  };
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLikedByCurrentUser: boolean;
}

export interface GetCommunityPostsResponse {
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
  data: CommunityPost[];
}

export interface GetCommunityPostsParams {
  communityId: string;
  pageNumber?: number;
  pageSize?: number;
  searchKey?: string;
}

export const GetCommunityPostsQuery = async (params: GetCommunityPostsParams): Promise<GetCommunityPostsResponse> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.pageNumber) {
      queryParams.append('PageNumber', params.pageNumber.toString());
    }
    
    if (params.pageSize) {
      queryParams.append('PageSize', params.pageSize.toString());
    }
    
    if (params.searchKey && params.searchKey.trim() !== '') {
      queryParams.append('SearchKey', params.searchKey.trim());
    }
    
    const url = `${endpoints().communities.getPosts(params.communityId)}?${queryParams.toString()}`;
    
    const response = await axios.get<GetCommunityPostsResponse>(url);
    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "An error occurred.",
        metaData: null,
        data: []
      };
    }
    
    const errorMessage =
      ((error as unknown) as { response?: { data?: { message?: string } } })?.response?.data?.message || "An unexpected error occurred.";
    return {
      isSuccess: false,
      statusCode: "500",
      message: errorMessage,
      metaData: null,
      data: []
    };
  }
};

