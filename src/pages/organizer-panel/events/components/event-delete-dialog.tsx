'use client';

import { FC } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ResponseEventDTO } from '@/gen/data-contracts';
import { useDeleteEventMutation } from '@/queries/hooks/event';

interface EventDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: ResponseEventDTO;
}

const EventDeleteDialog: FC<EventDeleteDialogProps> = ({
  open,
  onOpenChange,
  event,
}) => {
  const deleteMutation = useDeleteEventMutation(event.id);

  const onDelete = () => {
    const promise = deleteMutation.mutateAsync();

    toast.promise(promise, {
      loading: 'Deleting event...',
      success: () => 'Event successfully deleted!',
      error: 'Failed to delete event.',
    });

    onClose(false);
  };

  const onClose = (open: boolean) => {
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this event?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. All tickets and data related to this
            event will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>

          <Button onClick={onDelete} type="submit" variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventDeleteDialog;
