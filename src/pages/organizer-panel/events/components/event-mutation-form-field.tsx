'use client';

import { Edit, Plus } from 'lucide-react';
import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useVenueStore } from '../providers/venue-store-provider';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { EventSchemaType } from '@/validations/event';

interface EventMutationFormFieldProps {
  form: UseFormReturn<EventSchemaType>;
}

const EventMutationFormField: FC<EventMutationFormFieldProps> = ({ form }) => {
  const { setOpen: setDrawerVenueOpen, venue } = useVenueStore(state => state);

  return (
    <>
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
              This is the description of your event. It should provide detailed
              information about what attendees can expect.
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
                  Add venue
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
    </>
  );
};

export default EventMutationFormField;
