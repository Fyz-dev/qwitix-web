import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { ticketQueryClient } from '../query-clients';

import {
  getTicketKey,
  getTicketListKey,
  getTicketListPrefixKey,
} from './query-key-helper';

import {
  BuyTicketDTO,
  CreateTicketDTO,
  ProblemDetails,
  ResponseBuyTicketDTO,
  UpdateTicketDTO,
} from '@/gen/data-contracts';
import { queryClient, useSession } from '@/providers';

export const useCreateTicketMutation = (eventId: string) => {
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
          queryKey: getTicketListKey({ eventId }),
        });
    },
  });
};

export const useBuyTicketMutation = () => {
  const { token } = useSession();

  return useMutation<
    AxiosResponse<ResponseBuyTicketDTO, void>,
    ProblemDetails,
    BuyTicketDTO
  >({
    mutationFn: async data => {
      return await ticketQueryClient(token).buyTicket(data);
    },
    onSuccess: (response, data) => {
      if (response.status === 200) {
        queryClient.invalidateQueries({
          queryKey: getTicketListPrefixKey(),
        });

        data.tickets.forEach(ticket => {
          queryClient.invalidateQueries({
            queryKey: getTicketKey(ticket.ticketId),
          });
        });

        queryClient.invalidateQueries({
          queryKey: getTicketListPrefixKey(),
        });
      }
    },
  });
};

export const useTicketListQuery = (
  query: Parameters<ReturnType<typeof ticketQueryClient>['getTicketList']>[0],
) => {
  const { token } = useSession();

  return useSuspenseQuery({
    queryKey: getTicketListKey(query),
    queryFn: async () => {
      return await ticketQueryClient(token).getTicketList(query);
    },
  });
};

export const useTicketQuery = (id: string) => {
  const { token } = useSession();

  return useSuspenseQuery({
    queryKey: getTicketKey(id),
    queryFn: async () => {
      return await ticketQueryClient(token).getTicket(id);
    },
  });
};

export const useUpdateTicketMutation = (id: string, eventId: string) => {
  const { token } = useSession();

  return useMutation<
    AxiosResponse<void, void>,
    ProblemDetails,
    UpdateTicketDTO
  >({
    mutationFn: async data => {
      return await ticketQueryClient(token).updateTicket(id, data);
    },
    onSuccess: response => {
      if (response.status === 200) {
        queryClient.invalidateQueries({
          queryKey: getTicketListKey({ eventId }),
        });

        queryClient.invalidateQueries({
          queryKey: getTicketKey(id),
        });
      }
    },
  });
};

export const useDeleteTicketMutation = (id: string) => {
  const { token } = useSession();

  return useMutation<AxiosResponse<void, void>, ProblemDetails>({
    mutationFn: async () => {
      return await ticketQueryClient(token).deleteTicket(id);
    },
    onSuccess: response => {
      if (response.status === 204)
        queryClient.invalidateQueries({
          queryKey: getTicketListPrefixKey(),
        });
    },
  });
};
