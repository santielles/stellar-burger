import styles from './Ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { TIngredient } from '../../../utils/types';

interface IngredientProps {
  ingredientInfo: TIngredient;
  onClick: () => void;
}

function Ingredient({ ingredientInfo, onClick }: IngredientProps): React.ReactElement {
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

  return (
    <>
      <div className={styles.ingredient} onClick={onClick} ref={dragRef}>
        <img className={styles.ingredient__image} src={ingredientInfo.image} alt={ingredientInfo.name} />
        <div className={styles.ingredient__price}>
          <p className="text text_type_digits-default">{ingredientInfo.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={`text text_type_main-default ${styles.ingredient__title}`}>{ingredientInfo.name}</h3 >
        {ingredientInfo.count != 0 && <p className={`${styles.count} text text_type_digits-default`}>{ingredientInfo.count}</p>}
      </div>
    </>
  );
}

export { Ingredient };
