import styles from './App.module.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { MainSection } from '../MainSection/MainSection';

function App() {
  return (
    <div className={`${styles.app} m-10`}>
      <AppHeader />
      <MainSection />
    </div>
  );
}

export default App;
