const orderID = -1;

function reducerOrderID(state = orderID, action) {
  switch (action.type) {
    case 'SAVE_ORDER':
      return action.orderID;
    default:
      return state;
  }
};

export { reducerOrderID };
