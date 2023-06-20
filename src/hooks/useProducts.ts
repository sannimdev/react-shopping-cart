import { requestAddItem } from "../apis";
import { IProduct } from "../domain/types";
import useProductsQuery from "../queries/useProductsQuery";
import { convertToViewError } from "./utils";

const useProducts = () => {
  const { data, status, error: queryError } = useProductsQuery();

  const error = convertToViewError(queryError as Error);

  const products = data?.products || [];

  const handleAddToCart = async (product: IProduct) => {
    if (!confirm(`${product.name}을 장바구니에 담으시겠습니까?`)) {
      return;
    }

    const result = await requestAddItem(product);
    if (!result) {
      alert("장바구니에 담지 못했습니다. 다시 시도해 주세요");
    }
  };

  return { status, error, products, handleAddToCart };
};
export default useProducts;
