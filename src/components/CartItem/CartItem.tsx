import React from "react";
import { ICartItem } from "../../types/types";
import deleteSvg from "../../assets/svgs/trash.svg";

type TCartItem = {
  item: ICartItem;
};

function CartItem({ item: { product, checked } }: TCartItem) {
  return (
    <div className="cart-container">
      <div className="flex gap-15 mt-10">
        <input className="checkbox" name="checkbox" type="checkbox" checked={checked} />
        <img className="w-144 h-144" src={product.imageUrl} alt="PET보틀-정사각(420ml)" />
        <span className="cart-name">{product.name}</span>
      </div>
      <div className="flex-col-center justify-end gap-15">
        <img className="cart-trash-svg" src={deleteSvg} alt="삭제" />
        <div className="number-input-container">
          <input type="number" className="number-input" value="1" />
          <div>
            <button className="number-input-button">▲</button>
            <button className="number-input-button">▼</button>
          </div>
        </div>
        {/* TODO: 수량에 맞춰 계산하기 */}
        <span className="cart-price">{product.price}원</span>
      </div>
    </div>
  );
}

export default CartItem;
