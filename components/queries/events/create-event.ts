import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";
import Cookies from "js-cookie";

export interface CreateEventProps {
  title: string;
  description?: string;
  eventType?: string;
  eventUrl?: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location?: string;
}

export interface CreateEventResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: {
    id: string;
    title: string;
    description?: string;
    eventType?: string;
    eventUrl?: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    location?: string;
    createdBy: string;
    createdAt: string;
  } | null;
  metaData: any;
}

export const CreateEventMutation = async (
  eventData: CreateEventProps
): Promise<CreateEventResponse> => {
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

    const formData = new FormData();
    
    formData.append('Title', eventData.title || "");
    formData.append('Description', eventData.description || "");
    formData.append('EventType', eventData.eventType || "General");
    formData.append('StartDate', eventData.startDate);
    formData.append('StartTime', eventData.startTime);
    formData.append('EndDate', eventData.endDate);
    formData.append('EndTime', eventData.endTime);
    formData.append('Location', eventData.location || "");
    formData.append('EventUrl', eventData.eventUrl || "");

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';
    const endpoint = endpoints().events.create;
    const url = `${baseUrl}${endpoint}`;
    
    const response = await axiosDefault.post(url, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });


    return {
      isSuccess: true,
      statusCode: "200",
      message: response.data?.message || "Event created successfully",
      data: response.data?.data || null,
      metaData: response.data?.metaData || null,
    };
  } catch (error: any) {
    console.error('Error creating event:', error);
    
    if (axiosDefault.isAxiosError(error) && error.response) {
      console.error('API Error Response:', error.response.data);
      console.error('Request payload that caused error:', error.config?.data);
      
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: error.response.data?.message || "Failed to create event",
        data: error.response.data?.data || null,
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
