import React, { Suspense } from "react";
import CartList from "./CartList";
import CartTemplate from "./CartTemplate";

function Cart() {
  return (
    <CartTemplate>
      <Suspense fallback={<div>loading..</div>}>
        <CartList />
      </Suspense>
    </CartTemplate>
  );
}

export default Cart;
