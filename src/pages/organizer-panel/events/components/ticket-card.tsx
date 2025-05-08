'use client';

import { Edit } from 'lucide-react';
import { FC } from 'react';

import { useTicketStore } from '../providers/ticket-store-provider';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ResponseTicketDTO } from '@/gen/data-contracts';

interface TicketCardProps {
  ticket: ResponseTicketDTO;
}

const TicketCard: FC<TicketCardProps> = ({ ticket }) => {
  const { setOpen, setTicket } = useTicketStore(state => state);

  return (
    <Card className="flex-row items-center justify-between px-3 py-2">
      <div className="flex flex-col gap-1">
        <span className="text-sm">
          {ticket.name} {`(0/${ticket.quantity})`}
        </span>

        <span className="text-muted-foreground text-xs">
          You get: ${ticket.price}
        </span>

        <Badge asChild className="items-center" variant="secondary">
          <div>
            <div className="mt-0.5 size-3 rounded-full bg-[#00F0B3]" />
            Sales end before the event
          </div>
        </Badge>
      </div>

      <Button
        className="text-muted-foreground"
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => {
          setTicket(ticket);
          setOpen('edit');
        }}
      >
        <Edit />
      </Button>
    </Card>
  );
};

export default TicketCard;
