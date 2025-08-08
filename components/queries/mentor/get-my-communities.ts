import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface MyCommunity {
  id: string;
  name: string;
  description: string;
  privacy: number;
  memberCount: number;
  bannerUrl: string | null;
  createdDate: string;
  isOwner?: boolean;
  joinedDate?: string;
}

export interface GetMyCommunitiesResponse {
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
    communities: MyCommunity[];
  };
}

export interface GetMyCommunitiesParams {
  pageNumber: number;
  pageSize: number;
  searchKey?: string;
}

export const GetMyCommunitiesQuery = async (params: GetMyCommunitiesParams): Promise<GetMyCommunitiesResponse> => {
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
    
    const url = `${endpoints().communities.myCommunities}?${queryParams.toString()}`;
    
    const response = await axios.get<GetMyCommunitiesResponse>(url);
    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "An error occurred.",
        metaData: null,
        data: {
          communities: []
        }
      };
    }
    
    const errorMessage =
      ((error as unknown) as { response?: { data?: { message?: string } } })?.response?.data?.message || "An unexpected error occurred.";
    return {
      isSuccess: false,
      statusCode: "500",
      message: errorMessage,
      metaData: null,
      data: {
        communities: []
      }
    };
  }
};
