import { API_SERVER_INGREDIENTS, LOAD_INGREDIENTS, INCREASE_INGREDIENTS_COUNT, DECREASE_INGREDIENTS_COUNT } from '../../utils/constants';
import { checkAPIResponse } from '../../utils/utils';

// Действия (actions) отправляются (dispatched) в store с помощью функций.
function loadIngredientsAction(ingredientsList) {
  return {
    type: LOAD_INGREDIENTS,
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
      const responseJSON = await checkAPIResponse(response);
      // Добавляем свойство count со значением 0 к каждому элементу массива ингредиентов
      // Это необходимо для последующей логики подсчета количества каждого ингредиента, добавленного в бургер
      const dataWithCount = responseJSON.data.map((item) => ({
        ...item,
        count: 0
      }));

      // Загружаем полученый массив ингредиентов в стор 'ingredientsListStore'
      dispatch(loadIngredientsAction(dataWithCount));
    } catch (error) {
      console.error('Ошибка получения списка ингредиентов с сервера: ', error);
    }
  };
};

// этот action мы используем для того чтобы увеличть число над ингридиентом в BurgerIngredients в "Ingredients"
function increaseCountAction(ingredientID) {
  return {
    type: INCREASE_INGREDIENTS_COUNT,
    ingredientID: ingredientID
  };
};

function decreaseCountAction(ingredientID) {
  return {
    type: DECREASE_INGREDIENTS_COUNT,
    ingredientID: ingredientID
  };
};

export { loadIngredientsAction, increaseCountAction, decreaseCountAction, fetchIngredients };
