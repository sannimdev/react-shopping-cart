import { useCallback } from "react";
import { useCart } from "..";
import { CART } from "../../domain/constants";
import { ICartItem } from "../../domain/types";

const useCartItemHandlers = () => {
  const {
    cart,
    // handlers: {
    //   cartDataHandlers: { updateItem, deleteItem },
    // },
  } = useCart();

  const toggleChecked = useCallback(
    (item: ICartItem) => {
      // updateItem({ ...item, product: { ...item.product, checked: !item.product.checked } });
    },
    [cart]
  );

  const handleDeleteItem = useCallback(
    (item: ICartItem) => {
      if (!confirm("장바구니에서 선택한 상품을 삭제하시겠습니까?")) return;

      // deleteItem(item);
    },
    [cart]
  );

  const handleIncrement = useCallback(
    (item: ICartItem) => {
      const {
        product: { quantity = CART.PRODUCTS.MIN_QUANTITY },
      } = item;

      // updateItem({ ...item, product: { ...item.product, quantity: quantity + CART.PRODUCTS.QUANTITY_UNIT } });
    },
    [cart]
  );

  const handleDecrement = useCallback(
    (item: ICartItem) => {
      const {
        product: { quantity = CART.PRODUCTS.MIN_QUANTITY },
      } = item;
      if (quantity - 1 === 0) return;

      // updateItem({ ...item, product: { ...item.product, quantity: quantity - CART.PRODUCTS.QUANTITY_UNIT } });
    },
    [cart]
  );

  return { handlers: { toggleChecked, handleDeleteItem, handleIncrement, handleDecrement } };
};

export default useCartItemHandlers;
