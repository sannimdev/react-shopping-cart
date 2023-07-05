import React, { PropsWithChildren } from "react";

function OrderTemplate({ children }: PropsWithChildren) {
  return <section className="order-section">{children}</section>;
}

export default OrderTemplate;
