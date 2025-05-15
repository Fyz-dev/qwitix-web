'use client';

import { ShoppingCart } from 'lucide-react';
import { FC } from 'react';

import { useCartStore } from '../providers/cart-store-provider';

import { Button } from '@/components/ui/button';

const CartButton: FC = () => {
  const { cart, setOpen } = useCartStore(state => state);

  return (
    <>
      {cart.length > 0 && (
        <section className="fixed right-20 bottom-20">
          <Button onClick={() => setOpen(true)} size="icon" className="size-14">
            <ShoppingCart className="size-6" />
          </Button>
        </section>
      )}
    </>
  );
};

export default CartButton;
