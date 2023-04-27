import React from "react";
import { IProduct } from "../../domain/shopping-cart/types";

type TCheckoutItemProps = {
  product: IProduct;
};

function CheckoutItem({ product }: TCheckoutItemProps) {
  return (
    <>
      <div className="order-container">
        <div className="flex gap-15 mt-10">
          <img className="w-144 h-144" src={product.imageUrl} alt={product.name} />
          <div className="flex-col gap-15">
            <span className="order-name">{product.name}</span>
            <span>수량: {product.amount || 0}</span>
          </div>
        </div>
      </div>
      <hr className="divide-line-thin mt-10" />
    </>
  );
}

export default CheckoutItem;
