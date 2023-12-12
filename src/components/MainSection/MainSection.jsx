import styles from './MainSection.module.css';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import PropTypes from 'prop-types';

function MainSection() {
  // Может так получиться что данные с сервера ещё не загружены,
  // Поэтому мы не рендерим этот компонент пока данные об ингредиентах не будут полностью загружены с сервера
  // А как только данные загрузятся, компонент App перерендерится, так как изменится его state, куда мы кладём данные
  // if (!ingredientsData || ingredientsData.length === 0) {
  //   return null;
  // }

  return (
    <main className={styles.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}

MainSection.propTypes = {
  ingredientsData: PropTypes.arrayOf(PropTypes.shape({
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

export { MainSection };
