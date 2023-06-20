import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState } from "../../recoil/atoms";
import { allCheckedProductsSelector, checkedItemsSelector, estimatedPriceSelector } from "../../recoil/selector";
import fetcher from "../../utils/fetcher";
import { requestDeleteItems } from "../../apis";
import { ICartResponse } from "../../domain/types/response";
import useDataHandlers from "./useDataHandlers";
import useCartQuery from "../../queries/useCartQuery";
import { convertToViewError } from "../utils";

/**
 * TODO: 대응할 것
 * - 상품 삭제
 * - 수량 조절
 * - 선택 여부
 */

const useCart = () => {
  const { data, error: queryError } = useCartQuery();

  const error = convertToViewError(queryError as Error);

  const cart = data?.cart || { items: [] };

  // const cartDataHandlers = useDataHandlers(cart);
  // const { deleteItems, updateItems } = cartDataHandlers;

  // const toggleAllCheck = useCallback(() => {
  //   updateItems(cart.items.map((item) => ({ ...item, product: { ...item.product, checked: !allChecked } })));
  // }, [cart]);

  // const deleteCheckedItems = useCallback(async () => {
  //   if (checkedItems?.length === 0) return;
  //   if (!confirm(`정말 선택하신 ${checkedItems.length}개의 상품을 삭제하시겠습니까?`)) return;

  //   const result = await requestDeleteItems(checkedItems);
  //   if (!result) {
  //     alert("삭제에 실패했습니다. 다시 시도해주세요");
  //     return;
  //   }

  //   deleteItems(checkedItems);
  // }, [cart]);

  const checkedItems = useRecoilValue(checkedItemsSelector);
  const allChecked = useRecoilValue(allCheckedProductsSelector);
  const estimatedPrice = useRecoilValue(estimatedPriceSelector);

  return {
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
