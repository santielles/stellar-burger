import styles from './MainSection.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients } from '../../store/actions/ingredientsListActions';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function MainSection() {
  // когда будет несколько редьюсеров, к нужному стору надо будет обращаться по имени
  const ingredientsList = useSelector((store) => store.ingredientsListStore);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  // Для того чтобы наши компоненты  AppHeader и MainSection не рендерились раньше чем будут загружены данные сервера
  // нам нужно добавить условие.
  // Проверяем, если ingredientsList не true (т.е. данные еще не загружены) ИЛИ
  // длина этого списка равно нулю (т.е. ingredientsList пустой) -
  if (!ingredientsList || ingredientsList.length === 0) {
    return (
      // - отобрази сообщение о том что данные еще подгружаются.
      <div className={styles.centered_text}>
        <h1>Подождите пока данные загружается с сервера...</h1>
      </div>
    );
  }
  // Как только данные загружены и ingredientsList обновлен, компоненты AppHeader и MainSection будут отрендерены.
  return (
    // тут мы подключаем библиотеку чтобы работал drag and drop
    // она подключится ко всем компонентам, которые в нее обернуты
    <DndProvider backend={HTML5Backend}>
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DndProvider>
  );
}

export { MainSection };
