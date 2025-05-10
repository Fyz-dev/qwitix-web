'use client';

import { FC } from 'react';

import { useCartStore } from '../providers/cart-store-provider';

import CartBuyDrawer from './cart-buy-drawer';

const CartDialogs: FC = () => {
  const { open, setOpen } = useCartStore(state => state);

  return (
    <>
      <CartBuyDrawer open={open} onOpenChange={() => setOpen(false)} />
    </>
  );
};

export default CartDialogs;
