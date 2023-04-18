import React from "react";
import { Header } from "./components";
import cartIcon from "./assets/svgs/cart.svg";
import productThumbnail from "./assets/images/product.png";

function App() {
  return (
    <div className="App">
      <Header />

      <section className="product-container">
        <div>
          <img src={productThumbnail} alt="PET보틀-정사각(420ml)" />
          <div className="flex justify-between w-280 p-5">
            <div className="product-info">
              <span className="product-info__name">PET보틀-정사각(420ml)</span>
              <span className="product-info__price">43,000원</span>
            </div>
            <img src={cartIcon} alt="장바구니" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
