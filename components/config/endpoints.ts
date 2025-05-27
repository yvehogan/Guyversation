import { trace } from "console";

export const endpoints = (
  id?: string | number,
  organizationId?: string,
  projectId?: string
) => {
  return {
    auth: {
      login: `/auth/login`,
      register: `/auth/register-organization`,
      verify_email: `/auth/verify-email`,
      confirm_email: `/auth/email-confirmation`,
      logout: `/logout`,
      forgot_password: `/auth/forgot-password`,
      validateCode: `/auth/validate-reset-code`,
      resetPassword: `/auth/reset-password`,
      documentation: `/auth/documentation`,
      verify_account: `/services/name-enquiry`,
    },
    admin: {
      invite_user: `/admin/invite-user`,
      users: `/users`,
    },
    communities: {
      create: `/communities`,
      list: `/communities`,
      detail: (communityId: string) => `/communities/${communityId}`,
      update: (communityId: string) => `/communities/${communityId}`,
      delete: (communityId: string) => `/communities/${communityId}`,
      join: (communityId: string) => `/communities/${communityId}/join`,
      leave: (communityId: string) => `/communities/${communityId}/leave`,
    }
  };
};
