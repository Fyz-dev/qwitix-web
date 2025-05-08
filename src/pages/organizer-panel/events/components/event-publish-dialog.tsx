'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ResponseEventDTO } from '@/gen/data-contracts';
import { usePublishEventMutation } from '@/queries/hooks/event';
import {
  eventSchemaPublish,
  EventSchemaPublishType,
} from '@/validations/event';

interface EventDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: ResponseEventDTO;
}

const EventPublishDialog: FC<EventDeleteDialogProps> = ({
  open,
  onOpenChange,
  event,
}) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const publishEvent = usePublishEventMutation(event.id);

  const form = useForm<EventSchemaPublishType>({
    resolver: zodResolver(eventSchemaPublish),
    defaultValues: {
      startDate: tomorrow,
      endDate: undefined,
    },
  });

  const startDate = form.watch('startDate');

  const onSubmit = (data: EventSchemaPublishType) => {
    const promise = publishEvent.mutateAsync(data);

    toast.promise(promise, {
      loading: 'Publishing event...',
      success: () => 'Event successfully published!',
      error: 'Failed to publish event.',
    });

    onClose(false);
  };

  const onClose = (open: boolean) => {
    onOpenChange(open);
  };

  useEffect(() => {
    if (open)
      form.reset({
        startDate: tomorrow,
        endDate: undefined,
      });
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        onInteractOutside={e => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to publish this event?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will make the event visible to
            all users.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="event-publish-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-5"
          >
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="gap-0">
                    Start date<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <DateTimePicker
                      {...field}
                      min={tomorrow}
                      use12HourFormat
                      timePicker={{ hour: true, minute: true }}
                      modal
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="gap-0">
                    End date<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <DateTimePicker
                      {...field}
                      min={startDate}
                      use12HourFormat
                      timePicker={{ hour: true, minute: true }}
                      modal
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>

          <Button form="event-publish-form" type="submit">
            Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventPublishDialog;
