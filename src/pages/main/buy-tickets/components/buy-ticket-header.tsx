import { ArrowLeft, CalendarDays, MapPin, Ticket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { ResponseEventDTO } from '@/gen/data-contracts';
import { formatFullDateTime } from '@/utils/formatDate';
import { Paths } from '@/utils/paths';

interface BuyTicketHeaderProps {
  event: ResponseEventDTO;
}

const BuyTicketHeader: FC<BuyTicketHeaderProps> = ({ event }) => {
  const startDate = event.startDate
    ? formatFullDateTime(new Date(event.startDate))
    : undefined;
  const endDate = event.endDate
    ? formatFullDateTime(new Date(event.endDate))
    : undefined;

  return (
    <section className="flex gap-14">
      <div>
        <Button asChild size="icon" variant="outline">
          <Link href={Paths.Main.Event(event.id)}>
            <ArrowLeft />
          </Link>
        </Button>
      </div>
      <div className="flex w-full flex-col gap-14">
        <span className="text-3xl font-bold">Ticket options</span>
        <div className="flex w-full gap-12">
          <div className="bg-muted relative flex h-[240px] w-full items-center justify-center overflow-hidden rounded-xl">
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
          </div>
          <div className="flex w-full flex-col gap-5">
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <div className="flex items-center gap-2 truncate">
              <MapPin className="h-4 w-4" />
              <span className="truncate font-semibold">
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

            <div className="flex items-center gap-2 truncate">
              <CalendarDays className="h-4 w-4" />
              <span className="truncate font-semibold">{`${startDate} - ${endDate}`}</span>
            </div>

            <p className="line-clamp-4 text-balance">{event.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyTicketHeader;
