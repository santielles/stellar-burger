import styles from './BurgerConstructor.module.css';
import { Button, ConstructorElement, CurrencyIcon, DragIcon, CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

function BurgerConstructor({ burgerConstructorData }) {
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  };

  function closeModal() {
    setShowModal(false);
  };
  const tempBurger = [];

  for (let i = 1; i <= 5; i++) {
    tempBurger[i - 1] = burgerConstructorData[i];
  }

  return (
    <section className={`${styles.burgerConstructor} pt-25 pl-4 pr-4 pb-13`}>
      <div>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${burgerConstructorData[0].name} (верх)`}
          price={burgerConstructorData[0].price}
          thumbnail={burgerConstructorData[0].image_mobile}
        />
      </div>
      <div className={styles.scrollableConstructorList}>
        {
          tempBurger.map((ingredient) => {
            {
              return (
                <div key={ingredient._id} className={styles.burgerConstructorItem}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image_mobile}
                  />
                </div>
              );
            }
          })
        }
      </div>
      <div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${burgerConstructorData[0].name} (низ)`}
          price={burgerConstructorData[0].price}
          thumbnail={burgerConstructorData[0].image_mobile}
        />
      </div>
      <div className={styles.burgerConstructor__order}>
        <div className={styles.burgerConstructor__price}>
          <p className="text text_type_digits-medium">9999</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={() => openModal()} htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
        {
          showModal && (
            <Modal onClose={closeModal}>
              <p className="text text_type_digits-large mt-30 mb-8">034536</p>
              <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
              <CheckMarkIcon type="primary" />
              <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
              <p className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
            </Modal>
          )
        }
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  burgerConstructorData: PropTypes.arrayOf(PropTypes.shape({
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

export { BurgerConstructor };
