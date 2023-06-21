import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEY } from "../queries/useCartQuery";
import { ICartItem } from "../domain/types";
import { requestDeleteItems, requestToggleItem, requestUpdateQuantity } from "../apis";

const useCartMutations = () => {
  const queryClient = useQueryClient();

  return {
    deleteItems: useMutation({
      mutationFn: (items: ICartItem[]) => requestDeleteItems(items),
      onSuccess() {
        queryClient.invalidateQueries(QUERY_KEY);
      },
      // TODO: 실패 대응
    }),
    toggleCheck: useMutation({
      mutationFn: ({ items, checked }: { items: ICartItem[]; checked: boolean }) => requestToggleItem(items, checked),
      onSuccess() {
        queryClient.invalidateQueries(QUERY_KEY);
      },
      // TODO: 실패 대응
    }),
    updateQuantity: useMutation({
      mutationFn: (item: ICartItem) => requestUpdateQuantity(item),
      onSuccess() {
        queryClient.invalidateQueries(QUERY_KEY);
      },
    }),
  };
};

export default useCartMutations;
