import React, { Suspense } from "react";
import CartList from "./CartList";
import CartTemplate from "./CartTemplate";
import { Spinner } from "../../components/Spinner";

function Cart() {
  return (
    <CartTemplate>
      {/* 장바구니 구현은 이정도까지만 하겠습니다... */}
      <Suspense fallback={<Spinner />}>
        <CartList />
      </Suspense>
    </CartTemplate>
  );
}

export default Cart;
