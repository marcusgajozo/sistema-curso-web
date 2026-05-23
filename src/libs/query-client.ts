import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';

const handleErrors = (error: Error) => {
  if (error instanceof z.ZodError) {
    toast.error('Error ao validar dados!');
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 30000,
      throwOnError: (error) => {
        handleErrors(error);
        return false;
      },
    },
  },
});
