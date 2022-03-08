import React, {useRef} from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const amountInputRef = useRef()
  const submitHandler = (event) => {
    event.preventDefault()
    const enteredAmount = parseInt(amountInputRef.current.value)

    //if check for validation for empty string. useState for message
    //function to forward the value to meal where the rest of the data is
    props.addToCart(enteredAmount)
  }
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{ id:'Amount_' + props.id,type: 'number', min: '1', step: '1', defaultValue: '1' }}
      />
      <button>Add</button>
    </form>
  );
};

export default MealItemForm;
