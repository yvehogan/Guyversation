import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface GetChatProps {
  peerUserId: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface GetChatResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  metaData: null;
  data: ChatMessage[] | null;
}

const GetChatQuery = async (
  payload: GetChatProps
): Promise<GetChatResponse> => {
  try {
    const response = await axios.post<GetChatResponse>(
      endpoints().chat.chats,
      payload
    );

    return {
      isSuccess: response.status === 200,
      statusCode: response.status.toString(),
      message: response.data.message,
      metaData: response.data.metaData || null,
      data: response.data.data,
    };
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "An error occurred.",
        metaData: null,
        data: null,
      };
    }

    const errorMessage =
      ((error as unknown) as { response?: { data?: { message?: string } } })?.response?.data?.message || "An unexpected error occurred.";
    return {
      isSuccess: false,
      statusCode: "500",
      message: errorMessage,
      metaData: null,
      data: null,
    };
  }
};

export { GetChatQuery };
