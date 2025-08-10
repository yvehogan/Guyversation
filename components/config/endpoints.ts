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
      dashboard: `/dashboard/admin-statistics`,
      mentor_dashboard: `/dashboard/mentor-statistics`,
    },
    communities: {
      create: `/communities`,
      list: `/communities`,
      detail: (communityId: string) => `/communities/${communityId}`,
      update: (communityId: string) => `/communities/${communityId}`,
      delete: (communityId: string) => `/communities/${communityId}`,
      join: (id: string) => `/communities/${id}/join`,
      leave: (communityId: string) => `/communities/${communityId}/leave`,
      myCommunities: `/communities/my-communities`,
      getPosts: (communityId: string) => `/communities/${communityId}/posts`,
      createPost: (communityId: string) => `/communities/${communityId}/posts`,
      updatePost: (postId: string) => `/communities/posts/${postId}`,
      deletePost: (postId: string) => `/communities/posts/${postId}`,
      likePost: (postId: string) => `/communities/posts/${postId}/like`,
      
    },
    events: {
      create: `/events`,
      list: `/events`,
      register: (id: string) => `/events/${id}/register`,
    },
    utilities: {
      language: `/utilities/languages`,
      expertises: `/utilities/expertises`,
      channels: `/utilities/channels`,
    },
    mentees: {
      list: `/mentormenteerelations/my-mentees?Status=Pending`,
      mentees: `/mentormenteerelations/my-mentees?Status=Accepted`,
      acceptMentee: `/mentormenteerelations/accept-mentee`,
      rejectMentee: `mentormenteerelations/reject-mentee`,
      details: (menteeId: string) => `/mentees/${menteeId}`,
      requests: `/mentees/requests`,
    },
    chat: {
      chats: `/chats`,
      send_message: (chatId: string) => `/chats/${chatId}/messages`,
      receive_message: (chatId: string) => `/chats/${chatId}/messages`,
    },
    mentor: {
      my_sessions: `/mentorshipsessionmanagement/booked-sessions`
    }
  };
};


