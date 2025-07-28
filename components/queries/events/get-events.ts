import { endpoints } from "@/components/config/endpoints";
import axiosDefault from "axios";
import Cookies from "js-cookie";

export interface EventInterface {
  id: string;
  title: string;
  description: string;
  eventType: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  attendeeCount: number;
}

export interface GetEventsResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: EventInterface[] | null;
  metaData: {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  } | null;
}

export const GetEventsQuery = async (
  eventType?: string,
  page: number = 1,
  pageSize: number = 10,
  search?: string
): Promise<GetEventsResponse> => {
  try {
    const token = Cookies.get("GUYVERSATION_ACCESS_TOKEN");
    if (!token) {
      return {
        isSuccess: false,
        statusCode: "401",
        message: "Authentication required",
        data: null,
        metaData: null,
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';
    const endpoint = endpoints().events.list;
    
    const queryParams = new URLSearchParams();
    queryParams.append('PageNumber', page.toString());
    queryParams.append('PageSize', pageSize.toString());
    
    if (eventType) {
      queryParams.append('eventType', eventType);
    }
    
    if (search) {
      queryParams.append('SearchKey', search);
    }
    
    const queryString = queryParams.toString();
    const url = `${baseUrl}${endpoint}${queryString ? `?${queryString}` : ''}`;
    
    
    const response = await axiosDefault.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return {
      isSuccess: true,
      statusCode: "200",
      message: "Events retrieved successfully",
      data: response.data?.data || null,
      metaData: response.data?.metaData || null,
    };
  } catch (error: any) {
    console.error('Error fetching events:', error);
    
    if (axiosDefault.isAxiosError(error) && error.response) {
      console.error('API Error Response:', error.response.data);
      
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "Failed to fetch events",
        data: null,
        metaData: null,
      };
    }
    
    return {
      isSuccess: false,
      statusCode: "500",
      message: error.message || "An unexpected error occurred",
      data: null,
      metaData: null,
    };
  }
};
