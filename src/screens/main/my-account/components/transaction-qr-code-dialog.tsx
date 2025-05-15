import { QrCode } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ResponseTransactionDTO } from '@/gen/data-contracts';

interface TransactionQrCodeDialogProps {
  transaction: ResponseTransactionDTO;
}

const TransactionQrCodeDialog: FC<TransactionQrCodeDialogProps> = ({
  transaction,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 px-2">
          <QrCode className="mr-1 h-3 w-3" />
          <span className="text-xs">QR Code</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ticket QR Code</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center">
          <QRCodeCanvas size={256} value={transaction.id} />
        </div>

        <p className="text-center text-sm font-medium">
          Transaction ID: {transaction.id}
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionQrCodeDialog;
