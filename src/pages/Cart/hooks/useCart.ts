import { useCallback, useMemo } from "react";
import { useCartContext } from "../../../context/CartContext";

const useCart = () => {
  const { cart, cartDataHandlers, values } = useCartContext();

  const { checkedCount, checkedProducts, allChecked } = values;
  const { updateProducts, deleteProducts } = cartDataHandlers;

  const orderButtonClass = useMemo(() => {
    const classes = ["button", "flex-center"];
    if (checkedCount) classes.push("primary-button");
    else classes.push("secondary-button");
    return classes.join(" ");
  }, [cart]);

  const handleAllCheck = useCallback(() => {
    updateProducts(cart.products.map((product) => ({ ...product, checked: !allChecked })));
  }, [cart]);

  const handleDeletingChecked = useCallback(() => {
    if (checkedCount === 0) return;
    if (!confirm(`정말 선택하신 ${checkedCount}개의 상품을 삭제하시겠습니까?`)) return;

    deleteProducts(checkedProducts);
  }, [cart]);

  const handleOrder = useCallback(() => {
    if (!confirm(`선택하신 ${checkedCount}개의 상품을 주문하시겠습니까?`)) return;
  }, [cart]);

  return {
    cart,
    cartDataHandlers,
    values: { ...values, orderButtonClass },
    handlers: { handleAllCheck, handleDeletingChecked, handleOrder },
  };
};

export default useCart;
