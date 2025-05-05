'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useOrganizerStore } from '../../providers/organizer-provider';
import { useVenueStore } from '../providers/venue-store-provider';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateEventMutation } from '@/queries/hooks/event';
import { Paths } from '@/utils/paths';
import { eventSchema, EventSchemaType } from '@/validations/event';

const CreateForm: FC = () => {
  const router = useRouter();

  const { setOpen: setDrawerVenueOpen, venue } = useVenueStore(state => state);
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
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="gap-0">
                Title<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormDescription>
                This is the title of your event. It should be descriptive and
                engaging.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add description for your event"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the description of your event. It should provide
                detailed information about what attendees can expect.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="gap-0">
                Category<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Add category for your event" {...field} />
              </FormControl>
              <FormDescription>
                This is the category of your event. It helps attendees find your
                event based on their interests.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="venue"
          render={() => (
            <FormItem>
              <FormLabel className="gap-0">
                Venue<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                {venue ? (
                  <Button
                    onClick={() => setDrawerVenueOpen('edit')}
                    type="button"
                    className="justify-between"
                    variant="outline"
                  >
                    {venue.name}
                    <Edit />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setDrawerVenueOpen('create')}
                    type="button"
                    variant="outline"
                  >
                    <Plus />
                    Create venue
                  </Button>
                )}
              </FormControl>
              <FormDescription>
                This is the venue of your event. It should provide detailed
                information about where the event will take place.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create event</Button>
      </form>
    </Form>
  );
};

export default CreateForm;
