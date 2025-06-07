import axios, { AxiosError } from "axios";

export const handleAxiosError = <T>(error: unknown, genericMessage: string) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response && typeof axiosError.response.data === "string") {
      return {
        success: false,
        message: axiosError.response.data || genericMessage,
        status: axiosError.response.status,
      };
    } else if (
      axiosError.response &&
      axiosError.response.data &&
      typeof axiosError.response.data === "object" &&
      "message" in axiosError.response.data
    ) {
      const errorResponse = axiosError.response.data as T;
      const withErrors = errorResponse as {
        message: string;
        status: string;
        statusCode: string;
      };
      return {
        success: false,
        message: withErrors.message,
        statusCode: withErrors.statusCode,
        status: withErrors.status,
      };
    } else if (
      axiosError.response &&
      axiosError.response.data &&
      typeof axiosError.response.data === "object" &&
      "error" in axiosError.response.data
    ) {
      const errorResponse = axiosError.response.data as { error: string };
      return {
        success: false,
        message: errorResponse.error || genericMessage,
        status: axiosError.response.status,
      };
    } else {
      const responseData = axiosError.response?.data as {
        errors?: { message: string }[];
      };
      return {
        success: false,
        message: responseData.errors
          ? responseData.errors[0].message
          : genericMessage,
      };
    }
  } else {
    const genericError = error as Error;
    return {
      success: false,
      message: genericError.message || genericMessage,
    };
  }
};
