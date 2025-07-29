import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface AcceptedMentee {
  id: string;
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

export const GetAcceptedMenteesQuery = async (): Promise<GetAcceptedMenteesResponse> => {
  try {
    const response = await axios.get<GetAcceptedMenteesResponse>(
      endpoints().mentees.mentees
    );
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
