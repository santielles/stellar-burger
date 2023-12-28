import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

function OrderDetails() {
  const orderData = useSelector((store) => store.orderDataStore);

  // Если данные заказа ещё не получены с сервера
  if (Object.keys(orderData).length === 0) {
    return (
      // отобразим сообщение о том что данные еще подгружаются.
      <div>
        <h1 className="text text_type_main-large text_color_inactive mb-30 mt-30">Подождите пока заказ загружается на сервер...</h1>
      </div>
    );
  }

  return (
    <div>
      <p className="text text_type_digits-large mt-30 mb-8">{orderData.order.number}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <CheckMarkIcon type="primary" />
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;
