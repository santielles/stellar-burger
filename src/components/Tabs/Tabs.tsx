import styles from './Tabs.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

interface TabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

function Tabs({ activeTab, setActiveTab }: TabsProps): React.ReactElement {
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

export { Tabs };
