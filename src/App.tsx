import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Header } from "./components";
import { RecoilRoot } from "recoil";
import { Outlet } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <div className="App">
          <Header />
          <Outlet />
        </div>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
