const burgerConstructor = [];

function reducerBurgerConstructor(state = burgerConstructor, action) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      // Проверяем, является ли ингредиент булочкой
      if (action.ingredient.type === 'bun') {
        // Удаляем старую булочку, если она есть
        const newState = state.filter((ingredient) => ingredient.type !== 'bun');
        // Добавляем новую булочку в начало массива
        return [action.ingredient, ...newState];
      } else {
        // Для других ингредиентов просто добавляем их в конец массива
        return [...state, action.ingredient];
      }
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
