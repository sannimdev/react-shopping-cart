import React, { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";
import { IProduct } from "../../domain/shopping-cart/types";

const CheckoutContext = createContext<IProduct[] | null>(null);
const CheckoutDataHandlingContext = createContext<Dispatch<SetStateAction<IProduct[]>> | null>(null);

export function CheckoutContextProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<IProduct[]>([]);

  return (
    <CheckoutContext.Provider value={products}>
      <CheckoutDataHandlingContext.Provider value={setProducts}>{children}</CheckoutDataHandlingContext.Provider>
    </CheckoutContext.Provider>
  );
}

export function useCheckoutContext() {
  const products = useContext(CheckoutContext);
  const setProducts = useContext(CheckoutDataHandlingContext);

  if (products === null || setProducts === null) {
    throw new Error("체크아웃과 관련된 설정을 코드에서 초기화하지 않았습니다.");
  }

  return {
    products,
    setProducts,
  };
}
