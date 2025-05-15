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
import { ResponseTicketDTO } from '@/gen/data-contracts';
import { useDeleteTicketMutation } from '@/queries/hooks/ticket';

interface TicketDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: ResponseTicketDTO;
}

const TicketDeleteDialog: FC<TicketDeleteDialogProps> = ({
  open,
  onOpenChange,
  ticket,
}) => {
  const deleteMutation = useDeleteTicketMutation(ticket.id);

  const onDelete = () => {
    const promise = deleteMutation.mutateAsync();

    toast.promise(promise, {
      loading: 'Deleting ticket...',
      success: () => 'Ticket successfully deleted!',
      error: 'Failed to delete ticket.',
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
          <DialogTitle>
            Are you sure you want to delete this ticket?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. All data related to this ticket will
            be permanently deleted.
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

export default TicketDeleteDialog;
