import styles from './App.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionLoadIngredients } from '../../store/actions/ingredientsListActions';
import { AppHeader } from '../AppHeader/AppHeader';
import { MainSection } from '../MainSection/MainSection';

function App() {
  // когда будет несколько редьюсеров, к нужному стору надо будет обращаться по имени
  const ingredientsList = useSelector((store) => store.ingredientsListStore);
  const dispatch = useDispatch();

  // Создаем константу API_SERVER и помещаем в нее ссылку на сервер
  const API_SERVER = 'https://norma.nomoreparties.space/api/ingredients';
  // useEffect это хук, который может содержать 2 аргумента, первое это функция, в которой выполняются различные операции
  // она будет вызвываться React в зависимости от настроек во втором аргументе).
  // и второй аргумент — это массив зависимостей.
  // 1. Если вызвать useEffect без второго аргумента, он будет выполняться после каждого рендеринга компонента.
  // (наш вариант) 2. Если передать пустой массив, то useEffect выполнится один раз после первого рендеринга компонента
  // 3. Массив с переменными, useEffect будет выполняться каждый раз, когда изменяется одна из этих переменных.
  useEffect(() => {
    // используем fetch чтобы получить данные с сервера
    fetch(API_SERVER)
      // затем (then)
      .then((response) => {
        // если ответ от сервера НЕ ок, то показать ошибку
        if (!response.ok) {
          throw new Error('Server responded with error.');
        }
        // иначе вернуть ответ в виде json
        return response.json();
      })
      // затем
      .then((responseJSON) => {
        // берем ответ (json) и указываем его в качестве аргумента в функцию actionLoadIngredients
        // т.е. мы сначала вызываем функцию actionLoadIngredients, которая по сути выглядит так:
        //    type: 'LOAD_INGREDIENTS',
        //    ingredients: ingredientsList
        // где ingredientsList это наш аргумент responseJSON.data
        // и говорим нашему диспетчеру передать этот объект (action) в редьюсер
        dispatch(actionLoadIngredients(responseJSON.data));
      })
      // если при взаимодействии с сервером что-то пошло не так, пишем ошибку в консоль
      .catch((error) => console.error('Can not download data from server: ', error));
    // Ниже видно, что вторым аргументом мы указали пустой массив,
    // значит наш хук useEffect выолнится 1 раз при первом рендере
  }, []);

  // Для того чтобы наши компоненты  AppHeader и MainSection не рендерились раньше чем будут загружены данные сервера
  // нам нужно добавить условие.
  // Проверяем, если ingredientsList не true (т.е. данные еще не загружены) ИЛИ
  // длина этого списка равно нулю (т.е. ingredientsList пустой) -
  if (!ingredientsList || ingredientsList.length === 0) {
    return (
      // - отобрази сообщение о том что данные еще подгружаются.
      <div className={styles.centered_text}>
        <h1>Loading ingredients list from server...</h1>
      </div>
    );
  }
  // Как только данные загружены и ingredientsList обновлен, компоненты AppHeader и MainSection будут отрендерены.
  return (
    <div className={`${styles.app} m-10`}>
      <AppHeader />
      <MainSection />
    </div>
  );
}

export default App;
