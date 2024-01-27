import { useParams } from 'react-router-dom';
import styles from './IngredientDetails.module.css';
import { useSelector } from 'react-redux';

function IngredientDetails() {
  // Получаем id маршрута из url вида http://example.com/ingredients/643d69a5c3f7b9001cfa093d
  // <Route path="/ingredients/:id" element={<IngredientDetails />} />
  const { id } = useParams();
  const ingredientsList = useSelector((store) => store.ingredientsListStore);
  const ingredientInfo = ingredientsList.find((ingredient) => ingredient._id === id);

  if (!ingredientsList || ingredientsList.length === 0) {
    return (
      <div className={styles.centered_text}>
        <h1>Подождите пока данные загружается с сервера...</h1>
      </div>
    );
  }

  return (
    <>
      <p className="text text text_type_main-large mt-10">Детали ингредиента</p>
      <img className={`${styles.image_popup} mb-4`} src={ingredientInfo.image_large} alt={ingredientInfo.name} />
      <p className="text text_type_main-medium">{ingredientInfo.name}</p>
      <div className={`${styles.nutritions} mt-8 mb-15`}>
        <div>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredientInfo.calories}</p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredientInfo.proteins}</p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredientInfo.fat}</p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredientInfo.carbohydrates}</p>
        </div>
      </div>
    </>
  );
}

export default IngredientDetails;
