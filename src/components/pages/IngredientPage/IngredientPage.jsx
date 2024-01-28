import IngredientDetails from '../../BurgerIngredients/IngredientDetails/IngredientDetails';
import styles from '../pages.module.css';


function IngredientPage() {
  return (
    <div className={`${styles.entrance}`}>
      <IngredientDetails />
    </div>
  );
};

export default IngredientPage;
