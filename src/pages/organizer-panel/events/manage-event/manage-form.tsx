'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
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
import {
  useDeleteEventMutation,
  useUpdateEventMutation,
  useUploadImageEventMutation,
} from '@/queries/hooks/event';
import { eventSchema, EventSchemaType } from '@/validations/event';
interface ManageFormProps {
  event: ResponseEventDTO;
}

const ManageForm: FC<ManageFormProps> = ({ event }) => {
  const [isLoading, setIsLoading] = useState(false);

  const venue = useVenueStore(state => state.venue);
  const setDrawerTicketOpen = useTicketStore(state => state.setOpen);

  const updateEventMutation = useUpdateEventMutation(event.id);
  const uploadImageEventMutation = useUploadImageEventMutation();
  const deleteImageEventMutation = useDeleteEventMutation(event.id);

  const form = useForm<EventSchemaType>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event.title,
      description: event.description || '',
      category: event.category,
      venue: event.venue,
      imgFile: [],
    },
  });

  const onSubmit = (data: EventSchemaType) => {
    setIsLoading(true);

    const updateEventPromise = updateEventMutation.mutateAsync({
      ...data,
    });

    toast.promise(updateEventPromise, {
      loading: 'Saving event...',
      success: 'Event successfully saved!',
      error: 'Failed to save event.',
    });

    updateEventPromise
      .then(async () => {
        const hadImage = !!event.imgUrl;

        if (data.imgFile && data.imgFile.length > 0) {
          const uploadImagePromise = uploadImageEventMutation.mutateAsync({
            id: event.id,
            Image: data.imgFile[0],
          });

          toast.promise(uploadImagePromise, {
            loading: 'Uploading image...',
            success: 'Image successfully uploaded!',
            error: 'Failed to upload image.',
          });

          await uploadImagePromise;
        } else if (hadImage && !(data.imgFile && data.imgFile.length > 0)) {
          const deleteImagePromise = deleteImageEventMutation.mutateAsync();

          toast.promise(deleteImagePromise, {
            loading: 'Deleting image...',
            success: 'Image successfully deleted!',
            error: 'Failed to delete image.',
          });

          await deleteImagePromise;
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (venue) form.setValue('venue', venue);
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

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
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
