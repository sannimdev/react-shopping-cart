import { useMutation } from "react-query";
import { requestDeleteItems, requestToggleItem, requestUpdateQuantity } from "../../apis";
import { ICartItem } from "../../domain/types";
import useCart from "./useCart";
import { useCallback } from "react";
import { CART } from "../../domain/constants";
import useCartMutations from "../../mutations/useCartMutations";

const useCartItemHandlers = () => {
  const {
    cart,
    values: { allChecked, checkedItems },
  } = useCart();

  const { deleteItems, toggleCheck, updateQuantity } = useCartMutations();

  const updateItemQuantity = useCallback(
    (item: ICartItem) => {
      updateQuantity.mutate(item);
    },
    [updateQuantity, cart]
  );

  const deleteCheckedItems = useCallback(() => {
    if (!confirm("장바구니에서 선택한 상품을 삭제하시겠습니까?")) return;

    deleteItems.mutate(checkedItems);
  }, [deleteItems]);

  const toggleAllCheck = useCallback(() => {
    toggleCheck.mutate({ items: cart.items, checked: !allChecked });
  }, [toggleCheck, cart]);

  const cartItemHandlers = {
    toggleCheck(item: ICartItem) {
      toggleCheck.mutate({ items: [item], checked: !item.checked });
    },
    handleDeleteItem(item: ICartItem) {
      if (!confirm("상품을 삭제하시겠습니까?")) return;

      deleteItems.mutate([item]);
    },
    handleIncrement(item: ICartItem) {
      const quantity = (item.product.quantity ?? CART.PRODUCTS.DEFAULT_INITIAL_QUANTITY) + CART.PRODUCTS.QUANTITY_UNIT;

      if (quantity <= CART.PRODUCTS.MAX_QUANTITY) {
        updateItemQuantity({ ...item, product: { ...item.product, quantity } });
      }
    },
    handleDecrement(item: ICartItem) {
      const quantity = (item.product.quantity ?? CART.PRODUCTS.DEFAULT_INITIAL_QUANTITY) - CART.PRODUCTS.QUANTITY_UNIT;

      if (quantity >= CART.PRODUCTS.MIN_QUANTITY) {
        updateItemQuantity({ ...item, product: { ...item.product, quantity } });
      }
    },
  };

  return { toggleAllCheck, deleteCheckedItems, cartItemHandlers };
};

export default useCartItemHandlers;
