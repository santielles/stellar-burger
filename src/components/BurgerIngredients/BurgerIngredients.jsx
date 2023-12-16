import styles from './BurgerIngredients.module.css';
import { Tabs } from '../Tabs/Tabs';
import { Ingredient } from './Ingredient/Ingredient';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function BurgerIngredients() {
  const burgerIngredientsData = useSelector((store) => store.ingredientsListStore);

  const [currentTab, setCurrentTab] = useState('buns');
  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер </h1>

      <Tabs activeTab={currentTab} setActiveTab={setCurrentTab} />

      <div className={`${styles.scrollableIngredientsList}`}>
        <h2 className="text text_type_main-medium pt-10 pb-5">Булки</h2>
        <div className={`${styles.ingredients} pl-4 pr-4`}>
          {
            burgerIngredientsData.map((item) => {
              if (item.type === 'bun') {
                return <Ingredient key={item._id} ingredientInfo={item} />;
              }
              return null;
            })
          }
        </div>
        <h2 className="text text_type_main-medium pt-10 pb-5">Соусы</h2>
        <div className={`${styles.ingredients} pl-4 pr-4`}>
          {
            burgerIngredientsData.map((item) => {
              if (item.type === 'sauce') {
                return <Ingredient key={item._id} ingredientInfo={item} />;
              }
              return null;
            })
          }
        </div>
        <h2 className="text text_type_main-medium pt-10 pb-5">Начинки</h2>
        <div className={`${styles.ingredients} pl-4 pr-4`}>
          {
            burgerIngredientsData.map((item) => {
              if (item.type === 'main') {
                return <Ingredient key={item._id} ingredientInfo={item} />;
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
