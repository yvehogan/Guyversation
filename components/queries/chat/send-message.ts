import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface SendMessageProps {
  chatId: string;
  content: string;
}

export interface SendMessageResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  metaData: null;
  data: {
    id: string;
    content: string;
    userId: string;
    sentAt: string;
    isRead: boolean;
    createdDate: string;
    attachments: any[];
  } | null;
}

const SendMessageQuery = async (
  payload: SendMessageProps
): Promise<SendMessageResponse> => {
  try {
    console.log("Sending message:", payload.content);
    
    const formData = new FormData();
    formData.append('Content', payload.content);
    
    const response = await axios.post<SendMessageResponse>(
      endpoints().chat.send_message(payload.chatId),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
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

export { SendMessageQuery };
