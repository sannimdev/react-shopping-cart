import { useMemo } from "react";
import { IProduct } from "../types";
import { CART } from "../constants";

const {
  PRODUCTS: { DEFAULT_INITIAL_AMOUNT },
} = CART;

export const useProducts = (products: IProduct[]) => {
  // 상품에 관하여
  const productCount = useMemo(() => products.length, [products]);
  const estimatedPrice = useMemo(
    () =>
      products.reduce(
        (result, { checked, price, amount = DEFAULT_INITIAL_AMOUNT }) => (checked ? result + price * amount : result),
        0
      ),
    [products]
  );

  // 선택에 관하여
  const checkedProducts = useMemo(() => products.filter(({ checked }) => checked), [products]);
  const checkedCount = useMemo(() => checkedProducts.length, [products]);

  // 전체 선택 또는 전체 선택되지 않음
  const allChecked = useMemo(() => products.every(({ checked }) => !!checked), [products]);
  const nobodyChecked = useMemo(() => checkedCount === 0, [products]);

  return { productCount, estimatedPrice, checkedProducts, checkedCount, allChecked, nobodyChecked };
};

export default useProducts;
