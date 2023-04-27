import React from "react";
import { CartItem } from "../../components/CartItem";
import useCart from "./hooks/useCart";
import { EstimatePrice } from "../../components/EstimatePrice";
import { useCheckoutContext } from "../../context/CheckoutContext/CheckoutContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    cartDataHandlers: { deleteProducts },
    values: { productCount, allChecked, checkedCount, checkedProducts },
    handlers: { handleAllCheck, handleDeletingChecked },
  } = useCart();

  const { setProducts: setCheckoutProducts } = useCheckoutContext();

  const handleCheckingOut = () => {
    if (!confirm("선택하신 상품을 주문하시겠습니까?")) return;

    setCheckoutProducts([...checkedProducts]);
    deleteProducts(checkedProducts);
    navigate("/checkout");
  };

  return (
    <section className="cart-section">
      <header className="flex-col-center mt-20">
        <h2 className="cart-section__title">장바구니</h2>
        <hr className="divide-line mt-20" />
      </header>

      <div className="flex">
        <section className="cart-left-section">
          {productCount > 0 && (
            <>
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
          <EstimatePrice products={cart.products} onClick={handleCheckingOut} />
        </section>
      </div>
    </section>
  );
}

export default Cart;
