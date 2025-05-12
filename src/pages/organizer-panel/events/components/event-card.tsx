'use client';

import {
  Copy,
  Edit,
  EllipsisVertical,
  MapPin,
  Rocket,
  Tag,
  Ticket,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { toast } from 'sonner';

import { useEventStore } from '../providers/event-store-provider';

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
import { useCreateEventMutation } from '@/queries/hooks/event';
import { Paths } from '@/utils/paths';

interface EventCardProps {
  event: ResponseEventDTO;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  const duplicateMutation = useCreateEventMutation();

  const { setOpen: setDialogEventOpen, setEvent } = useEventStore(
    state => state,
  );

  const onDuplicate = () => {
    const promise = duplicateMutation.mutateAsync({
      ...event,
    });

    toast.promise(promise, {
      loading: 'Duplicating event...',
      success: () => 'Event successfully duplicated!',
      error: 'Failed to duplicate event.',
    });
  };

  return (
    <Card className="relative flex flex-row items-center px-6">
      <Link
        className="absolute inset-0"
        href={Paths.Organizer.ManageEvent(event.id)}
      />
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
      {event.status !== EventStatus.Scheduled && (
        <DropdownMenu>
          <DropdownMenuTrigger className="relative" asChild>
            <Button variant="ghost" className="ml-auto">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  setEvent(event);
                  setDialogEventOpen('publish');
                }}
              >
                <Rocket className="text-foreground" />
                <span>Publish</span>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={Paths.Organizer.ManageEvent(event.id)}>
                  <Edit className="text-foreground" />
                  <span>Manage Event</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDuplicate}>
                <Copy className="text-foreground" />
                <span>Duplicate</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setEvent(event);
                  setDialogEventOpen('delete');
                }}
              >
                <Trash2 className="text-foreground" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Card>
  );
};

export default EventCard;
