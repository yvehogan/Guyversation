import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";


export interface DocumentationProps {
  UserId: string;
  OrganizationId: string;
  Logo: File;
  SCUMLFile: File;
  HumanitarianWork: File;
  HandleLink: string[];
}

export interface DocumentationResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: unknown;
  metaData: null;
}

const DocumentationMutation = async (payload: FormData) => {
  try {
    const response = await axios.post<DocumentationResponse>(
      endpoints().auth.documentation,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    
    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        "Network error. Please check your connection.";
      throw new Error(errorMessage);
    }
    throw new Error("An unexpected error occurred.");
  }
};

export { DocumentationMutation };