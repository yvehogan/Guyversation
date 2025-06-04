import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface UtilityItem {
  id: string;
  name: string;
}

export interface UtilityResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: UtilityItem[];
}

export const getLanguages = async (): Promise<UtilityResponse> => {
  try {
    const response = await axios.get<UtilityResponse>(endpoints().utilities.language);
    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "Failed to fetch languages.",
        data: [],
      };
    }
    return {
      isSuccess: false,
      statusCode: "500",
      message: "An unexpected error occurred while fetching languages.",
      data: [],
    };
  }
};

export const getExpertises = async (): Promise<UtilityResponse> => {
  try {
    const response = await axios.get<UtilityResponse>(endpoints().utilities.expertises);
    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "Failed to fetch expertises.",
        data: [],
      };
    }
    return {
      isSuccess: false,
      statusCode: "500",
      message: "An unexpected error occurred while fetching expertises.",
      data: [],
    };
  }
};

export const getChannels = async (): Promise<UtilityResponse> => {
  try {
    const response = await axios.get<UtilityResponse>(endpoints().utilities.channels);
    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "Failed to fetch channels.",
        data: [],
      };
    }
    return {
      isSuccess: false,
      statusCode: "500",
      message: "An unexpected error occurred while fetching channels.",
      data: [],
    };
  }
};
