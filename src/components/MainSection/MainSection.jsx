import styles from './MainSection.module.css';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';

function MainSection() {
  // Может так получиться что данные с сервера ещё не загружены,
  // Поэтому мы не рендерим этот компонент пока данные об ингредиентах не будут полностью загружены с сервера
  // А как только данные загрузятся, компонент App перерендерится, так как изменится его state, куда мы кладём данные
  // if (!ingredientsData || ingredientsData.length === 0) {
  //   return null;
  // }

  return (
    <main className={styles.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}

export { MainSection };
