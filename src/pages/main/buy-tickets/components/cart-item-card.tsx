import type { CartItem } from '../stores/cart-store';
import type { FC } from 'react';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface CartItemCardProps {
  cartItem: CartItem;
}

const CartItemCard: FC<CartItemCardProps> = ({ cartItem }) => {
  const { ticket, quantity } = cartItem;
  const totalPrice = ticket.price * quantity;

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <Card className="flex flex-row items-center justify-between p-4">
      <div className="flex flex-col gap-1.5">
        <span className="text-base font-medium">{ticket.name}</span>
        <div className="text-muted-foreground flex items-center text-sm">
          <span>
            Ticket price: {formatPrice(ticket.price)} × {quantity}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Separator className="h-10!" orientation="vertical" />
        <div className="flex flex-col items-end">
          <span className="text-muted-foreground text-xs">Total</span>
          <span className="font-semibold">{formatPrice(totalPrice)}</span>
        </div>
      </div>
    </Card>
  );
};

export default CartItemCard;
