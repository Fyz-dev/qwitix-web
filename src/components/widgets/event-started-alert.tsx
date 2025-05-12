import { AlertCircle } from 'lucide-react';
import { FC } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { EventStatus, ResponseEventDTO } from '@/gen/data-contracts';

interface EventStartedAlertProps {
  event: ResponseEventDTO;
  description?: boolean;
}

const EventStartedAlert: FC<EventStartedAlertProps> = ({
  event,
  description = true,
}) => {
  if (
    !(
      event.status === EventStatus.Scheduled &&
      event.startDate &&
      new Date(event.startDate) < new Date()
    )
  )
    return null;

  return (
    <Alert variant="destructive">
      <AlertCircle className="size-5!" />
      <AlertTitle className="text-base">
        Event has already started or ended
      </AlertTitle>
      {description && (
        <AlertDescription className="text-base">
          You can no longer buy tickets for this event.
        </AlertDescription>
      )}
    </Alert>
  );
};

export default EventStartedAlert;
