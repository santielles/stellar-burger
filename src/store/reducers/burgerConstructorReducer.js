const burgerConstructor = [];

function reducerBurgerConstructor(state = burgerConstructor, action) {
  switch (action.type) {
    case 'MAKE_BURGER':
      return [...state, action.ingredients];
    default:
      return state;
  }
};

export { reducerBurgerConstructor };
