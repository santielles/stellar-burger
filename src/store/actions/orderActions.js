import { API_SERVER_ORDER, SAVE_ORDER } from '../../utils/constants';
import { checkAPIResponse } from '../../utils/utils';

// Async thunk action
function sendOrder(ingredientsIDs) {
  // Возвращаем функцию, которая принимает аргументом dispatch
  return async (dispatch) => {
    try {
      // Отправляем POST-запрос на сервер с массивом из ID ингредиентов
      const response = await fetch(API_SERVER_ORDER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients: ingredientsIDs })
      });

      // Проверяем, успешно ли выполнен запрос
      checkAPIResponse(response);

      // Преобразуем ответ от сервера из формата JSON в JavaScript-объект
      const responseData = await response.json();

      // Диспатчим действие для сохранения ответа сервера в стор
      dispatch(saveOrderResponseAction(responseData));
    } catch (error) {
      console.error('Ошибка отправки заказа: ', error);
    }
  };
};

function saveOrderResponseAction(orderData) {
  return {
    type: SAVE_ORDER,
    orderData: orderData
  };
};

export { sendOrder, saveOrderResponseAction };
