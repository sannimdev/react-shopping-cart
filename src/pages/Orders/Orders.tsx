import React from "react";
import OrderProduct from "../../components/OrderItem/OrderProduct";
import { useOrders, useProducts } from "../../hooks";

function Orders() {
  const { orders } = useOrders();

  const { handleAddToCart } = useProducts();

  return (
    <section className="order-section">
      <header className="flex-col-center mt-20">
        <h2 className="order-section__title">주문 목록</h2>
        <hr className="divide-line mt-20" />
      </header>

      {orders.map((item) => (
        <div key={item.id} className="order--list">
          <div className="order-list__header">
            <span>주문번호: {item.id}</span>
            <span>상세보기 &gt;</span>
          </div>

          {item.orderDetails.map((product) => (
            <OrderProduct key={product.id} product={product} onClick={handleAddToCart} />
          ))}
        </div>
      ))}
    </section>
  );
}

export default Orders;
