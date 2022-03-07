import {useRef, useState} from 'react'
import styles from './Checkout.module.css';

const isEmpty = value => value.trim().length !== 0


const Checkout = (props) => {
const [formValidity, setFormValidity] = useState({
  name: true,
  street: true,
  city: true,
  postcode: true
})
  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const cityInputRef = useRef()
  const postcodeInputRef = useRef()

  const confirmOrderHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredCity = cityInputRef.current.value
    const enteredPostcode = postcodeInputRef.current.value

    const nameIsValid = isEmpty(enteredName)
    const streetIsValid = isEmpty(enteredStreet)
    const cityIsValid = isEmpty(enteredCity)
    const postcodeIsValid = isEmpty(enteredPostcode)

    setFormValidity({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postcode: postcodeIsValid
    })

    const formIsValid = nameIsValid && streetIsValid && cityIsValid && postcodeIsValid


    if (!formIsValid) {
      return 
    }
    //send data to cart 
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postcode: enteredPostcode
    })
  };
// css for validity red for invalid

  return (
    <form className={styles.form} onSubmit={confirmOrderHandler}>
      <div className={styles.control}>
        <label htmlFor='name'>Your name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {!formValidity.name && <p>please enter a valid name</p>}
      </div>
      <div className={styles.control}>
        <label htmlFor='street'>Street</label>
        <input ref={streetInputRef} type='text' id='name' />
        {!formValidity.street && <p>please enter a valid street</p>}
      </div>
      <div className={styles.control}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='name' />
        {!formValidity.city && <p>please enter a valid city</p>}
      </div>
      <div className={styles.control}>
        <label htmlFor='postcode'>Postcode</label>
        <input ref={postcodeInputRef} type='text' id='name' />
        {!formValidity.postcode && <p>please enter a valid postcode</p>}
      </div>
      <div className={styles.actions
      }>
        <button className={styles.submit}>Confirm</button>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Checkout;
