import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface LikeCommunityPostResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: any;
}

export const LikeCommunityPostMutation = async ({
  communityId,
  postId,
}: {
  communityId: string;
  postId: string;
}): Promise<LikeCommunityPostResponse> => {
  try {
    const url = endpoints().communities.likePost(postId, communityId);
    const response = await axios.post<LikeCommunityPostResponse>(url);
    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "An error occurred.",
        data: null,
      };
    }
    const errorMessage =
      ((error as unknown) as { response?: { data?: { message?: string } } })?.response?.data?.message || "An unexpected error occurred.";
    return {
      isSuccess: false,
      statusCode: "500",
      message: errorMessage,
      data: null,
    };
  }
};
