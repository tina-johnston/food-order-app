import React from 'react'

const CartContext = React.createContext({
  //for autocomplete
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
})

export default CartContext