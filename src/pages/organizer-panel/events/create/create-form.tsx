'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useOrganizerStore } from '../../providers/organizer-provider';
import EventMutationFormField from '../components/event-mutation-form-field';
import { useVenueStore } from '../providers/venue-store-provider';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import { useCreateEventMutation } from '@/queries/hooks/event';
import { Paths } from '@/utils/paths';
import { eventSchema, EventSchemaType } from '@/validations/event';

const CreateForm: FC = () => {
  const router = useRouter();

  const venue = useVenueStore(state => state.venue);
  const organizer = useOrganizerStore(state => state.organizer);

  const createEventMutation = useCreateEventMutation();

  const form = useForm<EventSchemaType>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      venue: undefined,
    },
  });

  const onSubmit = (data: EventSchemaType) => {
    const promise = createEventMutation.mutateAsync({
      ...data,
      organizerId: organizer.id,
    });

    toast.promise(promise, {
      loading: 'Creating event...',
      success: 'Event successfully created!',
      error: 'Failed to create event.',
    });

    promise.then(() => {
      router.push(Paths.Organizer.Events);
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

        <Button type="submit" disabled={createEventMutation.isPending}>
          {createEventMutation.isPending ? (
            <>
              <Spinner size="small" className="text-current" />
              Creating...
            </>
          ) : (
            'Create event'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateForm;
