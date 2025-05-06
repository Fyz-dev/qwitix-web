import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { ticketQueryClient } from '../query-clients';

import { getTicketListPrefixKey } from './query-key-helper';

import { CreateTicketDTO, ProblemDetails } from '@/gen/data-contracts';
import { queryClient, useSession } from '@/providers';

export const useCreateTicketMutation = () => {
  const { token } = useSession();

  return useMutation<
    AxiosResponse<void, void>,
    ProblemDetails,
    CreateTicketDTO
  >({
    mutationFn: async data => {
      return await ticketQueryClient(token).createTicket(data);
    },
    onSuccess: response => {
      if (response.status === 204)
        queryClient.invalidateQueries({
          queryKey: getTicketListPrefixKey(),
        });
    },
  });
};
