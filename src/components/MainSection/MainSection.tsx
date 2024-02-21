import styles from './MainSection.module.css';
import { useSelector } from 'react-redux';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Preloader from '../Preloader/Preloader';

function MainSection(): React.ReactElement {
  // когда будет несколько редьюсеров, к нужному стору надо будет обращаться по имени
  const ingredientsList = useSelector((store: any) => store.ingredientsListStore);

  // Для того чтобы наши компоненты  AppHeader и MainSection не рендерились раньше чем будут загружены данные сервера
  // нам нужно добавить условие.
  // Проверяем, если ingredientsList не true (т.е. данные еще не загружены) ИЛИ
  // длина этого списка равно нулю (т.е. ingredientsList пустой) -
  if (!ingredientsList || ingredientsList.length === 0) {
    return <Preloader />;
  }
  // Как только данные загружены и ingredientsList обновлен, компоненты AppHeader и MainSection будут отрендерены.
  return (
    // тут мы подключаем библиотеку чтобы работал drag and drop
    // она подключится ко всем компонентам, которые в нее обернуты
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
}

export { MainSection };
