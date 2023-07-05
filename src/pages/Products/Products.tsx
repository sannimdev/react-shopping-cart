import React, { Suspense } from "react";
import ProductList from "./ProductList";
import ProductTemplate from "./ProductTemplate";
import { CartItemsSkeleton } from "../../components/CartItemsSkeleton";

function Products() {
  return (
    <ProductTemplate>
      <Suspense fallback={<CartItemsSkeleton />}>
        <ProductList />
      </Suspense>
    </ProductTemplate>
  );
}

export default Products;
