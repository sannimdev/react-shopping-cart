import React, { useCallback, useEffect } from "react";
import { EstimatePrice } from "../../components/EstimatePrice";
import { CheckoutItems } from "../../components/CheckoutItems";
import { useCheckoutContext } from "../../context/CheckoutContext/CheckoutContext";
import { IProduct } from "../../domain/shopping-cart/types";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const { products } = useCheckoutContext();

  useEffect(() => {
    if (!products.length) {
      navigate("/");
    }
  }, []);

  const handleOrdering = useCallback((products: IProduct[]) => {
    if (!confirm("주문")) console.log("결제가 진행됩니다. 주문하시겠습니까?", products);

    throw new Error("Not Implemented");
  }, []);

  return (
    <section className="order-section">
      <header className="flex-col-center mt-20">
        <h2 className="order-section__title">주문/결제</h2>
        <hr className="divide-line mt-20" />
      </header>

      <div className="flex">
        <section className="order-left-section">
          <CheckoutItems products={products} />
        </section>
        <section className="order-right-section">
          <EstimatePrice products={products} onClick={handleOrdering} />
        </section>
      </div>
    </section>
  );
}

export default Checkout;
