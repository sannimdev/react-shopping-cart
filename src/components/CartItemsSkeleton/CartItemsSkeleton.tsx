import React from "react";

type TProps = {
  length?: number;
};

const SkeletonElement = () => (
  <div className="cart-container">
    <div>
      <div className="flex gap-15 mt-10">
        <div className="cart-img-blank cart-skeleton w-280 h-280"></div>
      </div>
    </div>
  </div>
);

function CartItemsSkeleton({ length = 16 }: TProps) {
  return (
    <>
      {Array.from({ length }).map((_, idx) => (
        <SkeletonElement key={idx} />
      ))}
    </>
  );
}

export default CartItemsSkeleton;
