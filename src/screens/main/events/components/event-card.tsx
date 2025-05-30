import { MapPin, Tag, Ticket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { ResponseEventDTO } from '@/gen/data-contracts';
import { formatDateShort } from '@/utils/formatDate';
import { Paths } from '@/utils/paths';

interface EventCardProps {
  event: ResponseEventDTO;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  const date = event.startDate
    ? formatDateShort(new Date(event.startDate))
    : undefined;

  return (
    <Card className="relative gap-2 pt-0">
      <Link href={Paths.Main.Event(event.id)} className="absolute inset-0" />

      <div className="bg-muted relative flex h-[184px] w-full items-center justify-center overflow-hidden rounded-xl">
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
          <Ticket />
        )}

        <Link href={Paths.Main.Event(event.id)} className="absolute inset-0" />
      </div>
      <CardContent className="flex flex-row items-center gap-6">
        <div className="flex flex-col text-center font-semibold">
          <span className="uppercase">{date?.month}</span>
          <span>{date?.day}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 truncate">
            <Tag className="h-4 w-4" />
            <span className="capitalize">{event.category}</span>
          </div>

          <span className="truncate text-lg font-semibold">{event.title}</span>

          <div className="flex items-center gap-2 truncate">
            <MapPin className="h-4 w-4" />
            <span className="text-muted-foreground truncate">
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
      </CardContent>
    </Card>
  );
};

export default EventCard;
