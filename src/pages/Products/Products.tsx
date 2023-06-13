import React, { useEffect, useState } from "react";
import { ProductItem } from "../../components/ProductItem";
import { getProducts } from "../../apis/products";
import { useCartContext } from "../../context/CartContext";
import { IProduct } from "../../domain/shopping-cart/types";

function Products() {
  const [products, setProducts] = useState([] as IProduct[]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts({});
      setProducts((products) => [...products, ...response.products]);
    } catch (error) {
      console.error(error);
    }
  };

  // 이벤트 핸들러
  const {
    cartDataHandlers: { insertProduct },
  } = useCartContext();

  const handleAddToCart = (product: IProduct) => {
    if (!confirm(`${product.name}을 장바구니에 담으시겠습니까?`)) {
      return;
    }

    insertProduct({ ...product, checked: true });
  };

  return (
    <section className="product-container">
      {products?.map((product) => (
        <ProductItem key={product.id} product={product} onAddInCart={handleAddToCart} />
      ))}
    </section>
  );
}

export default Products;
