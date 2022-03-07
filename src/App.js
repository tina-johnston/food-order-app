import React, {useState} from 'react'
import CartProvider from './store/CartProvider'
import Cart from './components/Cart/Cart';
import AvailableMeals from './components/Meals/AvailableMeals';
import Header from './Layout/Header';

function App() {
  const [showCart, setShowCart] = useState(false)

  const showCartHandler = () => {
    setShowCart(true)
  }

  const hideCartHandler = () => {
    setShowCart(false)
  }

  return (
    <CartProvider>
      <Header onShowCart={showCartHandler}/>
      {showCart && <Cart onClose={hideCartHandler}/>}
      <main>
        <AvailableMeals />
      </main>
    </CartProvider>
  );
}

export default App;
