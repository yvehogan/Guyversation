import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface GetUsersProps {
  userType?: "Anonymous" | "Mentee" | "Mentor";
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userTypeName: string;
  profilePictureUrl: string | null;
  email: string;
  middleName?: string | null;
  summary?: string | null;
  isModerator: boolean;
  availabilities: unknown[];
  socialMedia: unknown[];
  credentials: unknown[];
  expertises: unknown[];
  languages: unknown[];
  channels: unknown[];
}

export interface GetUsersResponse {
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
  data: User[];
}

export interface GetUsersParams {
  userType?: string;
  page?: number;
  pageSize?: number;
  search?: string;
}

export const GetUsersQuery = async (params?: GetUsersParams): Promise<GetUsersResponse> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.userType) {
      queryParams.append('userType', params.userType);
    }
    
    queryParams.append('PageNumber', (params?.page || 1).toString());
    queryParams.append('PageSize', (params?.pageSize || 10).toString());
    
    if (params?.search) {
      queryParams.append('SearchKey', params.search);
    }
    
    const queryString = queryParams.toString();
    const url = `${endpoints().admin.users}${queryString ? `?${queryString}` : ''}`;
    
    const response = await axios.get<GetUsersResponse>(url);
    
    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "An error occurred.",
        metaData: null,
        data: [],
      };
    }

    const errorMessage =
      ((error as unknown) as { response?: { data?: { message?: string } } })?.response?.data?.message || "An unexpected error occurred.";
    return {
      isSuccess: false,
      statusCode: "500",
      message: errorMessage,
      metaData: null,
      data: [],
    };
  }
};
