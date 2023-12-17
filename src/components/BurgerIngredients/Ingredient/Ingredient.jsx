import styles from './Ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import Modal from '../../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useDrag } from 'react-dnd';
import { ingredientType } from '../../../utils/types';

function Ingredient({ ingredientInfo }) {
  const [showModal, setShowModal] = useState(false);

  // dragRef это рефка (ref={dragRef}) которую мы устанавливаем на div, который будет перетаскиваться
  // useDrag это хук, который принимаем в себя обязательное поле type, в нем название 'ingredient' как идентификатор
  // такой же type ставится в место куда будем перетаскивать объекты, устанавливая связь.
  // item: ingredientInfo это то что будет перетаскиваться
  const [, dragRef] = useDrag(
    {
      // type чтобы понимать куда можно перетаскивать объект,
      // то есть в поле, куда мы будем перетаскивать мы можем сказать что принимаем только объекты определённого типа
      type: 'ingredient',
      // какую информацию мы передаём вместе с объектом который перетаскиваем
      item: ingredientInfo
    }
  );

  function openModal() {
    setShowModal(true);
  };

  function closeModal() {
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.ingredient} onClick={openModal} ref={dragRef}>
        <img className={styles.ingredient__image} src={ingredientInfo.image} alt={ingredientInfo.name} />
        <div className={styles.ingredient__price}>
          <p className="text text_type_digits-default">{ingredientInfo.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={`text text_type_main-default ${styles.ingredient__title}`}>{ingredientInfo.name}</h3 >
        {ingredientInfo.count != 0 && <p className={`${styles.count} text text_type_digits-default`}>{ingredientInfo.count}</p>}
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
  ingredientInfo: ingredientType.isRequired
};

export { Ingredient };
