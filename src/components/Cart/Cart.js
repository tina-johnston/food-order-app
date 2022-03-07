import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../../UI/Modal';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [checkout, setCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `£${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const onOrderHandler = () => {
    setCheckout(true);
  };
  const submitOrderHandler = async (userData) => {
    setSubmitting(true);
    await fetch(
      'https://order-13802-default-rtdb.europe-west1.firebasedatabase.app/sentOrder.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setSubmitting(false);
    setSubmitted(true);
    cartCtx.clearCart();
  };
  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={onOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      <div className={styles.total}>
        {cartItems}
        <span>total</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!checkout && modalActions}
    </>
  );

  const submittingModalContent = <p>Sending order...</p>;
  const successSubmittted = (
    <>
      <p>Your order is on its way</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!submitting && !submitted && cartModalContent}
      {submitting && submittingModalContent}
      {submitted && successSubmittted}
    </Modal>
  );
};

export default Cart;
