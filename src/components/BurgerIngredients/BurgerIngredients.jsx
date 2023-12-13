import styles from './BurgerIngredients.module.css';
import { Tabs } from '../Tabs/Tabs';
import { Ingredient } from './Ingredient/Ingredient';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function BurgerIngredients() {
  // const newData = burgerIngredientsData.map((item) => {
  //   return { ...item, count: 1 };
  // });

  const burgerIngredientsData = useSelector((store) => store.ingredientsListStore);

  const [currentTab, setCurrentTab] = useState('patties');
  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер </h1>

      <Tabs activeTab={currentTab} setActiveTab={setCurrentTab} />

      <div className={`${styles.scrollableIngredientsList}`}>
        <h2 className="text text_type_main-medium pt-10 pb-5">Булки</h2>
        <div className={`${styles.ingredients} pl-4 pr-4`}>
          {
            burgerIngredientsData.map((item, index) => {
              if (item.type === 'bun') {
                return <Ingredient key={index} ingredientInfo={item} />;
              }
              return null;
            })
          }
        </div>
        <h2 className="text text_type_main-medium pt-10 pb-5">Соусы</h2>
        <div className={`${styles.ingredients} pl-4 pr-4`}>
          {
            burgerIngredientsData.map((item, index) => {
              if (item.type === 'sauce') {
                return <Ingredient key={index} ingredientInfo={item} />;
              }
              return null;
            })
          }
        </div>
        <h2 className="text text_type_main-medium pt-10 pb-5">Начинки</h2>
        <div className={`${styles.ingredients} pl-4 pr-4`}>
          {
            burgerIngredientsData.map((item, index) => {
              if (item.type === 'main') {
                return <Ingredient key={index} ingredientInfo={item} />;
              }
              return null;
            })
          }
        </div>
      </div>
    </section>
  );
}

export { BurgerIngredients };
