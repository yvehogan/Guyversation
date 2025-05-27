import { endpoints } from '@/components/config/endpoints';
import { axios } from '@/components/lib/axios';
import axiosDefault from 'axios';

export interface NameEnquiryProps {
  accountNumber: string;
}

export interface NameEnquiryResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: {
    accountName: string;
    accountNumber: string;
    phoneNumber?: string;
    email?: string;
  };
}

const NameEnquiryQuery = async (
  payload: NameEnquiryProps
): Promise<NameEnquiryResponse> => {
  try {
    const response = await axios.get<NameEnquiryResponse>(
      `${endpoints().auth.verify_account}/${payload.accountNumber}`
    );
    return response.data;
  } catch (error) {
    if (axiosDefault.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        'Network error. Please check your connection.';
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred.');
  }
};

export { NameEnquiryQuery };
