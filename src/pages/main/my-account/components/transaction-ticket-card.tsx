import { Tag } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import { ResponseTicketDTO } from '@/gen/data-contracts';
import { Paths } from '@/utils/paths';

interface TransactionTicketCardProps {
  ticket: ResponseTicketDTO;
}

const TransactionTicketCard: FC<TransactionTicketCardProps> = ({ ticket }) => {
  return (
    <Link
      key={ticket.id}
      href={Paths.Main.Event(ticket.eventId)}
      className="block rounded-md bg-gray-50 p-2 text-sm"
    >
      <div className="mb-1 flex items-center justify-between">
        <span className="font-medium">{ticket.name}</span>
        <Badge variant="outline" className="text-xs">
          ID: {ticket.id}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
        <div className="flex items-center">
          <Tag className="mr-1 h-3 w-3" />
          {ticket.quantity} × ${ticket.price}
        </div>

        <div className="text-right font-medium">
          ${ticket.quantity * ticket.price}
        </div>
      </div>
    </Link>
  );
};

export default TransactionTicketCard;
