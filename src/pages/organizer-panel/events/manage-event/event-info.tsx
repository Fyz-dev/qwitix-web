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
    </div>
  );
};

export default EventInfo;
