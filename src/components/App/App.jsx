import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { AppHeader } from '../AppHeader/AppHeader';
import { MainSection } from '../MainSection/MainSection';

function App() {
  const [data, setData] = useState([]);
  const API_SERVER = 'https://norma.nomoreparties.space/api/ingredients';
  useEffect(() => {
    fetch(API_SERVER)
      .then((response) => response.json())
      .then((responseJSON) => {
        setData(responseJSON.data);
      })
      .catch((error) => console.error('Can not download data from server: ', error));
  }, []);

  return (
    <div className={`${styles.app} m-10`}>
      <AppHeader />
      <MainSection ingredientsData={data} />
    </div>
  );
}

export default App;
