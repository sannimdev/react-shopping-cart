import React, { Suspense } from "react";
import CartList from "./CartList";
import CartTemplate from "./CartTemplate";

function Cart() {
  return (
    <Suspense fallback={<CartTemplate>loading..</CartTemplate>}>
      <CartList />
    </Suspense>
  );
}

export default Cart;
