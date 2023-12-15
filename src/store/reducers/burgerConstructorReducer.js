const burgerConstructor = [];

function reducerBurgerConstructor(state = burgerConstructor, action) {
  switch (action.type) {
    case 'MAKE_BURGER':
      return [...state, action.ingredients];
    case 'REMOVE_INGREDIENT':
      // здесь мы из стора burgerConstructor удаляем ингредиент по его индексу в сторе
      return [
        ...state.slice(0, action.ingredientIndex),
        ...state.slice(action.ingredientIndex + 1)
      ];
    default:
      return state;
  }
};

export { reducerBurgerConstructor };
