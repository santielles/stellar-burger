import { API_SERVER_ORDER } from '../../utils/constants';

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
      if (!response.ok) {
        // Если нет, выводим ошибку
        throw new Error('Ошибка отправки заказа');
      }

      // Преобразуем ответ от сервера из формата JSON в JavaScript-объект
      const responseData = await response.json();

      // Диспатчим действие для сохранения ответа сервера в стор
      dispatch(actionSaveOrderResponse(responseData));
    } catch (error) {
      console.error('Ошибка отправки заказа: ', error);
    }
  };
};

function actionSaveOrderResponse(orderData) {
  return {
    type: 'SAVE_ORDER',
    orderData: orderData
  };
};

export { sendOrder, actionSaveOrderResponse };
