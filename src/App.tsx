import React, { PropsWithChildren } from "react";
import { Header } from "./components";
import { CartContextProvider } from "./context/CartContext/CartContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

function App({ children }: PropsWithChildren) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <div className="App">
            <Header />
            {children}
          </div>
        </CartContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
