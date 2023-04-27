import { IProduct } from "../../../domain/shopping-cart/types";
import { useQuery } from "react-query";
import { getProducts } from "../../../apis/products";

type THookProductsProps = {
  // setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
};

const useProducts = (props: THookProductsProps) => {
  // const queryClient = useQueryClient();

  const query = useQuery("products", getProducts);

  const products = query.data?.products;

  return { products };
};

export default useProducts;
