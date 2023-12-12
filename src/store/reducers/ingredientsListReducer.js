const ingredientsList = [];

// Функция reducerIngredientsList наш редьюсер со списком ингредиентов
// Он принимает в качестве аргументов - стор (ingredientsList) и действие/объект (action)
// т.е. то что диспетчер нам передает и будет в action
// а передает он объект где будет type и responseJSON.data (список наших ингредиентов)
function reducerIngredientsList(state = ingredientsList, action) {
  switch (action.type) {
    case 'LOAD_INGREDIENTS':
      console.log(action.ingredients);
      return action.ingredients;
    default:
      return state;
  }
};

export { reducerIngredientsList };
