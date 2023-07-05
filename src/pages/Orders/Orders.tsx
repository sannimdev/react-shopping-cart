import React, { Suspense } from "react";
import OrderTemplate from "./OrderTemplate";
import OrderList from "./OrderList";

function Orders() {
  return (
    <OrderTemplate>
      <Suspense fallback={<div>Fallback 단위 지정 다시해야 할 텐데...</div>}>
        <OrderList />
      </Suspense>
    </OrderTemplate>
  );
}

export default Orders;
