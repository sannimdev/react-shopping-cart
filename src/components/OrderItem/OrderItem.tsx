import React from 'react';
import { IProduct } from '../../domain/shopping-cart/types';

type TOrderItemProps = {
  item: IProduct;
};

function OrderItem({ item: { name, price, imageUrl, amount = 1 } }: TOrderItemProps) {
  return (
    <div className="order-list-item">
      <div className="flex gap-15 mt-10">
        <img className="w-144 h-144" src={imageUrl} alt="PET보틀-정사각(420ml)" />
        <div className="flex-col gap-15">
          <span className="order-name">{name}</span>
          <span className="order-info">
            {price}원 / 수량: {amount}개
          </span>
        </div>
      </div>
      <button className="primary-button-small flex-center self-start">장바구니</button>
    </div>
  );
}

export default OrderItem;
