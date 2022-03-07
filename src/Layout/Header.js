import { Fragment } from 'react';
import CartButton from './CartButton'
import ramen from '../assets/ramen.jpg'
import styles from './Header.module.css'
const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>Ramen bowels</h1>
        <CartButton onClick={props.onShowCart}/>
      </header>
      <div className={styles['main-image']}><img src={ramen} alt='bowl of noodles'/></div>
    </Fragment>
  );
};

export default Header;
