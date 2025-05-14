import { EventStatus, ResponseEventDTO } from '@/gen/data-contracts';

const BADGE_CLASSES = {
  LIVE: 'bg-green-100 text-green-800',
  ENDED: 'bg-red-100 text-red-800',
  SCHEDULED: 'bg-blue-100 text-blue-800',
  DEFAULT: 'bg-muted text-muted-foreground',
};

export const getEventStatus = (event: ResponseEventDTO) => {
  const now = Date.now();
  const start = event.startDate ? new Date(event.startDate).getTime() : null;
  const end = event.endDate ? new Date(event.endDate).getTime() : null;

  if (
    event.status === EventStatus.Scheduled &&
    start !== null &&
    end !== null
  ) {
    if (start < now && end > now) {
      return { label: EventStatus.Live, badgeClass: BADGE_CLASSES.LIVE };
    } else if (end <= now) {
      return { label: EventStatus.Ended, badgeClass: BADGE_CLASSES.ENDED };
    } else {
      return {
        label: EventStatus.Scheduled,
        badgeClass: BADGE_CLASSES.SCHEDULED,
      };
    }
  }

  // Default return if no condition matches
  return { label: event.status, badgeClass: BADGE_CLASSES.DEFAULT };
};
