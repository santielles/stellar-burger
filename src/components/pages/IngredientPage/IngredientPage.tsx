import IngredientDetails from '../../BurgerIngredients/IngredientDetails/IngredientDetails';
import styles from '../pages.module.css';


function IngredientPage(): React.ReactElement {
  return (
    <div className={`${styles.entrance}`}>
      <IngredientDetails />
    </div>
  );
};

export default IngredientPage;
