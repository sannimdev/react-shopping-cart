import { useNavigate } from "react-router-dom";
import { requestAddItem, requestProducts } from "../apis";
import { IProduct } from "../domain/types";
import { IResponseError } from "../domain/types/response";
import useProductsQuery from "../queries/useProductsQuery";
import { convertToViewError } from "./utils";
import { useInfiniteQuery } from "react-query";
import fetcher from "../utils/fetcher";
import { useRef } from "react";

const useProducts = () => {
  // const { data, status, error: queryError } = useProductsQuery();

  const pageRef = useRef();

  const {
    data,
    status,
    fetchNextPage,
    error: queryError,
  } = useInfiniteQuery(
    "products",
    async ({ pageParam = 0 }) => {
      console.log(pageParam, "pageParam");
      const res = await requestProducts({ page: pageParam + 1, unit: 12 });
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage: any) => firstPage.previousId ?? 1,
      getNextPageParam: (lastPage: any) => lastPage.nextId ?? 1,
    }
  );

  const error = convertToViewError(queryError as IResponseError);

  const products = data?.pages.reduce((result, current) => {
    return [...result, ...current.products];
  }, [] as IProduct[]);

  const navigate = useNavigate(); // TODO: 모달창으로 대체되면 삭제되어야 할 코드일 수도 있음
  const handleAddToCart = async (product: IProduct, isRequiredMovePage = false) => {
    if (!confirm(`${product.name}을 장바구니에 담으시겠습니까?`)) {
      return;
    }

    const result = await requestAddItem(product);
    if (!result) {
      alert("장바구니에 담지 못했습니다. 다시 시도해 주세요");
      return;
    }

    if (isRequiredMovePage) {
      //TODO:모달창으로 바꿔야 한다.
      if (!confirm("장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?")) {
        return;
      }

      navigate("/cart");
    }
  };

  return { status, error, products, handleAddToCart, fetchNextPage };
};
export default useProducts;
