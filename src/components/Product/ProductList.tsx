import React from "react";
import { IProduct } from "../../types/types";
import ProductItem from "./ProductItem";

type TProductList = {
  products: IProduct[];
};

function ProductList({ products }: TProductList) {
  return (
    <section className="product-container">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </section>
  );
}

export default ProductList;
