// Пример orderData:
// {
//   "success": true,
//   "name": "Антарианский spicy краторный space бургер",
//   "order": {
//       "number": 5373
//   }
// }
const orderData = {};

function reducerOrderData(state = orderData, action) {
  switch (action.type) {
    case 'SAVE_ORDER':
      return action.orderData;
    default:
      return state;
  }
};

export { reducerOrderData };
