import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { AppHeader } from '../AppHeader/AppHeader';
import { MainSection } from '../MainSection/MainSection';

function App() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const API_SERVER = 'https://norma.nomoreparties.space/api/ingredients';
  useEffect(() => {
    fetch(API_SERVER)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Server responded with error.');
        }
        return response.json();
      })
      .then((responseJSON) => {
        setIngredientsList(responseJSON.data);
      })
      .catch((error) => console.error('Can not download data from server: ', error));
  }, []);

  return (
    <div className={`${styles.app} m-10`}>
      <AppHeader />
      <MainSection ingredientsData={ingredientsList} />
    </div>
  );
}

export default App;
