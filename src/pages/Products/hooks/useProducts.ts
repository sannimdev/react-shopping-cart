import { useEffect } from "react";
import { IProduct, IProductResponse } from "../../../domain/shopping-cart/types";
import { API_URL } from "../../../domain/shopping-cart/constants";
import fetcher from "../../../utils/fetcher";

type THookProductsProps = {
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
};

const useProducts = ({ setProducts }: THookProductsProps) => {
  useEffect(() => {
    const loadProducts = async () => {
      const response = (await fetcher.get(API_URL.PRODUCTS)) as IProductResponse;
      setProducts(response.products);
    };

    loadProducts();
  }, []);

  return null;
};

export default useProducts;
