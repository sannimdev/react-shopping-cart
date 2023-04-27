import React, { useMemo } from "react";
import { IProduct } from "../../domain/shopping-cart/types";
import useProducts from "../../domain/shopping-cart/hooks/useProducts";

type TEstimatePriceProps = {
  products: IProduct[];
  onClick?: (products: IProduct[]) => void;
};

function EstimatePrice({ products, onClick }: TEstimatePriceProps) {
  const { estimatedPrice, checkedCount, nobodyChecked } = useProducts(products);

  const orderButtonClass = useMemo(() => {
    const classes = ["button", "flex-center"];
    if (checkedCount) classes.push("primary-button");
    else classes.push("secondary-button");
    return classes.join(" ");
  }, [products]);

  return (
    <>
      <div className="cart-right-section__top">
        <h3 className="cart-title">결제예상금액</h3>
      </div>
      <hr className="divide-line-thin" />
      <div className="cart-right-section__bottom">
        <div className="flex justify-between p-20 mt-20">
          <span className="highlight-text">결제예상금액</span>
          <span className="highlight-text">{estimatedPrice.toLocaleString()}원</span>
        </div>
        <div className="flex-center mt-30 mx-10">
          <button className={orderButtonClass} disabled={nobodyChecked} onClick={() => onClick?.(products)}>
            주문하기({checkedCount}개)
          </button>
        </div>
      </div>
    </>
  );
}

export default EstimatePrice;
