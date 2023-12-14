import styles from './BurgerConstructor.module.css';
import { Button, ConstructorElement, CurrencyIcon, DragIcon, CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modal/Modal';
import { useDrop } from 'react-dnd';
import { burgerConstructorActions } from '../../store/actions/burgerConstructorActions';

function BurgerConstructor() {
  const burgerConstructorData = useSelector((store) => store.burgerConstructorStore);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const [, dropRef] = useDrop(
    {
      accept: 'ingredient',
      drop(draggableIngredientInfo) {
        console.log(draggableIngredientInfo);
        dispatch(burgerConstructorActions(draggableIngredientInfo));
      }
    }
  );

  function openModal() {
    setShowModal(true);
  };

  function closeModal() {
    setShowModal(false);
  };

  return (
    <section className={`${styles.burgerConstructor} pt-25 pl-4 pr-4 pb-13`} ref={dropRef}>
      <div>
        {burgerConstructorData.length != 0 && burgerConstructorData.map((el) => {
          return (
            <ConstructorElement
              key={el._id}
              type="main"
              isLocked={false}
              text={el.name}
              price={el.price}
              thumbnail={el.image_mobile}
            />
          );
        })}
      </div>
      {/* <div>
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
      </div> */}
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
