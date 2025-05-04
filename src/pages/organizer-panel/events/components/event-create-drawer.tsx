'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useAccountOrganizerQuery } from '@/queries/hooks/account';
import { useCreateEventMutation } from '@/queries/hooks/event';
import { useAuthUser } from '@/stores';
import { eventSchema, EventSchemaType } from '@/validations/event';

interface EventCreateDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EventCreateDrawer: FC<EventCreateDrawerProps> = ({
  open,
  onOpenChange,
}) => {
  const user = useAuthUser(state => state.user);

  const {
    data: { data: accountOrganizer },
  } = useAccountOrganizerQuery(user?.id);

  const createEventMutation = useCreateEventMutation();

  const form = useForm<EventSchemaType>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
    },
  });

  const onClose = (open: boolean) => {
    onOpenChange(open);
    form.reset();
  };
  const onSubmit = (data: EventSchemaType) => {
    createEventMutation.mutateAsync({
      ...data,
      organizerId: accountOrganizer.id,
      venue: {
        name: 'Test Name',
        address: 'Test Address',
        city: 'Test City',
        state: 'Test State',
        zip: '12345',
      },
    });

    onClose(false);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={open => {
        onClose(open);
      }}
    >
      <SheetContent className="flex w-[30%] flex-col sm:max-w-none">
        <SheetHeader>
          <SheetTitle>Create Event</SheetTitle>
          <SheetDescription>
            Add a new event by providing the required information. Click save
            when you're done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id="event-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-5 px-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="gap-0">
                    Title<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter a title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter a description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="gap-0">
                    Category<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter a category" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className="flex-row justify-end gap-2">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          <Button form="event-form" type="submit">
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EventCreateDrawer;
