import styles from './BurgerConstructor.module.css';
import { data } from '../../utils/data';
import { Button, ConstructorElement, CurrencyIcon, DragIcon, CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import Modal from '../Modal/Modal';

function BurgerConstructor() {
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  };

  function closeModal() {
    setShowModal(false);
  };
  const tempBurger = [];

  for (let i = 1; i <= 5; i++) {
    tempBurger[i - 1] = data[i];
  }

  return (
    <section className={`${styles.burgerConstructor} pt-25 pl-4 pr-4 pb-13`}>
      <div>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${data[0].name} (верх)`}
          price={data[0].price}
          thumbnail={data[0].image_mobile}
        />
      </div>
      <div className={styles.scrollableConstructorList}>
        {
          tempBurger.map((ingredient) => {
            {
              return (
                <div className={styles.burgerConstructorItem}>
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
          text={`${data[0].name} (низ)`}
          price={data[0].price}
          thumbnail={data[0].image_mobile}
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

export { BurgerConstructor };
