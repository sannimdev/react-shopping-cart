import React, { PropsWithChildren } from "react";
import { Header } from "./components";
import { CartContextProvider } from "./context/CartContext/CartContext";
import { CheckoutContextProvider } from "./context/CheckoutContext";

function App({ children }: PropsWithChildren) {
  return (
    <CartContextProvider>
      <CheckoutContextProvider>
        <div className="App">
          <Header />
          {children}
        </div>
      </CheckoutContextProvider>
    </CartContextProvider>
  );
}

export default App;
