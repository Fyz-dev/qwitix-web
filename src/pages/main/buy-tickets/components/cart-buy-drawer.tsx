'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { useCartStore } from '../providers/cart-store-provider';

import CartItemCard from './cart-item-card';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Spinner } from '@/components/ui/spinner';
import { useBuyTicketMutation } from '@/queries/hooks/ticket';
import { Paths } from '@/utils/paths';

interface CartBuyDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartBuyDrawer: FC<CartBuyDrawerProps> = ({ open, onOpenChange }) => {
  const router = useRouter();

  const cart = useCartStore(state => state.cart);

  const buyMutation = useBuyTicketMutation();

  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.ticket.price * item.quantity;
  }, 0);

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const onCheckout = async () => {
    const {
      data: { url },
    } = await buyMutation.mutateAsync({
      tickets: cart.map(item => ({
        ticketId: item.ticket.id,
        quantity: item.quantity,
      })),
      successUrl: `${Paths.BaseUrl}${Paths.SuccessBuyTickets}`,
      cancelUrl: `${Paths.BaseUrl}${Paths.CancelBuyTickets}`,
    });

    router.push(url);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
            Your selected tickets are here. Please review your order before
            proceeding to checkout. If something is wrong, go back and modify
            your order.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-5 px-4">
          {cart.map(item => (
            <CartItemCard key={item.ticket.id} cartItem={item} />
          ))}
        </div>

        <div className="mt-auto px-4 pt-6">
          <Separator className="mb-4" />
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Total</span>
            <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
          </div>

          <SheetFooter className="px-0">
            <Button onClick={onCheckout} className="w-full">
              {buyMutation.isPending ? (
                <>
                  <Spinner size="small" className="text-current" />
                  Processing...
                </>
              ) : (
                'Checkout'
              )}
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartBuyDrawer;
