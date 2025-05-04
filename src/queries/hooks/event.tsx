import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { eventQueryClient } from '../query-clients';

import { CreateEventDTO, ProblemDetails } from '@/gen/data-contracts';

export const useCreateEventMutation = () => {
  return useMutation<AxiosResponse<void, void>, ProblemDetails, CreateEventDTO>(
    {
      mutationFn: async data => {
        return await (await eventQueryClient()).createEvent(data);
      },
      onSuccess: response => {
        // if (response.status === 204) {
        // }
      },
    },
  );
};
