import React, { useEffect, useState } from "react";
import { useCart, useCartItemHandlers } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { CartItems } from "../../components/CartItems";
import EstimatedPaymentSide from "../../components/EstimatedPaymentSide/EstimatedPaymentSide";
import { SectionHeader } from "../../components/SectionHeader";
import { useInView } from "react-intersection-observer";
import CartTemplate from "./CartTemplate";

function CartList() {
  const { ref: infiniteRef, inView } = useInView();

  const navigate = useNavigate();
  const [errorMessage, setError] = useState<string | null>(null);

  const {
    pageRef,
    cart,
    values: { estimatedPrice, allChecked, checkedItems },
    queries: { fetchNextPage, hasNextPage },
  } = useCart();

  useEffect(() => {
    if (inView && hasNextPage) {
      pageRef.current += 1;
      fetchNextPage({ pageParam: pageRef.current });
    }
  }, [inView]);

  const { toggleAllCheck, deleteCheckedItems, cartItemHandlers } = useCartItemHandlers({ setError });

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <CartTemplate>
      {errorMessage && <div>{errorMessage}</div>}
      <SectionHeader title="장바구니" />

      <div className="flex">
        <section className="cart-left-section">
          <div className="flex justify-between items-center">
            <div className="checkbox-container">
              <input
                className="checkbox"
                name="checkbox"
                type="checkbox"
                readOnly
                defaultChecked={allChecked}
                onChange={toggleAllCheck}
              />
              <label className="checkbox-label" htmlFor="checkbox">
                선택해제
              </label>
            </div>
            <button className="delete-button" onClick={deleteCheckedItems}>
              상품삭제
            </button>
          </div>
          {cart?.items?.length > 0 && (
            <CartItems items={cart.items} title={`든든배송 상품(${cart.items.length}개)`} handlers={cartItemHandlers} />
          )}
          <hr ref={infiniteRef} />
        </section>
        <section className="cart-right-section">
          <EstimatedPaymentSide
            title="결제예상금액"
            subtitle="결제예상금액"
            estimatedPrice={estimatedPrice}
            label={`주문하기(${checkedItems.length})개`}
            onClick={handleCheckout}
          />
        </section>
      </div>
    </CartTemplate>
  );
}

export default CartList;
