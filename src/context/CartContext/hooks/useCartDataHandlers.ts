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

const sortProducts = (products: IProduct[]) => products.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

const useCartDataHandlers: THookCartDataHandlers = () => {
  const [cart, setCart] = useState<ICart>(CART_INITIAL_VALUE);

  const updateProducts = (newProducts: IProduct[]) => {
    const { products: oldProducts } = cart;
    const currentTime = new Date().getTime();
    const newProductIds = newProducts.map(({ id }) => id);

    const products = [
      ...newProducts.map((product) => {
        const oldProduct = oldProducts.find(({ id }) => id === product.id);
        if (oldProduct) {
          return {
            ...product,
            amount: (oldProduct?.amount || 0) + 1,
            updatedAt: currentTime,
          };
        }
        return {
          ...product,
          amount: 1,
          createdAt: currentTime,
          updatedAt: currentTime,
        };
      }),
      ...oldProducts.filter(({ id }) => !newProductIds.includes(id)),
    ];

    sortProducts(products);

    setCart({
      ...cart,
      products,
    });
  };

  const updateProduct = (product: IProduct) => {
    updateProducts([product]);
  };

  const removeProducts = (products: IProduct[]) => {
    const { products: oldProducts } = cart;
    const ids = products.map(({ id }) => id);

    setCart({
      ...cart,
      products: oldProducts.filter(({ id }) => !ids.includes(id)),
    });
  };

  const removeProduct = (product: IProduct) => {
    removeProducts([product]);
  };

  const cartDataHandlers = {
    updateProduct,
    updateProducts,
    removeProduct,
    removeProducts,
  };

  return { cart, cartDataHandlers };
};

export default useCartDataHandlers;
