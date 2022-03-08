import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import styles from './Meal.module.css';
import MealItemForm from './MealItemForm';

const Meal = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `£${Number(props.price).toFixed(2)}`;
  //forwarded amout from form
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} addToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default Meal;
