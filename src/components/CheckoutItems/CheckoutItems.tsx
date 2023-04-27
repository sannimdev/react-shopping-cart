import React from "react";
import { IProduct } from "../../domain/shopping-cart/types";
import useProducts from "../../domain/shopping-cart/hooks/useProducts";
import CheckoutItem from "./CheckoutItem";

type TCheckoutItemsProps = {
  products: IProduct[];
};

function CheckoutItems({ products }: TCheckoutItemsProps) {
  const { checkedCount } = useProducts(products);

  return (
    <>
      <h3 className="order-title">주문 상품({checkedCount}건)</h3>
      <hr className="divide-line-gray mt-10" />
      {products.map((product) => (
        <CheckoutItem key={product.id} product={product} />
      ))}
    </>
  );
}

export default CheckoutItems;
