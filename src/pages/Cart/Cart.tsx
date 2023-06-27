import React, { Fragment, useState } from "react";
import { useCart, useCartItemHandlers } from "../../hooks";
import { CartItem } from "../../components/CartItem";
import { Link } from "react-router-dom";
import { CartItems } from "../../components/CartItems";

const template = (children: React.ReactNode) => <div>{children}</div>;

function Cart() {
  const [errorMessage, setError] = useState<string | null>(null);

  const {
    status,
    error,
    cart,
    values: { estimatedPrice, allChecked, checkedItems },
  } = useCart();

  const { toggleAllCheck, deleteCheckedItems, cartItemHandlers } = useCartItemHandlers({ setError });

  if (status === "loading") {
    return template("불러오고 있어요"); // not working.. TODO: 템플릿 작업
  }

  if (status === "error") {
    return template(error.message); // not working.. TODO: 템플릿 작업
  }

  return (
    <section className="cart-section">
      {errorMessage && <div>{errorMessage}</div>}
      <header className="flex-col-center mt-20">
        <h2 className="cart-section__title">장바구니</h2>
        <hr className="divide-line mt-20" />
      </header>

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
        </section>
        <section className="cart-right-section">
          <div className="cart-right-section__top">
            <h3 className="cart-title">결제예상금액</h3>
          </div>
          <hr className="divide-line-thin" />
          <div className="cart-right-section__bottom">
            <div className="flex justify-between p-20 mt-20">
              <span className="highlight-text">결제예상금액</span>
              <span className="highlight-text">{estimatedPrice.toLocaleString()}원</span>
            </div>
            <div className="flex-center mt-30 mx-10">
              <button className="primary-button flex-center">
                <Link to="/checkout">주문하기({checkedItems.length}개)</Link>
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Cart;
