import {useContext} from 'react'
import CartContext from '../store/cart-context'
import CartIcon from "../assets/CartIcon"
import styles from './CartButton.module.css'

const CartButton = (props) => {
  const cartCtx = useContext(CartContext)


  const numberOfCartItems = cartCtx.items.reduce((currNumber, item) => {
    return currNumber + item.amount
  }, 0)
  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}><CartIcon /></span>
      <span><p>Cart</p></span>
      <span className={styles.badge}>{numberOfCartItems}</span>
      
    </button>
  )
}

export default CartButton
