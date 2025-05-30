import { CalendarDays, MapPin, Ticket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import EventStartedAlert from '@/components/widgets/event-started-alert';
import { EventStatus, ResponseEventDTO } from '@/gen/data-contracts';
import { formatFullDateTime } from '@/utils/formatDate';
import { Paths } from '@/utils/paths';

interface EventPageProps {
  event: ResponseEventDTO;
}

const EventPage: FC<EventPageProps> = ({ event }) => {
  const startDate = event.startDate
    ? formatFullDateTime(new Date(event.startDate))
    : undefined;
  const endDate = event.endDate
    ? formatFullDateTime(new Date(event.endDate))
    : undefined;

  return (
    <div className="my-14 flex flex-col gap-9">
      <EventStartedAlert
        description={event.tickets && event.tickets.length > 0}
        event={event}
      />

      <div className="bg-muted relative flex h-[348px] w-full items-center justify-center overflow-hidden rounded-xl">
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
      <section className="flex justify-between">
        <div className="flex flex-2/3 flex-col gap-4">
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <div className="flex flex-col gap-2">
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
          </div>
        </div>
        <div className="flex-1/5">
          {event.tickets && event.tickets.length > 0 && (
            <Card>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="flex flex-col text-center">
                  <span className="text-muted-foreground">
                    Tickets starting at
                  </span>
                  <span className="text-xl font-semibold">
                    USD {Math.min(...event.tickets.map(t => t.price))}
                  </span>
                </div>
                {!(
                  event.status === EventStatus.Scheduled &&
                  event.startDate &&
                  new Date(event.startDate) < new Date()
                ) && (
                  <Button asChild className="w-full">
                    <Link href={Paths.Main.BuyTickets(event.id)}>
                      Buy tickets
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </section>
      {event.description && (
        <section>
          <h2 className="mb-2 text-2xl font-bold">Event Information</h2>
          <p className="text-pretty">{event.description}</p>
        </section>
      )}

      <section>
        <Card className="py-2">
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg">
                  Terms & Condition
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-muted-foreground space-y-4 text-sm">
                    <p>
                      By purchasing tickets on this website, you agree to the
                      following terms and conditions. Please read them
                      carefully.
                    </p>
                    <p>
                      <strong>1. Ticket Purchase:</strong> All sales are final.
                      Once a ticket is purchased, it cannot be refunded or
                      exchanged unless the event is canceled.
                    </p>
                    <p>
                      <strong>2. Event Changes:</strong> The event organizer
                      reserves the right to make changes to the event (e.g.,
                      date, venue, or lineup) without prior notice. In such
                      cases, refunds may not be issued.
                    </p>
                    <p>
                      <strong>3. Entry Requirements:</strong> You must present a
                      valid ticket (digital or printed) to gain entry to the
                      event. Additional ID may be required.
                    </p>
                    <p>
                      <strong>4. Liability:</strong> We are not responsible for
                      any personal injury, loss, or damage sustained during the
                      event.
                    </p>
                    <p>
                      <strong>5. Prohibited Activities:</strong> Reselling
                      tickets for profit is strictly prohibited. Unauthorized
                      duplication of tickets may result in denial of entry.
                    </p>
                    <p>
                      <strong>6. Privacy:</strong> We respect your privacy.
                      Personal information collected during the purchase process
                      is handled according to our Privacy Policy.
                    </p>
                    <p>
                      <strong>7. Contact:</strong> For any inquiries or support,
                      please contact our customer service team.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default EventPage;
