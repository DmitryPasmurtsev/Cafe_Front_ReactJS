import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return <nav className={styles.nav}>
    <div>
      <NavLink className={navData => navData.isActive ? styles.active : styles.item } to='/'>Главная страница</NavLink>
    </div>
    <div>
      <NavLink  className={navData => navData.isActive ? styles.active : styles.item }to='/employees'>Работники</NavLink>
    </div>
    <div>
      <NavLink className={navData => navData.isActive ? styles.active : styles.item } to='/orders'>Заказы</NavLink>
    </div>
    <div>
      <NavLink className={navData => navData.isActive ? styles.active : styles.item } to='/deliveries'>Поставки</NavLink>
    </div>
    <div>
      <NavLink className={navData => navData.isActive ? styles.active : styles.item } to='/suppliers'>Поставщики</NavLink>
    </div>
    <div>
      <NavLink className={navData => navData.isActive ? styles.active : styles.item } to='/products'>Продукты</NavLink>
    </div><br/><br/>
    <div>
      <NavLink className={navData => navData.isActive ? styles.active : styles.item } to='/views'>Представления</NavLink>
    </div>
    <div>
      <NavLink className={navData => navData.isActive ? styles.active : styles.item } to='/account'>Аккаунт</NavLink>
    </div> 
  </nav>
}

export default Navbar;