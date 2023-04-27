import React, { useState } from "react";
import { ProductItem } from "../../components/ProductItem";
import { IProduct } from "../../domain/shopping-cart/types";
import useProducts from "./hooks/useProducts";

function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useProducts({ setProducts });

  return (
    <section className="product-container">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </section>
  );
}

export default Products;
