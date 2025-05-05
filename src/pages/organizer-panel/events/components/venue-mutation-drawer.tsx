'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { useVenueStore } from '../providers/venue-store-provider';

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
import { ResponseVenueDTO } from '@/gen/data-contracts';
import { venueSchema, VenueSchemaType } from '@/validations/venue';

interface VenueMutationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  venue?: ResponseVenueDTO;
}

const VenueMutationDrawer: FC<VenueMutationDrawerProps> = ({
  open,
  onOpenChange,
  venue,
}) => {
  const isUpdate = !!venue;
  const setVenue = useVenueStore(state => state.setVenue);

  const form = useForm<VenueSchemaType>({
    resolver: zodResolver(venueSchema),
    defaultValues: {
      name: venue?.name || '',
      address: venue?.address || '',
      city: venue?.city || '',
      state: venue?.state || '',
      zip: venue?.zip || '',
    },
  });

  const onClose = (open: boolean) => {
    onOpenChange(open);
    form.reset();
  };

  const onSubmit = (data: VenueSchemaType) => {
    setVenue(data);

    onClose(false);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent onOpenAutoFocus={e => e.preventDefault()}>
        <SheetHeader>
          <SheetTitle>{isUpdate ? 'Edit Venue' : 'Create Venue'}</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Edit the venue details as needed.'
              : '  Add a new venue for event.'}{' '}
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id="ticket-form"
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
              name="address"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="gap-0">
                    Address<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter a address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="gap-0">
                    City<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter a city" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter a state" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Zip</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter a zip" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          <Button form="ticket-form" type="submit">
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default VenueMutationDrawer;
