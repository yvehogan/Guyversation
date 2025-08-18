import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface AcceptedMentee {
  id: string;
  menteeUserId: string;
  name: string;
  email: string;
  age: number | null;
  location: string | null;
  avatar: string | null;
  goal?: string;
  time?: string;
  careerPath?: string;
  interests?: string[];
  socials?: {
    twitter?: string;
    linkedin?: string;
  };
}

export interface GetAcceptedMenteesResponse {
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
    mentees: AcceptedMentee[];
  };
}

export interface GetAcceptedMenteesParams {
  pageNumber: number;
  pageSize: number;
  searchKey?: string;
  userId?: string;
}

export const GetAcceptedMenteesQuery = async (params: GetAcceptedMenteesParams): Promise<GetAcceptedMenteesResponse> => {
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
    if (params.userId) {
      queryParams.append('UserId', params.userId);
    }
    const baseEndpoint = endpoints().mentees.mentees.split('?')[0];
    const url = `${baseEndpoint}?Status=Accepted&${queryParams.toString()}`;
    const response = await axios.get<GetAcceptedMenteesResponse>(url);
    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "An error occurred.",
        metaData: null,
        data: {
          mentees: []
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
        mentees: []
      }
    };
  }
};
