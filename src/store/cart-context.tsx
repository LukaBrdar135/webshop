import React from "react";
import CartItem from "../types/CartItem";
import ShopItem from "../types/ShopItem";

type CartContextType = {
  items: CartItem[];
  totalAmount: number;
  addItem: (item: ShopItem, quantity?: number) => void;
  decrementItem: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
};

export const CartContext = React.createContext<CartContextType>({
  items: [],
  totalAmount: 0,
  addItem: (item: ShopItem, quantity?: number) => {},
  decrementItem: (id: number) => {},
  removeItem: (id: number) => {},
  clearCart: () => {},
});
