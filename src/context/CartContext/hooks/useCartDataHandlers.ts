import React, { useState } from "react";
import { ICart, IProduct } from "../../../types/types";

const CART_INITIAL_VALUE = { products: [] };

export type TCartDataHandlers = {
  updateProduct: (product: IProduct) => void;
  updateProducts: (products: IProduct[]) => void;
  removeProduct: (product: IProduct) => void;
  removeProducts: (product: IProduct[]) => void;
};

type THookCartDataHandlers = () => {
  cart: ICart;
  cartDataHandlers: TCartDataHandlers;
};

const useCartDataHandlers: THookCartDataHandlers = () => {
  const [cart, setCart] = useState<ICart>(CART_INITIAL_VALUE);

  const updateProduct = (product: IProduct) => {
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

  const updateProducts = (products: IProduct[]) =>
    products.forEach((product) => {
      updateProduct(product);
    });

  const removeProduct = (product: IProduct) => {
    setCart((cart) => ({
      ...cart,
      products: cart.products.filter(({ id }) => id !== product.id),
    }));
  };

  const removeProducts = (products: IProduct[]) => products.forEach((product) => removeProduct(product));

  const cartDataHandlers = {
    updateProduct,
    updateProducts,
    removeProduct,
    removeProducts,
  };

  return { cart, cartDataHandlers };
};

export default useCartDataHandlers;
