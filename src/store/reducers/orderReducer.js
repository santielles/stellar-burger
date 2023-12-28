import { SAVE_ORDER } from '../../utils/constants';

// Пример orderData:
// {
//   "success": true,
//   "name": "Антарианский spicy краторный space бургер",
//   "order": {
//       "number": 5373
//   }
// }
const orderData = {};

function orderReducer(state = orderData, action) {
  switch (action.type) {
    case SAVE_ORDER:
      return action.orderData;
    default:
      return state;
  }
};

export { orderReducer };
