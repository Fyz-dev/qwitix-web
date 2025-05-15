'use client';

import { Minus, Plus } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';

import { useCartStore } from '../providers/cart-store-provider';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ResponseTicketWithSoldDTO } from '@/gen/data-contracts';
import { cn } from '@/lib/utils';
import { useAuthUser } from '@/stores';

interface TicketCardProps {
  ticket: ResponseTicketWithSoldDTO;
  isReadonly?: boolean;
}

const TicketCard: FC<TicketCardProps> = ({ ticket, isReadonly }) => {
  const user = useAuthUser(state => state.user);

  const quantity = useCartStore(state => {
    const item = state.cart.find(i => i.ticket.id === ticket.id);
    return item?.quantity ?? 0;
  });
  const add = useCartStore(state => state.addTicket);
  const remove = useCartStore(state => state.removeTicket);

  return (
    <Card
      className={cn(
        'h-full transition-all duration-200',
        quantity > 0 && 'shadow-primary border-primary shadow-md',
        ticket.sold === ticket.quantity &&
          'shadow-destructive border-destructive',
      )}
    >
      <CardContent className="flex h-full flex-col gap-6 text-center">
        <span
          className={cn(
            'text-2xl font-bold',
            quantity > 0 && 'text-primary',
            ticket.sold === ticket.quantity && 'text-destructive',
          )}
        >
          {ticket.name}
        </span>
        <p className="text-pretty">{ticket.details}</p>

        <span
          className={cn(
            'mt-auto text-2xl font-bold',
            quantity > 0 && 'text-primary',
            ticket.sold === ticket.quantity && 'text-destructive',
          )}
        >
          USD {ticket.price}
        </span>
        {!isReadonly &&
          (ticket.sold === ticket.quantity ? (
            <span className="text-destructive text-2xl font-bold">
              Sold out
            </span>
          ) : (
            <div className="flex items-center justify-center gap-6">
              <Button
                onClick={() => {
                  if (!user) {
                    toast.info(
                      'Please log in to remove tickets from your cart',
                    );
                    return;
                  }

                  remove(ticket.id);
                }}
                variant="outline"
                size="icon"
                className="text-primary border-primary hover:text-primary hover:border-primary"
              >
                <Minus />
              </Button>

              <span
                className={cn(
                  'text-2xl font-bold',
                  quantity > 0 && 'text-primary',
                )}
              >
                {quantity}
              </span>

              <Button
                onClick={() => {
                  if (!user) {
                    toast.info('Please login to add tickets to your cart');
                    return;
                  }

                  add(ticket);
                }}
                variant="outline"
                size="icon"
                className="text-primary border-primary hover:text-primary hover:border-primary"
              >
                <Plus />
              </Button>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

export default TicketCard;
