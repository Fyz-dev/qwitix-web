'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import EventMutationFormField from '../components/event-mutation-form-field';
import TicketList from '../components/ticket-list';
import { useTicketStore } from '../providers/ticket-store-provider';
import { useVenueStore } from '../providers/venue-store-provider';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import { ResponseEventDTO } from '@/gen/data-contracts';
import { useUpdateEventMutation } from '@/queries/hooks/event';
import { eventSchema, EventSchemaType } from '@/validations/event';

interface ManageFormProps {
  event: ResponseEventDTO;
}

const ManageForm: FC<ManageFormProps> = ({ event }) => {
  const venue = useVenueStore(state => state.venue);
  const setDrawerTicketOpen = useTicketStore(state => state.setOpen);

  const createEventMutation = useUpdateEventMutation(event.id);

  const form = useForm<EventSchemaType>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event.title,
      description: event.description || '',
      category: event.category,
      venue: event.venue,
    },
  });

  const onSubmit = (data: EventSchemaType) => {
    const promise = createEventMutation.mutateAsync({
      ...data,
    });

    toast.promise(promise, {
      loading: 'Saving event...',
      success: 'Event successfully saved!',
      error: 'Failed to save event.',
    });
  };

  useEffect(() => {
    if (venue)
      form.setValue('venue', venue, {
        shouldValidate: true,
      });
  }, [venue]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <EventMutationFormField form={form} />
        <FormField
          name="tickets"
          render={() => (
            <FormItem>
              <FormLabel className="gap-0">Tickets</FormLabel>

              <TicketList event={event} />

              <FormControl>
                <Button
                  onClick={() => setDrawerTicketOpen('create')}
                  type="button"
                  variant="outline"
                >
                  <Plus />
                  Add Ticket
                </Button>
              </FormControl>
              <FormDescription>
                Tickets define how many people can attend and how much they need
                to pay. You can offer multiple ticket types with different
                prices and limits.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={createEventMutation.isPending}>
          {createEventMutation.isPending ? (
            <>
              <Spinner size="small" className="text-current" />
              Saving...
            </>
          ) : (
            'Save'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ManageForm;
