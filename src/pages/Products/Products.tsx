import React, { Suspense } from "react";
import ProductList from "./ProductList";
import ProductTemplate from "./ProductTemplate";
import { CartItemsSkeleton } from "../../components/CartItemsSkeleton";

function Products() {
  return (
    <Suspense
      fallback={
        <ProductTemplate>
          <CartItemsSkeleton />
        </ProductTemplate>
      }
    >
      <ProductList />
    </Suspense>
  );
}

export default Products;
