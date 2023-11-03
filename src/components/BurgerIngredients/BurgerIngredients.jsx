import styles from './BurgerIngredients.module.css';
import { Tabs } from '../Tabs/Tabs';
import { Ingredient } from './Ingredient/Ingredient';
import { useState } from 'react';
import PropTypes from 'prop-types';

function BurgerIngredients({ burgerIngredientsData }) {
  // const newData = burgerIngredientsData.map((item) => {
  //   return { ...item, count: 1 };
  // });

  const [currentTab, setCurrentTab] = useState('patties');
  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер </h1>

      <Tabs activeTab={currentTab} setActiveTab={setCurrentTab} />

      <div className={`${styles.scrollableIngredientsList}`}>
        {currentTab === 'buns' && (
          <>
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
          </>
        )}
        {currentTab === 'sauces' && (
          <>
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
          </>
        )}
        {currentTab === 'patties' && (
          <>
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
          </>
        )}
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  burgerIngredientsData: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  })).isRequired
};

export { BurgerIngredients };
