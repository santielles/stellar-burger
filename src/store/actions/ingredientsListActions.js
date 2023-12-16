// Это action, и это объект, который передает данные из вашего приложения в store.

import { API_SERVER_INGREDIENTS } from '../../utils/constants';

// Действия (actions) отправляются (dispatched) в store с помощью функций.
function actionLoadIngredients(ingredientsList) {
  return {
    type: 'LOAD_INGREDIENTS',
    ingredients: ingredientsList
  };
};

// Async thunk action
function fetchIngredients() {
  // Возвращаем функцию, которая принимает аргументом dispatch
  return async (dispatch) => {
    try {
      // Получаем список ингредиентов с сервера
      const response = await fetch(API_SERVER_INGREDIENTS);

      // Проверяем, успешно ли выполнен запрос
      if (!response.ok) {
        // Если нет, выводим ошибку
        throw new Error('Ошибка получения списка ингредиентов с сервера.');
      }

      // Преобразуем ответ от сервера из формата JSON в JavaScript-объект
      const responseJSON = await response.json();
      // Добавляем свойство count со значением 0 к каждому элементу массива ингредиентов
      // Это необходимо для последующей логики подсчета количества каждого ингредиента, добавленного в бургер
      const dataWithCount = responseJSON.data.map((item) => ({
        ...item,
        count: 0
      }));

      // Загружаем полученый массив ингредиентов в стор 'ingredientsListStore'
      dispatch(actionLoadIngredients(dataWithCount));
    } catch (error) {
      console.error('Ошибка получения списка ингредиентов с сервера: ', error);
    }
  };
};

// этот action мы используем для того чтобы увеличть число над ингридиентом в BurgerIngredients в "Ingredients"
function actionIncreaseCount(ingredientID) {
  return {
    type: 'INCREASE_INGREDIENTS_COUNT',
    ingredientID: ingredientID
  };
};

function actionDecreaseCount(ingredientID) {
  return {
    type: 'DECREASE_INGREDIENTS_COUNT',
    ingredientID: ingredientID
  };
};

export { actionLoadIngredients, actionIncreaseCount, actionDecreaseCount, fetchIngredients };
