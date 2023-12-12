const burgerConstructor = [];

function reducerBurgerConstructor(state = burgerConstructor, action) {
  switch (action.type) {
    case 'MAKE_BURGER':
      console.log(action.ingredients);
      return action.ingredients;
    default:
      return state;
  }
};

export { reducerBurgerConstructor };
