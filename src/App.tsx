import React from 'react';
import { Header } from './components';
import { CartContextProvider } from './context/CartContext/CartContext';

function App({ children }: { children: React.ReactNode }) {
  return (
    <CartContextProvider>
      <div className="App">
        <Header />
        {children}
      </div>
    </CartContextProvider>
  );
}

export default App;
