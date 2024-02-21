import styles from './BurgerIngredients.module.css';
import { Tabs } from '../Tabs/Tabs';
import { Ingredient } from './Ingredient/Ingredient';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import Modal from '../Modal/Modal';
import IngredientDetails from './IngredientDetails/IngredientDetails';
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '../../utils/types';

function BurgerIngredients(): React.ReactElement {
  const ingredientsList: TIngredient[] = useSelector((store: any) => store.ingredientsListStore);
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('buns');
  // Используем хук useInView чтобы определить какая секция ингредиентов в поле видимости
  // Создаем три ссылки (ref) и три состояния видимости (inView) для трех секций: булки, соусы, и начинки
  //    bunsSectionRef - ссылка на DOM-элемент секции булок
  //    bunsSectionInView - значение true/false, определяющее, видна ли секция булок на экране или нет
  //    threshold: 0.2 означает, что секция считается видимой, когда как минимум 20% её видно на экране
  const { ref: bunsSectionRef, inView: bunsSectionInView } = useInView({ threshold: 0.2 });
  const { ref: saucesSectionRef, inView: saucesSectionInView } = useInView({ threshold: 0.2 });
  const { ref: pattiesSectionRef, inView: pattiesSectionInView } = useInView({ threshold: 0.2 });

  // Состояния для управления модальным окном
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Функция для открытия модального окна с данными ингредиента
  function openModal(ingredientID: string): void {
    setIsModalOpen(true);
    navigate(`/ingredients/${ingredientID}`, { state: { modalOpened: true } });
  };
  // Функция для закрытия модального окна
  function closeModal(): void {
    setIsModalOpen(false);
    navigate(`/`);
  };

  // Используем useEffect для отслеживания видимости каждой секции
  // Делаем активный таб в зависимости от того, какая секция видна на экране
  // useEffect будет вызван при изменении [bunsSectionInView, saucesSectionInView, pattiesSectionInView]
  useEffect(() => {
    // Если секция булок видна
    if (bunsSectionInView) {
      // делаем активным таб 'buns'
      setCurrentTab('buns');
    } else if (saucesSectionInView) {
      setCurrentTab('sauces');
    } else if (pattiesSectionInView) {
      setCurrentTab('patties');
    }
  }, [bunsSectionInView, saucesSectionInView, pattiesSectionInView]);

  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер </h1>

      <Tabs activeTab={currentTab} setActiveTab={setCurrentTab} />

      <div className={`${styles.scrollableIngredientsList}`}>
        <h2 className="text text_type_main-medium pt-10 pb-5">Булки</h2>
        <div className={`${styles.ingredients} pl-4 pr-4`} ref={bunsSectionRef}>
          {
            ingredientsList.map((item) => {
              if (item.type === 'bun') {
                return <Ingredient key={item._id} ingredientInfo={item} onClick={() => openModal(item._id)} />;
              }
              return null;
            })
          }
        </div>
        <h2 className="text text_type_main-medium pt-10 pb-5">Соусы</h2>
        <div className={`${styles.ingredients} pl-4 pr-4`} ref={saucesSectionRef}>
          {
            ingredientsList.map((item) => {
              if (item.type === 'sauce') {
                return <Ingredient key={item._id} ingredientInfo={item} onClick={() => openModal(item._id)} />;
              }
              return null;
            })
          }
        </div>
        <h2 className="text text_type_main-medium pt-10 pb-5">Начинки</h2>
        <div className={`${styles.ingredients} pl-4 pr-4`} ref={pattiesSectionRef}>
          {
            ingredientsList.map((item) => {
              if (item.type === 'main') {
                return <Ingredient key={item._id} ingredientInfo={item} onClick={() => openModal(item._id)} />;
              }
              return null;
            })
          }
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
}

export { BurgerIngredients };
