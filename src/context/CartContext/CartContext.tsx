import React, { PropsWithChildren, useContext, useMemo } from "react";
import { createContext } from "react";
import useCartDataHandlers, { TCartDataHandlers } from "./hooks/useCartDataHandlers";
import { ICart } from "../../domain/shopping-cart/types";
import { CART } from "../../domain/shopping-cart/constants";

const {
  PRODUCT: { DEFAULT_INITIAL_AMOUNT },
} = CART;

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

  const checkedProducts = useMemo(() => cart.items.filter(({ checked }) => checked), [cart]);
  const allChecked = useMemo(() => cart.items.every(({ checked }) => !!checked), [cart]);

  const estimatedPrice = useMemo(
    // () =>
    //   cart.items.reduce(
    //     (result, { checked, price, amount = DEFAULT_INITIAL_AMOUNT }) => (checked ? result + price * amount : result),
    //     0
    //   ),
    () => 10000,
    [cart]
  );

  return { cart, cartDataHandlers, checkedProducts, allChecked, estimatedPrice };
}
