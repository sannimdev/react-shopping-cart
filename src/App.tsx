import React from "react";
import { Header } from "./components";
import { ProductList } from "./components/Product";

//TODO: 지우기
import { sampleProducts } from "./tododelete/sampledb";

function App() {
  return (
    <div className="App">
      <Header />
      <ProductList products={sampleProducts} />
    </div>
  );
}

export default App;
