import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';

function IngredientDetails({ modalIngredientInfo }) {
  return (
    <div className="nutritions">
      <p className="text text text_type_main-medium mt-10">Детали ингредиента</p>
      <img className={`${styles.image_popup} mb-4`} src={modalIngredientInfo.image} />
      <p className="text text_type_main-default">{modalIngredientInfo.name}</p>
      <div className={`${styles.nutritions} mt-8 mb-15`}>
        <div>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <p className="text text_type_main-default text_color_inactive">{modalIngredientInfo.calories}</p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_main-default text_color_inactive">{modalIngredientInfo.proteins}</p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_main-default text_color_inactive">{modalIngredientInfo.fat}</p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_main-default text_color_inactive">{modalIngredientInfo.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  modalIngredientInfo: PropTypes.shape({
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
  }).isRequired
};

export default IngredientDetails;
