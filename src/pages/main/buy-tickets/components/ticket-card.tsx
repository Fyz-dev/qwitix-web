import { Minus, Plus } from 'lucide-react';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ResponseTicketDTO } from '@/gen/data-contracts';

interface TicketCardProps {
  ticket: ResponseTicketDTO;
}

const TicketCard: FC<TicketCardProps> = ({ ticket }) => {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-6 text-center">
        <span className="text-2xl font-bold">{ticket.name}</span>
        <p className="text-pretty">{ticket.details}</p>

        <span className="mt-auto text-2xl font-bold">USD {ticket.price}</span>
        <div className="flex items-center justify-center gap-6">
          <Button variant="outline" size="icon">
            <Minus />
          </Button>

          <span className="text-muted-foreground text-2xl font-bold">0</span>

          <Button variant="outline" size="icon">
            <Plus />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
