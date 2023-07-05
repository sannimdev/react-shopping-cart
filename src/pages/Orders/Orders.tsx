import React, { Suspense } from "react";
import OrderTemplate from "./OrderTemplate";
import OrderList from "./OrderList";

function Orders() {
  return (
    <OrderTemplate>
      <Suspense fallback={<div>준비 중입니다</div>}>
        <OrderList />
      </Suspense>
    </OrderTemplate>
  );
}

export default Orders;
