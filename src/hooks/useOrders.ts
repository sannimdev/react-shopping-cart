import { useMemo, useRef } from "react";
import useOrdersQuery from "../queries/useOrdersQuery";
import { IOrder } from "../domain/types";

const useOrders = () => {
  const pageRef = useRef(0);

  const { status, data, error, refetch, fetchNextPage, hasNextPage, isFetching, isRefetching } = useOrdersQuery();

  const orders = useMemo(
    () => data?.pages?.reduce((result, current) => [...result, ...current.orders], [] as IOrder[]) ?? [],
    [data],
  );

  return {
    pageRef,

    status,
    error,
    refetch,
    orders,

    queries: { fetchNextPage, hasNextPage, isFetching, isRefetching },
  };
};

export default useOrders;
