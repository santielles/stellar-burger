import styles from './BurgerConstructor.module.css';
import { Button, ConstructorElement, CurrencyIcon, DragIcon, CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modal/Modal';
import { useDrop } from 'react-dnd';
import { actionAddIngredientToBurger, actionRemoveIngredient } from '../../store/actions/burgerConstructorActions';
import { actionIncreaseCount, actionDecreaseCount } from '../../store/actions/ingredientsListActions';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const burgerConstructorData = useSelector((store) => store.burgerConstructorStore);
  // Находим булку в списке ингредиентов
  const bun = burgerConstructorData.find((ingredient) => ingredient.type === 'bun');

  // Использование хука useDrop из библиотеки react-dnd для реализации функционала перетаскивания
  const [, dropRef] = useDrop(
    {
      // Указываем, что этот компонент может принимать элементы с типом 'ingredient'
      accept: 'ingredient',
      // draggableIngredientInfo - та самая "информация" из компонента "Ingredients" из хука useDrag из item:
      //     type: 'ingredient',
      //     item: ingredientInfo
      // которую мы передали чтобы перетащить
      //
      // Функция drop будет вызвана, когда элемент типа 'ingredient' будет отпущен над этим компонентом
      drop(draggableIngredientInfo) {
        // Вспомогательная функция для добавления ингредиента в конструктор бургера
        // и увеличения счетчика этого ингредиента.
        function addIngredient() {
          // Диспатчим action добавления ингредиента в конструктор бургера
          dispatch(actionAddIngredientToBurger(draggableIngredientInfo));
          // Диспатчим action увеличения счетчика для данного ингредиента
          dispatch(actionIncreaseCount(draggableIngredientInfo._id));
        };
        // Проверяем, является ли перетаскиваемый ингредиент булочкой
        if (draggableIngredientInfo.type === 'bun') {
          // Ищем в данных конструктора бургера уже существующую булочку
          const existingBun = burgerConstructorData.find((ingredient) => ingredient.type === 'bun');
          // Если булочка уже есть в конструкторе,
          if (existingBun) {
            // то уменьшаем счетчик для этой булочки.
            dispatch(actionDecreaseCount(existingBun._id));
          }
          // Добавляем новую булочку в конструктор и увеличиваем ее счетчик.
          addIngredient();
        } else {
          // Если перетаскиваемый ингредиент не булочка,
          // просто добавляем его в конструктор и увеличиваем счетчик.
          addIngredient();
        }
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
      {bun &&
        <div>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </div>
      }
      {
        burgerConstructorData.some((ingredient) => ingredient.type !== 'bun') && (
          <div className={styles.scrollableConstructorList}>
            {burgerConstructorData.map((ingredient, index) => {
              if (ingredient.type !== 'bun') {
                return (
                  <div key={index} className={styles.burgerConstructorItem}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      index={index}
                      text={ingredient.name}
                      price={ingredient.price}
                      thumbnail={ingredient.image_mobile}
                      handleClose={() => {
                        dispatch(actionRemoveIngredient(index));
                        dispatch(actionDecreaseCount(ingredient._id));
                      }}
                    />
                  </div>
                );
              }
            })}
          </div>
        )
      }
      {bun &&
        <div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </div>
      }
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
