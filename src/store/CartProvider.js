import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    //totalAmount 
    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    // if the item added already exists in the array otherwise it is null
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
      // if it exists then new object and only update item.amount
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      //copy of the state, update the item that has new amount
      updatedItems = [...state.items];
      // overide with updated item
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      //concat to exisiting array
      updatedItems = state.items.concat(action.item);
    }

    return {
      //update the context with the new values
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const exisitingItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - exisitingItem.price;
    let updatedItems;
    // if only 1 item then remove with filter by the id
    if (exisitingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      // update if more than 1 in amount, it is reduced by 1
      const updatedItem = {
        ...exisitingItem,
        amount: exisitingItem.amount - 1,
      };
      //copy of the state
      updatedItems = [...state.items];
      //the item amount updated in array
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  // clear the cart with default state
  if(action.type === 'CLEAR') {
    return defaultCartState
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  //actions

  const addItemHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({type: 'CLEAR'})
  }
  //context value that will be updated over time
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
