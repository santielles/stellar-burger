import styles from './Tabs.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { tabsType } from '../../utils/types';

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className={styles.tabs}>
      <Tab value="buns" active={activeTab === 'buns'} onClick={setActiveTab}>
        Булки
      </Tab>
      <Tab value='sauces' active={activeTab === 'sauces'} onClick={setActiveTab}>
        Соусы
      </Tab>
      <Tab value='patties' active={activeTab === 'patties'} onClick={setActiveTab}>
        Начинки
      </Tab>
    </div>
  );
}

Tabs.propTypes = tabsType;

export { Tabs };
