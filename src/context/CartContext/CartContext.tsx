import React, { PropsWithChildren, useContext } from "react";
import { createContext } from "react";
import useCartDataHandlers, { TCartDataHandlers } from "./hooks/useCartDataHandlers";
import { ICart } from "../../domain/shopping-cart/types";
import useProducts from "../../domain/shopping-cart/hooks/useProducts";

const CartContext = createContext<ICart | null>(null);
const CartDataHandlingContext = createContext<TCartDataHandlers | null>(null);

export function CartContextProvider({ children }: PropsWithChildren) {
  const { cart, cartDataHandlers } = useCartDataHandlers();

  return (
    <CartContext.Provider value={cart}>
      <CartDataHandlingContext.Provider value={cartDataHandlers}>{children}</CartDataHandlingContext.Provider>
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const cart = useContext(CartContext);
  const cartDataHandlers = useContext(CartDataHandlingContext);

  if (cart === null || cartDataHandlers === null) {
    throw new Error("장바구니와 관련된 설정을 코드에서 초기화하지 않았습니다.");
  }

  return {
    cart,
    values: useProducts(cart.products),
    cartDataHandlers,
  };
}
