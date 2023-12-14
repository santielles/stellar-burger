import styles from './MainSection.module.css';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function MainSection() {
  // Может так получиться что данные с сервера ещё не загружены,
  // Поэтому мы не рендерим этот компонент пока данные об ингредиентах не будут полностью загружены с сервера
  // А как только данные загрузятся, компонент App перерендерится, так как изменится его state, куда мы кладём данные
  // if (!ingredientsData || ingredientsData.length === 0) {
  //   return null;
  // }

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
