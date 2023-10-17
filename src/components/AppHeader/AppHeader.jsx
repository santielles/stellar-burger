import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <div className={styles.navigation__item}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default">Конструктор</p>
        </div>
        <div className={`${styles.navigation__item} ${styles.navigation__item_inactive}`}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default">Лента заказов</p>
        </div>
      </nav>
      <Logo />
      <div className={`${styles.navigation__item} ${styles.navigation__item_inactive}`}>
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default">Личный кабинет</p>
      </div>
    </header>
  );
}

export { AppHeader };
