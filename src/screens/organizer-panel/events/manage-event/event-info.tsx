import { Ticket } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

import TicketList from '../components/ticket-list';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResponseEventDTO } from '@/gen/data-contracts';

interface EventInfoProps {
  event: ResponseEventDTO;
}

const EventInfo: FC<EventInfoProps> = ({ event }) => {
  return (
    <div className="space-y-8">
      <div className="grid gap-2">
        <label className="flex items-center text-sm leading-none font-medium">
          Title
        </label>
        <Input readOnly value={event.title} />
      </div>
      <div className="grid gap-2">
        <label className="flex items-center text-sm leading-none font-medium">
          Description
        </label>
        <Textarea
          readOnly
          value={event.description}
          placeholder="None description"
        />
      </div>

      <div className="grid gap-2">
        <label className="flex items-center text-sm leading-none font-medium">
          Banner
        </label>
        <div className="bg-muted relative flex h-[250px] w-full items-center justify-center overflow-hidden rounded-xl">
          {event.imgUrl ? (
            <>
              <div
                className="absolute inset-0 bg-center"
                style={{
                  backgroundImage: `url(${event.imgUrl})`,
                  filter: 'blur(10px)',
                }}
              />
              <Image
                width={500}
                height={500}
                src={event.imgUrl}
                alt={event.title}
                className="relative h-full w-full object-contain"
              />
            </>
          ) : (
            <Ticket className="size-8" />
          )}
        </div>
      </div>
      <div className="grid gap-2">
        <label className="flex items-center text-sm leading-none font-medium">
          Category
        </label>
        <Input readOnly value={event.category} />
      </div>
      <div className="grid gap-2">
        <label className="flex items-center text-sm leading-none font-medium">
          Venue
        </label>
        <Input readOnly value={event.venue.name} />
      </div>

      <div className="grid gap-2">
        <label className="flex items-center text-sm leading-none font-medium">
          Tickets
        </label>
        <TicketList
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-muted-foreground">
                There are no tickets available for this event.
              </span>
            </div>
          }
          isReadOnly
          event={event}
        />
      </div>

      {event.startDate && (
        <div className="grid gap-2">
          <label className="flex items-center text-sm leading-none font-medium">
            Start Date
          </label>
          <Input
            value={new Date(event.startDate).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            })}
            readOnly
          />
        </div>
      )}

      {event.endDate && (
        <div className="grid gap-2">
          <label className="flex items-center text-sm leading-none font-medium">
            End Date
          </label>
          <Input
            value={new Date(event.endDate).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            })}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default EventInfo;
