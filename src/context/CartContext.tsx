import React, { useContext, useMemo } from "react";
import { createContext, useState } from "react";
import { ICart, IProduct } from "../types/types";

const CartContext = createContext<ICart | null>(null);
const CartUpdatingProductContext = createContext<((product: IProduct) => void) | null>(null);
const CartUpdatingProductsContext = createContext<((product: IProduct[]) => void) | null>(null);

const CART_INITIAL_VALUE = { products: [] };

export function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ICart>(CART_INITIAL_VALUE);

  const updateProductInCart = (product: IProduct) => {
    const currentTime = new Date().getTime();
    const oldProduct = cart.products.find(({ id }) => id === product.id);
    const products = [
      ...cart.products.filter(({ id }) => id !== product.id),
      {
        ...product,
        createdAt: oldProduct?.createdAt || currentTime,
        updatedAt: oldProduct?.updatedAt || currentTime,
      },
    ];

    products.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    setCart({
      ...cart,
      products,
    });
  };

  const updateProductsInCart = (products: IProduct[]) => {
    products.forEach((product) => {
      updateProductInCart(product);
    });
  };

  return (
    <CartContext.Provider value={cart}>
      <CartUpdatingProductContext.Provider value={updateProductInCart}>
        <CartUpdatingProductsContext.Provider value={updateProductsInCart}>
          {children}
        </CartUpdatingProductsContext.Provider>
      </CartUpdatingProductContext.Provider>
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const cart = useContext(CartContext);
  const updateProductInCart = useContext(CartUpdatingProductContext);
  const updateProductsInCart = useContext(CartUpdatingProductsContext);

  if (cart === null || updateProductInCart === null || updateProductsInCart === null) {
    throw new Error("장바구니와 관련된 설정을 코드에서 초기화하지 않았습니다.");
  }

  const estimatedPrice = useMemo(
    () =>
      cart.products.reduce((result, { checked, price, amount = 1 }) => (checked ? result + price * amount : result), 0),
    [cart]
  );

  return { cart, updateProductInCart, updateProductsInCart, estimatedPrice };
}
