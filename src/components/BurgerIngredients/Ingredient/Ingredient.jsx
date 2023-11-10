import styles from './Ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import Modal from '../../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import PropTypes from 'prop-types';

function Ingredient({ ingredientInfo }) {
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  };

  function closeModal() {
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.ingredient} onClick={openModal}>
        <img className={styles.ingredient__image} src={ingredientInfo.image} />
        <div className={styles.ingredient__price}>
          <p className="text text_type_digits-default">{ingredientInfo.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={`text text_type_main-default ${styles.ingredient__title}`}>{ingredientInfo.name}</h3 >
        <p className={`${styles.count} text text_type_digits-default`}>1</p>
      </div>
      {
        showModal &&
        <Modal className="nutritions" onClose={closeModal}>
          <IngredientDetails modalIngredientInfo={ingredientInfo} />
        </Modal>
      }
    </>
  );
}

Ingredient.propTypes = {
  ingredientInfo: PropTypes.shape({
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

export { Ingredient };
