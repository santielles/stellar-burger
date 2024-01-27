import { NavLink } from 'react-router-dom';
import styles from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.navigation_container}>
        <nav className={styles.navigation}>
          <NavLink to="/"
            className={({ isActive }) =>
              isActive ?
                `${styles.navigation__item} ${styles.navigation__item_active} pt-4 pb-4 pl-5 pr-5` :
                `${styles.navigation__item} pt-4 pb-4 pl-5 pr-5`
            }
          >
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
          </NavLink>
          <a href="#" className={`${styles.navigation__item} pt-4 pb-4 pl-5 pr-5 ${styles.navigation__item_inactive}`}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default">Лента заказов</p>
          </a>
        </nav>
        <Logo />
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ?
              `${styles.navigation__item} ${styles.navigation__item_active} pt-4 pb-4 pl-5 pr-5` :
              `${styles.navigation__item} pt-4 pb-4 pl-5 pr-5`
          }
        >
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default">Личный кабинет</p>
        </NavLink>
      </div>
    </header >
  );
}

export { AppHeader };
