import React, { useState } from "react";
import { ProductItem } from "../../components/ProductItem";
import { IProduct } from "../../domain/shopping-cart/types";
import useProducts from "./hooks/useProducts";

function Products() {
  const { products } = useProducts({});

  return (
    <section className="product-container">
      {products?.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
      {/* {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))} */}
    </section>
  );
}

export default Products;
