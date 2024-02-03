import styles from './DraggableIngredient.module.css';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { reorderIngredientsAction, removeIngredientAction } from '../../../store/actions/burgerConstructorActions';
import { decreaseCountAction } from '../../../store/actions/ingredientsListActions';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../../utils/types';

interface DraggableIngredientProps {
  index: number;
  ingredient: TIngredient;
}

function DraggableIngredient({ index, ingredient }: DraggableIngredientProps): React.ReactElement {
  const dispatch = useDispatch();
  const dragAndDropRef = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'ingredientReorder',
    // Функция, вызываемая при наведении перетаскиваемого игредиента на другой ингредиент
    hover(draggedIngredient: TIngredient) {
      // Если рефка пустая, завершаем функцию
      if (!dragAndDropRef.current) return;
      // Индекс перетаскиваемого игредиента
      const dragIndex = draggedIngredient.index;
      // Индекс игредиента над которым производится перетаскивание
      const hoverIndex = index;
      // Если индексы обоих ингредиентов равны, завершаем функцию
      if (dragIndex === hoverIndex) return;
      // Иначе упорядочиваем ингредиенты
      dispatch(reorderIngredientsAction(dragIndex, hoverIndex));
      // Меняем у текущего игредиента индекс на актуальный
      draggedIngredient.index = hoverIndex;
    }
  });

  const [, drag] = useDrag({
    type: 'ingredientReorder',
    item: { type: 'ingredientReorder', index }
  });

  // Назначаем элементу с ref=dragAndDropRef возможноть одновременно использовать drag и drop
  drag(drop(dragAndDropRef));

  return (
    <div ref={dragAndDropRef} className={styles.burgerConstructorItem}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        // При нажатии на значок корзины
        handleClose={() => {
          // Удаляем ингредиент
          dispatch(removeIngredientAction(index));
          // Уменьшаем его счётчик
          dispatch(decreaseCountAction(ingredient._id));
        }}
      />
    </div>
  );
}

export { DraggableIngredient };
