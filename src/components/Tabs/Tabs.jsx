import styles from './Tabs.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function Tabs({ current, setCurrent }) {
  return (
    <div className={styles.tabs}>
      <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="patties" active={current === 'patties'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

export { Tabs };
