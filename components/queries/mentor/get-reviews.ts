import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface MentorReview {
  id: string;
  reviewerName: string;
  reviewerAvatarUrl: string | null;
  reviewerLocation: string | null;
  comment: string;
  rating?: number;
  createdDate?: string;
}

export interface GetMentorReviewsResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: MentorReview[];
}

export const GetMentorReviewsQuery = async (mentorId: string): Promise<GetMentorReviewsResponse> => {
  try {
    const url = endpoints().admin.review(mentorId);
    const response = await axios.get<GetMentorReviewsResponse>(url);
    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "An error occurred.",
        data: [],
      };
    }
    const errorMessage =
      ((error as unknown) as { response?: { data?: { message?: string } } })?.response?.data?.message || "An unexpected error occurred.";
    return {
      isSuccess: false,
      statusCode: "500",
      message: errorMessage,
      data: [],
    };
  }
};
