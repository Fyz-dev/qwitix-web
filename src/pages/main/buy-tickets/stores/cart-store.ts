import { createStore } from 'zustand';

import { ResponseTicketWithSoldDTO } from '@/gen/data-contracts';

export interface CartItem {
  ticket: ResponseTicketWithSoldDTO;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  open: boolean;
}

export interface CartActions {
  addTicket: (ticket: ResponseTicketWithSoldDTO) => void;
  removeTicket: (ticketId: string) => void;
  setOpen: (open: boolean) => void;
  clearCart: () => void;
}

export type CartStore = CartState & CartActions;

export const createCartStore = () => {
  return createStore<CartStore>()(set => ({
    cart: [],
    open: false,
    setOpen: (open: boolean) => set({ open }),
    addTicket: (ticket: ResponseTicketWithSoldDTO) => {
      set(state => {
        const maxAvailable = ticket.quantity - (ticket.sold || 0);
        const index = state.cart.findIndex(
          item => item.ticket.id === ticket.id,
        );

        if (index >= 0) {
          const existing = state.cart[index];
          if (existing.quantity >= maxAvailable) return {};

          const updatedCart = [...state.cart];
          updatedCart[index] = {
            ...existing,
            quantity: existing.quantity + 1,
          };
          return { cart: updatedCart };
        }

        if (maxAvailable < 1) return {};
        return { cart: [...state.cart, { ticket, quantity: 1 }] };
      });
    },
    removeTicket: ticketId => {
      set(state => {
        const index = state.cart.findIndex(item => item.ticket.id === ticketId);
        if (index === -1) return {};

        const updatedCart = [...state.cart];
        const item = updatedCart[index];

        if (item.quantity <= 1) {
          updatedCart.splice(index, 1);
        } else {
          updatedCart[index] = { ...item, quantity: item.quantity - 1 };
        }

        return { cart: updatedCart };
      });
    },
    clearCart: () => set({ cart: [] }),
  }));
};

export type CartStoreApi = ReturnType<typeof createCartStore>;
