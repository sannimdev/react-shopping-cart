import React, { Suspense } from "react";
import CartList from "./CartList";
import CartTemplate from "./CartTemplate";
import { Spinner } from "../../components/Spinner";
import { ErrorBoundary } from "react-error-boundary";

function Cart() {
  return (
    <CartTemplate>
      {/* 장바구니 구현은 이정도까지만 하겠습니다... */}
      <ErrorBoundary fallback={<div>오류 발생유</div>}>
        <Suspense fallback={<Spinner />}>
          <CartList />
        </Suspense>
      </ErrorBoundary>
    </CartTemplate>
  );
}

export default Cart;
