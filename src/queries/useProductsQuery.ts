import { useQuery } from "react-query";
import { API_URL, requestProducts } from "../apis";

export const QUERY_KEY = API_URL.PRODUCTS;

const fetcher = () =>
  requestProducts({
    page: 1,
  }).then((data) => data);

const useProductsQuery = () => {
  return useQuery(QUERY_KEY, fetcher);
};

export default useProductsQuery;
