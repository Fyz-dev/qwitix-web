'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2 } from 'lucide-react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useTicketStore } from '../providers/ticket-store-provider';

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
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { ResponseEventDTO, ResponseTicketDTO } from '@/gen/data-contracts';
import {
  useCreateTicketMutation,
  useUpdateTicketMutation,
} from '@/queries/hooks/ticket';
import { ticketSchema, TicketSchemaType } from '@/validations/ticket';

interface TicketCreateDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: ResponseEventDTO;
  ticket?: ResponseTicketDTO;
}

const TicketMutationDrawer: FC<TicketCreateDrawerProps> = ({
  open,
  onOpenChange,
  event,
  ticket,
}) => {
  const isUpdate = !!ticket;

  const { setOpen, setTicket } = useTicketStore(state => state);

  const createMutation = useCreateTicketMutation(event.id);
  const updateMutation = useUpdateTicketMutation(ticket?.id ?? '', event.id);

  const form = useForm<TicketSchemaType>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      name: ticket?.name || '',
      details: ticket?.details || '',
      price: ticket?.price || 0,
      quantity: ticket?.quantity || 1,
    },
  });

  const onClose = (open: boolean) => {
    onOpenChange(open);
    form.reset();
  };

  const onDelete = () => {
    onClose(false);

    setTicket(ticket);
    setOpen('delete');
  };

  const onSubmit = (data: TicketSchemaType) => {
    const promise = isUpdate
      ? updateMutation.mutateAsync({ ...data })
      : createMutation.mutateAsync({ ...data, eventId: event.id });

    const toastMessage = isUpdate
      ? {
          loading: 'Updating ticket...',
          success: 'Ticket updated!',
          error: 'Failed to update ticket.',
        }
      : {
          loading: 'Creating ticket...',
          success: 'Ticket created!',
          error: 'Failed to create ticket.',
        };

    toast.promise(promise, toastMessage);

    promise.then(() => onClose(false));
  };

  useEffect(() => {
    if (open)
      form.reset({
        name: ticket?.name || '',
        details: ticket?.details || '',
        price: ticket?.price || 0,
        quantity: ticket?.quantity || 1,
      });
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent onOpenAutoFocus={e => e.preventDefault()}>
        <SheetHeader>
          <SheetTitle>{isUpdate ? 'Edit Ticket' : 'Create Ticket'}</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Edit the ticket details as needed.'
              : 'Add a new ticket for event.'}
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id="ticket-form"
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-5 px-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="gap-0">
                    Name<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter a name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a details"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Price (USD)</FormLabel>
                  <FormControl>
                    <Input min={0} placeholder="0 $" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="gap-0">
                    Quantity<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input min={1} type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <SheetFooter className="flex-row">
          {isUpdate && (
            <Button type="button" variant="destructive" onClick={onDelete}>
              <Trash2 />
              Delete
            </Button>
          )}

          <Button form="ticket-form" type="submit" className="flex-1">
            {createMutation.isPending ? (
              <>
                <Spinner size="small" className="text-current" />
                Saving...
              </>
            ) : (
              'Save changes'
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default TicketMutationDrawer;
