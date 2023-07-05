import React, { PropsWithChildren } from "react";

function CartTemplate({ children }: PropsWithChildren) {
  return <section className="cart-section">{children}</section>;
}

export default CartTemplate;
