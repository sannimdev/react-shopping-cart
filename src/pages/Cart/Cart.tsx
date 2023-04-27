import React from "react";
import { CartItem } from "../../components/CartItem";
import useCart from "./hooks/useCart";

function Cart() {
  const {
    cart,
    values: { productCount, allChecked, estimatedPrice, checkedCount, nobodyChecked, orderButtonClass },
    handlers: { handleAllCheck, handleDeletingChecked, handleOrder },
  } = useCart();

  return (
    <section className="cart-section">
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
                checked={allChecked}
                onChange={handleAllCheck}
              />
              <label className="checkbox-label" htmlFor="checkbox">
                선택해제
              </label>
            </div>
            <button className="delete-button" onClick={handleDeletingChecked}>
              상품삭제
            </button>
          </div>
          {productCount > 0 && (
            <>
              <h3 className="cart-title">든든배송 상품({checkedCount}개)</h3>
              <hr className="divide-line-gray mt-10" />
              {cart.products.map((product, idx) => (
                <React.Fragment key={idx}>
                  <CartItem product={product} />
                  <hr className="divide-line-thin mt-10" />
                </React.Fragment>
              ))}
            </>
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
              <button className={orderButtonClass} onClick={handleOrder} disabled={nobodyChecked}>
                주문하기({checkedCount}개)
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Cart;
