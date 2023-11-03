import styles from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <div className={`${styles.navigation__item} pt-4 pb-4 pl-5 pr-5`}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default">Конструктор</p>
        </div>
        <div className={`${styles.navigation__item} pt-4 pb-4 pl-5 pr-5 ${styles.navigation__item_inactive}`}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default">Лента заказов</p>
        </div>
      </nav>
      <Logo />
      <div className={`${styles.navigation__item} pt-4 pb-4 pl-5 pr-5 ${styles.navigation__item_inactive}`}>
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default">Личный кабинет</p>
      </div>
    </header>
  );
}

export { AppHeader };
