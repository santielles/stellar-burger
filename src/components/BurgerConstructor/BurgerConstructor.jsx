import styles from './BurgerConstructor.module.css';
import { Button, ConstructorElement, CurrencyIcon, DragIcon, CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modal/Modal';
import { useDrop } from 'react-dnd';
import { actionAddIngredientToBurger, actionRemoveIngredient } from '../../store/actions/burgerConstructorActions';
import { actionIncreaseCount, actionDecreaseCount } from '../../store/actions/ingredientsListActions';
import { sendOrder } from '../../store/actions/orderActions';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const orderID = useSelector((store) => store.orderStore);
  const burgerConstructorData = useSelector((store) => store.burgerConstructorStore);
  const burgerConstructorDataIDs = burgerConstructorData.map((ingredient) => ingredient._id);
  // Проверяем, есть ли в конструкторе булочка
  const hasBun = burgerConstructorData.find((ingredient) => ingredient.type === 'bun');
  // Проверяем, есть ли в конструкторе другие ингредиенты, кроме булочек
  const hasOtherIngredients = burgerConstructorData.find((ingredient) => ingredient.type !== 'bun');
  // Кнопка активна, если есть хотя бы одна булочка и один другой ингредиент
  const isOrderButtonActive = hasBun && hasOtherIngredients;

  // Расчет общей стоимости заказа только при изменении burgerConstructorData
  const totalBurgerPrice = useMemo(() => {
    return burgerConstructorData.reduce((total, ingredient) => {
      // Для булочек цена удваивается
      if (ingredient.type === 'bun') {
        return total + (ingredient.price * 2);
      }
      // Для остальных ингредиентов цена добавляется один раз
      return total + ingredient.price;
    }, 0); // Начальное значение total = 0
  }, [burgerConstructorData]);

  // Использование хука useDrop из библиотеки react-dnd для реализации функционала перетаскивания
  const [, dropRef] = useDrop(
    {
      // Указываем, что этот компонент может принимать элементы с типом 'ingredient'
      accept: 'ingredient',
      // draggableIngredientInfo - та самая "информация" из компонента 'Ingredients' из хука useDrag из item:
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
      {hasBun &&
        <div>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${hasBun.name} (верх)`}
            price={hasBun.price}
            thumbnail={hasBun.image_mobile}
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
      {hasBun &&
        <div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${hasBun.name} (низ)`}
            price={hasBun.price}
            thumbnail={hasBun.image_mobile}
          />
        </div>
      }
      <div className={styles.burgerConstructor__order}>
        <div className={styles.burgerConstructor__price}>
          <p className="text text_type_digits-medium">{totalBurgerPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={() => {
            dispatch(sendOrder(burgerConstructorDataIDs));
            openModal();
          }}
          htmlType="button"
          type="primary"
          size="large"
          disabled={!isOrderButtonActive}
        >
          Оформить заказ
        </Button>
        {
          showModal && orderID != -1 && (
            <Modal onClose={closeModal}>
              <p className="text text_type_digits-large mt-30 mb-8">{orderID}</p>
              <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
              <CheckMarkIcon type="primary" />
              <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
              <p className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
            </Modal>
          )
        }
      </div>
    </section >
  );
}

export { BurgerConstructor };
