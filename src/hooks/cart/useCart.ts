import { CART } from "../../domain/constants";
import useCartQuery from "../../queries/useCartQuery";
import { convertToViewError } from "../utils";

/**
 * TODO: 대응할 것
 * - 상품 삭제
 * - 수량 조절
 * - 선택 여부
 */

const useCart = () => {
  const { status, data, error: queryError, refetch } = useCartQuery();

  const error = convertToViewError(queryError as Error);

  const cart = data?.cart || { items: [] };

  const allChecked = cart.items?.every(({ checked }) => !!checked) || false;

  const checkedItems = cart.items?.filter(({ checked }) => checked) || [];

  const estimatedPrice =
    checkedItems.reduce(
      (result, current) =>
        result + current.product.price * (current.product.quantity ?? CART.PRODUCTS.DEFAULT_INITIAL_QUANTITY),
      0
    ) || 0;

  return {
    status,
    error,
    refetch,
    cart,

    values: {
      checkedItems,
      allChecked,
      estimatedPrice,
    },

    // handlers: {
    //   // cartDataHandlers,
    //   // toggleAllCheck,
    //   // deleteCheckedItems,
    // },
  };
};

export default useCart;
