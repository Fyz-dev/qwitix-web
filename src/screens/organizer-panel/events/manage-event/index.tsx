'use client';

import { FC } from 'react';

import TicketDialogs from '../components/ticket-dialogs';
import VenueDialogs from '../components/venue-dialogs';
import { EventStoreProvider } from '../providers/event-store-provider';
import { TicketStoreProvider } from '../providers/ticket-store-provider';
import { VenueStoreProvider } from '../providers/venue-store-provider';

import EventInfo from './event-info';
import ManageForm from './manage-form';

import { Separator } from '@/components/ui/separator';
import { EventStatus, ResponseEventDTO } from '@/gen/data-contracts';

interface ManageEventPageProps {
  event: ResponseEventDTO;
}

const ManageEventPage: FC<ManageEventPageProps> = ({ event }) => {
  return (
    <EventStoreProvider event={event}>
      <TicketStoreProvider>
        <VenueStoreProvider venue={event.venue}>
          <div className="space-y-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-x-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Manage Event
                </h2>
                <p className="text-muted-foreground font-semibold">
                  Here's you can manage your event, tickets.
                </p>
              </div>
            </div>

            <Separator className="shadow-sm" />

            <div className="-mx-1 px-1.5 lg:max-w-xl">
              {event.status === EventStatus.Scheduled ? (
                <EventInfo event={event} />
              ) : (
                <ManageForm event={event} />
              )}
            </div>
          </div>

          <TicketDialogs />
          <VenueDialogs />
        </VenueStoreProvider>
      </TicketStoreProvider>
    </EventStoreProvider>
  );
};

export default ManageEventPage;
