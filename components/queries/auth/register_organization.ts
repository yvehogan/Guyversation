import { endpoints } from "@/components/config/endpoints";
import { axios } from "@/lib/axios";
import axiosDefault from "axios";

export interface RegisterOrganizationProps {
  organizationName: string;
  Email: string;
  OrganizationPhoneNumber: string;
  organizationAddress: string;
  contactPersonFirstName: string;
  contactPersonLastName: string;
  Category: string;
  GeopoliticalLocation: string;
  OrganizationAccountNumber: string;
  Password: string;
  ConfirmPassword: string;
}

export interface RegisterOrganizationResponse {
  data: {
    organizationId: string;
    organizationName: string;
    contactPersonId: string;
  };
}

const RegisterOrganizationMutation = async (payload: RegisterOrganizationProps) => {
  const formData = new FormData();
  
  formData.append("Email", payload.Email);
  formData.append("Password", payload.Password || "");
  formData.append("ConfirmPassword", payload.ConfirmPassword || "");
  formData.append("ContactPersonFirstName", payload.contactPersonFirstName);
  formData.append("ContactPersonLastName", payload.contactPersonLastName);
  formData.append("OrganizationPhoneNumber", payload.OrganizationPhoneNumber);
  formData.append("OrganizationName", payload.organizationName);
  
  if (payload.OrganizationAccountNumber) {
    formData.append("OrganizationAccountNumber", payload.OrganizationAccountNumber);
  }
  
  if (payload.Category) {
    formData.append("Category", payload.Category);
  }
  
  if (payload.GeopoliticalLocation) {
    formData.append("GeopoliticalLocation", payload.GeopoliticalLocation);
  }
  
  try {
    const response = await axios.post<RegisterOrganizationResponse>(
      `${endpoints().auth.register}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("API response status:", response.status);
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    if (axiosDefault.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        "Network error. Please check your connection.";
      throw new Error(errorMessage);
    }

    throw new Error("An unexpected error occurred.");
  }
};

export { RegisterOrganizationMutation };