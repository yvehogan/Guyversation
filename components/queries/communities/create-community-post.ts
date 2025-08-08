import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface CreateCommunityPostParams {
  communityId: string;
  content: string;
}

export interface CreateCommunityPostResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data?: any;
}

export const CreateCommunityPostQuery = async (params: CreateCommunityPostParams): Promise<CreateCommunityPostResponse> => {
  try {
    const formData = new FormData();
    formData.append('CommunityId', params.communityId);
    formData.append('Content', params.content);
    
    const url = endpoints().communities.createPost(params.communityId);
    
    const response = await axios.post<CreateCommunityPostResponse>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "Failed to create post.",
      };
    }
    
    const errorMessage =
      ((error as unknown) as { response?: { data?: { message?: string } } })?.response?.data?.message || "An unexpected error occurred.";
    return {
      isSuccess: false,
      statusCode: "500",
      message: errorMessage,
    };
  }
};
