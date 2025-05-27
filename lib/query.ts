import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      retry: true,
      retryDelay: (attemptedIndex) =>
        Math.min(1000 * 2 ** attemptedIndex, 30000),
      refetchOnMount: false,
      refetchOnReconnect: true,
    },
    mutations: {
      onError: (error) => {
        console.error(error);
      },
    },
  },
});
