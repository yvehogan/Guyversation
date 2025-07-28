export const endpoints = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || '';
  
  return {
    auth: {
      login: `/auth/login`,
      change_default_password: `/auth/change-default-password`,
      forgot_password: `/auth/forgot-password`,
      reset_password: `/auth/reset-password`,
      validateCode: `/auth/validate-reset-code`,
      verify_otp: `/auth/verify-otp`,
      resend_otp: `/auth/resend-otp`,
    },
    admin: {
      invite_user: `/admin/invite-user`,
      users: `/users`,
      revoke_user_access: `/admin/revoke-user-access`,
      user_details: `/users`,
      personal_details: `/users/me`,
    },
    communities: {
      create: `/communities`,
      list: `/communities`,
      detail: (communityId: string) => `/communities/${communityId}`,
      update: (communityId: string) => `/communities/${communityId}`,
      delete: (communityId: string) => `/communities/${communityId}`,
      join: (communityId: string) => `/communities/${communityId}/join`,
      leave: (communityId: string) => `/communities/${communityId}/leave`,
    },
    events: {
      create: `/events`,
      list: `/events`,
    },
    utilities: {
      language: `/utilities/languages`,
      expertises: `/utilities/expertises`,
      channels: `/utilities/channels`,
    },
    mentees: {
      list: `/mentormenteerelations/my-mentees?Status=Pending`,
      acceptMentee: `/mentormenteerelations/accept-mentee`,
      rejectMentee: `mentormenteerelations/reject-mentee`,
      details: (menteeId: string) => `/mentees/${menteeId}`,
      requests: `/mentees/requests`,
    }
  };
};
