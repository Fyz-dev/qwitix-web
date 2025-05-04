import {
  Copy,
  Edit,
  EllipsisVertical,
  MapPin,
  Tag,
  Ticket,
  Trash2,
} from 'lucide-react';
import { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EventStatus, ResponseEventDTO } from '@/gen/data-contracts';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: ResponseEventDTO;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  return (
    <Card className="flex flex-row items-center px-6">
      <div className="bg-muted flex h-[70px] w-[110px] items-center justify-center rounded-xl">
        <Ticket />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <div className="item-center flex flex-row gap-3">
          <span className="text-xl font-semibold">{event.title}</span>
          <Badge
            variant="secondary"
            className={cn(
              'rounded-full',
              event.status === EventStatus.Scheduled &&
                'bg-green-100 text-green-800',
            )}
          >
            {event.status}
          </Badge>
        </div>
        <div className="text-muted-foreground flex flex-row items-center gap-4">
          <div className="inline-flex items-center gap-1">
            <Tag className="h-4 w-4" />
            <span>{event.category}</span>
          </div>
          <div className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>
              {[
                event.venue.zip,
                event.venue.address,
                event.venue.city,
                event.venue.state,
              ]
                .filter(Boolean)
                .join(', ')}
            </span>
          </div>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="ml-auto">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Edit className="text-foreground" />
              <span>Manage Event</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="text-foreground" />
              <span>Duplicate</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 className="text-foreground" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
};

export default EventCard;
