function actionAddIngredientToBurger(ingredient) {
  return {
    type: 'ADD_INGREDIENT',
    ingredient: ingredient
  };
};

function actionRemoveIngredient(ingredientIndex) {
  return {
    type: 'REMOVE_INGREDIENT',
    ingredientIndex: ingredientIndex
  };
};

function actionReorderIngredients(fromIndex, toIndex) {
  return {
    type: 'REORDER_INGREDIENTS',
    payload: { fromIndex, toIndex }
  };
};

export { actionAddIngredientToBurger, actionRemoveIngredient, actionReorderIngredients };
