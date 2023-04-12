import { useEffect, useReducer } from "react";
import CartItem from "../types/CartItem";
import ShopItem from "../types/ShopItem";
import { CartContext } from "./cart-context";

type StateType = {
  items: CartItem[];
  totalAmount: number;
};

type ActionType =
  | { type: "ADD"; item: ShopItem; quantity?: number }
  | { type: "DECREMENT"; id: number }
  | { type: "REMOVE"; id: number }
  | { type: "RETRIEVE"; payload: StateType }
  | { type: "CLEAR" };

const INITIAL_STATE = {
  items: [],
  totalAmount: 0,
};

const retrieveCartFromLocalStorage = () => {
  let items = localStorage.getItem("items");
  let totalAmount = localStorage.getItem("totalAmount");

  if (items && totalAmount) {
    let itemsArray = JSON.parse(items);

    return { items: itemsArray, totalAmount: +totalAmount };
  }

  return INITIAL_STATE;
};

const addCartToLocalStorage = (items: CartItem[], totalAmount: number) => {
  localStorage.setItem("items", JSON.stringify(items));
  localStorage.setItem("totalAmount", totalAmount.toString());
};

const removeCartFromLocalStorge = () => {
  localStorage.removeItem("items");
  localStorage.removeItem("totalAmount");
};

const cartReducer = (state: StateType = INITIAL_STATE, action: ActionType) => {
  if (action.type === "ADD") {
    let existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    let updatedItems: CartItem[];

    if (existingItemIndex !== -1) {
      const updatedItem = state.items[existingItemIndex];
      updatedItem.quantity = updatedItem.quantity + (action.quantity ?? 1);

      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = [
        ...state.items,
        { ...action.item, quantity: action.quantity ?? 1 },
      ];
    }

    addCartToLocalStorage(
      updatedItems,
      state.totalAmount + (action.quantity ?? 1)
    );
    return {
      items: updatedItems,
      totalAmount: state.totalAmount + (action.quantity ?? 1),
    };
  }

  if (action.type === "DECREMENT") {
    let itemIndex = state.items.findIndex((item) => action.id === item.id);

    let updatedItems: CartItem[];

    const updatedItem = state.items[itemIndex];
    updatedItem.quantity--;

    if (updatedItem.quantity === 0) {
      updatedItems = state.items.filter((item) => action.id !== item.id);
    } else {
      updatedItems = [...state.items];
      updatedItems[itemIndex] = updatedItem;
    }

    addCartToLocalStorage(updatedItems, state.totalAmount - 1);
    return { items: updatedItems, totalAmount: state.totalAmount - 1 };
  }

  if (action.type === "REMOVE") {
    let item = state.items.find((item) => action.id === item.id);

    let updatedItems = state.items.filter((item) => action.id !== item.id);

    addCartToLocalStorage(updatedItems, state.totalAmount - item!.quantity);
    return {
      items: updatedItems,
      totalAmount: state.totalAmount - item!.quantity,
    };
  }

  if (action.type === "RETRIEVE") {
    return action.payload;
  }

  if (action.type === "CLEAR") {
    removeCartFromLocalStorge();
    return INITIAL_STATE;
  }

  // Default return
  return state;
};

const CartContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [cartState, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const addToCartHandler = (item: ShopItem, quantity?: number) => {
    dispatch({ type: "ADD", item, quantity });
  };

  const decrementCartItemHandler = (id: number) => {
    dispatch({ type: "DECREMENT", id });
  };

  const removeFromCartHandler = (id: number) => {
    dispatch({ type: "REMOVE", id });
  };

  const clearCartHandler = () => {
    dispatch({ type: "CLEAR" });
  };

  useEffect(() => {
    dispatch({ type: "RETRIEVE", payload: retrieveCartFromLocalStorage() });
  }, []);

  const cartContextObj = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addToCartHandler,
    decrementItem: decrementCartItemHandler,
    removeItem: removeFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContextObj}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
