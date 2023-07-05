import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ProductItem } from "../../components/ProductItem";
import { useProducts } from "../../hooks";
import { IProduct } from "../../domain/types";

function ProductList() {
  const { ref: infiniteRef, inView } = useInView();

  const { pageRef, products, handleAddToCart, fetchNextPage } = useProducts();

  useEffect(() => {
    if (inView) {
      pageRef.current += 1;
      fetchNextPage({ pageParam: pageRef.current });
    }
  }, [inView]);

  return (
    <>
      {products?.map((product: IProduct) => (
        <ProductItem key={product.id} product={product} onAddInCart={handleAddToCart} />
      ))}
      {products?.length && <hr style={{ visibility: "hidden" }} ref={infiniteRef} />}
    </>
  );
}

export default ProductList;
