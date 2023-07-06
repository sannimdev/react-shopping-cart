import React, { Suspense } from "react";
import OrderTemplate from "./OrderTemplate";
import OrderList from "./OrderList";
import { Spinner } from "../../components/Spinner";

function Orders() {
  return (
    <OrderTemplate>
      <Suspense fallback={<Spinner />}>
        <OrderList />
      </Suspense>
    </OrderTemplate>
  );
}

export default Orders;
