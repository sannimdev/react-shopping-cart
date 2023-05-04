import React from "react";
import deleteSvg from "../../../assets/svgs/trash.svg";
import AmountHandler from "./AmountHandler";
import useCartItem from "./hooks/useCartItem";
import { CART } from "../../../domain/shopping-cart/constants";
import { ICartItem } from "../../../domain/shopping-cart/types/domain";

const {
  PRODUCT: { DEFAULT_INITIAL_AMOUNT },
} = CART;

type TCartItemProps = {
  item: ICartItem;
};

function CartItem({ item }: TCartItemProps) {
  const { name, imageUrl } = item.product;
  const {
    amount: amountState,
    totalPrice,
    handleToggleChecked,
    handleRemovingProduct,
    handleIncrement,
    handleDecrement,
  } = useCartItem({
    item,
  });

  return (
    <div className="cart-container">
      <div className="flex gap-15 mt-10">
        <input
          type="checkbox"
          name="checkbox"
          className="checkbox"
          // checked={!!checked} TODO:
          onChange={handleToggleChecked}
        />
        <img className="w-144 h-144" src={imageUrl} alt={name} />
        <span className="cart-name">{name}</span>
      </div>
      <div className="flex-col-center justify-end gap-15">
        <img className="cart-trash-svg" src={deleteSvg} alt="삭제" onClick={handleRemovingProduct} />
        <AmountHandler amount={amountState} onIncrement={handleIncrement} onDecrement={handleDecrement} />
        <span className="cart-price">{totalPrice.toLocaleString()}원</span>
      </div>
    </div>
  );
}

export default CartItem;
